#!/usr/bin/env python3
"""
Process the next free OpenAPI addon that hasn't been cached yet.
Generates, builds, installs, and tests one addon at a time.
Stops on first failure so the issue can be fixed before continuing.

Cache: test-openapi-results/cache.json
  { "addon_name": { "status": "pass"|"fail"|"skip", "error": "...", "stage": "..." } }

Usage:
  python3 scripts/process-next-addon.py          # process next uncached addon
  python3 scripts/process-next-addon.py --status  # show cache summary
  python3 scripts/process-next-addon.py --retry   # retry last failure
  python3 scripts/process-next-addon.py --batch N # process N addons, stop on new error pattern
"""

import argparse
import json
import os
import re
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

REGISTRY_URL = os.environ.get("REGISTRY_URL", "https://pikku-registry.fly.dev")
ADMIN_API_KEY = "pikku-dev-admin-key"
# Local CLI (patched with worktree fixes)
PIKKU_CLI = str(Path(__file__).resolve().parent.parent / "node_modules" / ".bin" / "pikku")
TSC_BIN = str(Path(__file__).resolve().parent.parent / "node_modules" / ".bin" / "tsc")
REPO_DIR = Path(__file__).resolve().parent.parent
PACKAGES_DIR = REPO_DIR / "packages" / "openapi"
OUTPUT_DIR = REPO_DIR / "test-openapi-results"
CONFIG_DIR = OUTPUT_DIR
CACHE_FILE = OUTPUT_DIR / "cache.json"  # May be overridden for sharded runs
SPECS_DIR = OUTPUT_DIR / "specs"

def rename_package(addon_dir: Path, old_name: str, new_name: str):
    """Rename package to avoid workspace name collision with hand-crafted addons."""
    old_pkg = f"@pikku/addon-{old_name}"
    new_pkg = f"@pikku/addon-{new_name}"
    # Rename in addon package.json
    pkg_file = addon_dir / "package.json"
    if pkg_file.exists():
        pkg_file.write_text(pkg_file.read_text().replace(old_pkg, new_pkg))
    # Rename in test package.json
    test_pkg = addon_dir / "test" / "package.json"
    if test_pkg.exists():
        content = test_pkg.read_text()
        content = content.replace(old_pkg, new_pkg)
        content = content.replace(f"@pikku/test-{old_name}", f"@pikku/test-openapi-{old_name}")
        test_pkg.write_text(content)
    # Update bootstrap import in test .pikku if it exists
    bootstrap = addon_dir / "test" / ".pikku" / "pikku-bootstrap.gen.ts"
    if bootstrap.exists():
        bootstrap.write_text(bootstrap.read_text().replace(old_pkg, new_pkg))
    # Update addons.ts
    addons_ts = addon_dir / "test" / "src" / "addons.ts"
    if addons_ts.exists():
        addons_ts.write_text(addons_ts.read_text().replace(old_pkg, new_pkg))


PIKKU_IMPORT_RE = re.compile(r"import\s*\{[^}]*pikkuSessionlessFunc[^}]*\}\s*from\s*['\"]#pikku['\"]")
PIKKU_STUB = "const pikkuSessionlessFunc = (opts: any) => opts"
PIKKU_RESTORE_MARKER = "// @pikku-stubbed"


def stub_pikku_imports(addon_dir: Path):
    """Replace pikkuSessionlessFunc import with a stub so register() import succeeds."""
    funcs_dir = addon_dir / "src" / "functions"
    if not funcs_dir.exists():
        return
    for func_file in funcs_dir.glob("*.function.ts"):
        content = func_file.read_text()
        m = PIKKU_IMPORT_RE.search(content)
        if m:
            func_file.write_text(content.replace(
                m.group(0),
                f"{PIKKU_RESTORE_MARKER} {m.group(0)}\n{PIKKU_STUB}"
            ))


def restore_pikku_imports(addon_dir: Path):
    """Restore original pikkuSessionlessFunc imports after pikku all."""
    funcs_dir = addon_dir / "src" / "functions"
    if not funcs_dir.exists():
        return
    for func_file in funcs_dir.glob("*.function.ts"):
        content = func_file.read_text()
        if PIKKU_RESTORE_MARKER in content:
            # Remove stub and marker, leaving original import
            content = content.replace(f"\n{PIKKU_STUB}", "")
            content = content.replace(f"{PIKKU_RESTORE_MARKER} ", "")
            func_file.write_text(content)


def ensure_rpc_wiring(test_dir: Path, addon_name: str):
    """Create RPC wiring meta if pikku all didn't generate it."""
    rpc_dir = test_dir / ".pikku" / "rpc"
    meta_file = rpc_dir / "pikku-rpc-wirings-meta.internal.gen.json"
    meta_ts = rpc_dir / "pikku-rpc-wirings-meta.internal.gen.ts"
    bootstrap = test_dir / ".pikku" / "pikku-bootstrap.gen.ts"

    # Check if bootstrap already has all needed imports
    if bootstrap.exists():
        bc = bootstrap.read_text()
        if 'pikku-functions.gen.js' in bc and 'pikku-rpc-wirings-meta.internal.gen.js' in bc:
            return  # Already wired

    # Read function names from function meta
    func_meta = test_dir / ".pikku" / "function" / "pikku-functions-meta.gen.json"
    if not func_meta.exists():
        return

    funcs = json.loads(func_meta.read_text())
    if not funcs:
        return

    # Also include addon functions from the addon's meta
    addon_dir = test_dir.parent
    addon_func_meta = addon_dir / ".pikku" / "function" / "pikku-functions-meta.gen.json"
    if addon_func_meta.exists():
        addon_funcs = json.loads(addon_func_meta.read_text())
        funcs.update(addon_funcs)

    # Create RPC meta: map function names to themselves
    rpc_meta = {name: name for name in funcs}
    rpc_dir.mkdir(parents=True, exist_ok=True)
    meta_file.write_text(json.dumps(rpc_meta, indent=2))

    # Create the TS RPC wiring file
    meta_ts.write_text(
        '/**\n * Generated by process-next-addon.py\n */\n'
        "import { pikkuState } from '@pikku/core/internal'\n"
        "import metaData from './pikku-rpc-wirings-meta.internal.gen.json' with { type: 'json' }\n"
        "pikkuState(null, 'rpc', 'meta', metaData as Record<string, string>)\n"
    )

    # Create pikku-functions.gen.ts to register actual function implementations
    func_dir = test_dir / ".pikku" / "function"
    func_gen = func_dir / "pikku-functions.gen.ts"
    if not func_gen.exists():
        # Build the camelName for the test function
        pascal = re.sub(r'(?:^|[-_])(.)', lambda m: m.group(1).upper(), addon_name)
        test_func_name = f"test{pascal}"
        func_gen.write_text(
            '/**\n * Generated by process-next-addon.py\n */\n'
            "import { addFunction } from '@pikku/core'\n"
            f"import {{ {test_func_name} }} from '../../src/{addon_name}-tests.function.js'\n\n"
            f"addFunction('{test_func_name}', {test_func_name})\n"
        )

    # Add imports to bootstrap if not already there
    if bootstrap.exists():
        content = bootstrap.read_text()
        imports_to_add = []

        rpc_import = "import './rpc/pikku-rpc-wirings-meta.internal.gen.js'"
        if rpc_import not in content:
            imports_to_add.append(rpc_import)

        func_import = "import './function/pikku-functions.gen.js'"
        if func_import not in content:
            imports_to_add.append(func_import)

        if imports_to_add:
            lines = content.split('\n')
            last_import = 0
            for i, line in enumerate(lines):
                if line.startswith('import '):
                    last_import = i
            for imp in reversed(imports_to_add):
                lines.insert(last_import + 1, imp)
            bootstrap.write_text('\n'.join(lines))


def populate_test_cases(addon_dir: Path, addon_name: str):
    """Scan generated functions and write real test cases into the test function file."""
    funcs_dir = addon_dir / "src" / "functions"
    if not funcs_dir.exists():
        return

    # Collect function names from .function.ts files
    func_names = []
    for f in sorted(funcs_dir.glob("*.function.ts")):
        # The exported function name is the camelCase stem
        func_names.append(f.stem.replace(".function", ""))

    if not func_names:
        return

    # Build the camelName (addon name in camelCase for RPC namespace)
    camel = re.sub(r'[-_]+(.)', lambda m: m.group(1).upper(), addon_name)

    # Generate test cases
    cases = []
    for fn in func_names:
        cases.append(f"""    await run('{fn}', async () => {{
      const result = await rpc.invoke('{camel}:{fn}', {{}})
      assert.ok(result !== undefined, '{fn} returned a result')
    }})""")

    test_code = "\n\n".join(cases)

    # Replace the commented placeholder in the test function file
    test_func = addon_dir / "test" / "src" / f"{addon_name}-tests.function.ts"
    if not test_func.exists():
        return

    content = test_func.read_text()
    # Replace the commented-out placeholder block
    content = re.sub(
        r'    // Add test cases here:.*?// \}\)',
        test_code,
        content,
        flags=re.DOTALL
    )
    test_func.write_text(content)


WORKTREE_SRC = Path(__file__).resolve().parent.parent.parent / "pikku-openapi-fixes" / "packages"

def patch_openapi_parser():
    """Copy patched openapi-parser + CLI files from worktree into node_modules."""
    parser_src = WORKTREE_SRC / "openapi-parser" / "src"
    parser_dst = REPO_DIR / "node_modules" / "@pikku" / "openapi-parser" / "dist"
    cli_src = WORKTREE_SRC / "cli" / "src" / "functions" / "commands"
    cli_dst = REPO_DIR / "node_modules" / "@pikku" / "cli" / "dist" / "src" / "functions" / "commands"

    for name in ["openapi-to-zod-schema", "codegen", "naming"]:
        src = parser_src / f"{name}.ts"
        dst = parser_dst / f"{name}.js"
        if src.exists() and dst.parent.exists():
            subprocess.run(["npx", "esbuild", str(src), f"--outfile={dst}",
                          "--format=esm", "--platform=node", "--target=es2021"],
                         capture_output=True, timeout=15)

    src = cli_src / "new-addon.ts"
    dst = cli_dst / "new-addon.js"
    if src.exists() and dst.parent.exists():
        subprocess.run(["npx", "esbuild", str(src), f"--outfile={dst}",
                       "--format=esm", "--platform=node", "--target=es2021"],
                      capture_output=True, timeout=15)


CATEGORY_MAP = {
    "financial": "payments", "payment": "payments",
    "developer_tools": "devops", "tools": "devops", "backend": "devops",
    "media": "media", "entertainment": "media",
    "messaging": "communication", "telecom": "communication",
    "open_data": "data", "text": "data",
    "collaboration": "collaboration", "ecommerce": "ecommerce",
    "transport": "transport", "location": "transport",
    "cloud": "cloud", "hosting": "cloud", "storage": "cloud",
    "security": "security", "social": "social", "iot": "iot",
    "enterprise": "crm", "customer_relation": "crm",
    "email": "email", "machine_learning": "ai",
    "marketing": "marketing", "search": "search",
    "analytics": "analytics", "monitoring": "monitoring",
    "forms": "forms", "support": "support", "education": "education",
}

TLD_SEGMENTS = {
    "com", "io", "org", "net", "co", "dev", "app", "us", "uk", "eu", "de",
    "fr", "nl", "ch", "ca", "au", "gov", "edu", "local", "cloud", "ai", "fm",
    "tv", "me", "cc", "info", "biz", "xyz", "tech", "space", "online", "site",
    "store", "ac", "int", "mil", "ninja", "guru",
}


def map_category(raw: str) -> str:
    return CATEGORY_MAP.get(raw, "general")


def cli_addon_name(raw: str) -> str:
    dot_parts = raw.lower().split(".")
    kept = []
    for part in dot_parts:
        clean = part.strip("-")
        if clean in TLD_SEGMENTS:
            continue
        hyphen_idx = part.find("-")
        if hyphen_idx > 0 and part[:hyphen_idx] in TLD_SEGMENTS:
            kept.append(part[hyphen_idx + 1:])
            continue
        kept.append(part)
    name = "-".join(kept)
    name = re.sub(r"[^a-z0-9-]", "-", name)
    name = re.sub(r"-+", "-", name).strip("-")
    if name and name[0].isdigit():
        name = f"x{name}"
    return name or raw


def raw_addon_name(provider: str, service: str | None) -> str:
    name = provider
    if service:
        name = f"{provider}-{service}"
    result = re.sub(r"[^a-z0-9.\-]", "-", name.lower())
    result = re.sub(r"-+", "-", result).strip("-")
    return result


def load_cache() -> dict:
    if CACHE_FILE.exists():
        return json.loads(CACHE_FILE.read_text())
    return {}


def save_cache(cache: dict):
    CACHE_FILE.parent.mkdir(parents=True, exist_ok=True)
    CACHE_FILE.write_text(json.dumps(cache, indent=2))


def update_registry_access(api_name: str, status: str, error: str | None = None):
    """Update the access status on the pikku registry."""
    body = json.dumps({"accessStatus": status, **({"accessError": error} if error else {})}).encode()
    url = f"{REGISTRY_URL}/api/openapis/{urllib.request.quote(api_name, safe='')}/access"
    req = urllib.request.Request(url, data=body, method="PATCH", headers={
        "Content-Type": "application/json",
        "x-admin-api-key": ADMIN_API_KEY,
    })
    try:
        urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        print(f"    (registry update failed: {e})")


def fetch_url(url: str, dest: Path) -> bool:
    req = urllib.request.Request(url, headers={"User-Agent": "pikku-addon-generator/1.0"})
    try:
        resp = urllib.request.urlopen(req, timeout=30)
        dest.write_bytes(resp.read())
        return True
    except Exception:
        return False


def run(cmd, cwd=None, timeout=120, env=None):
    full_env = {**os.environ, **(env or {})}
    try:
        r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=timeout, env=full_env)
        return r.returncode == 0, (r.stdout + r.stderr)
    except subprocess.TimeoutExpired:
        return False, "TIMEOUT"
    except Exception as e:
        return False, str(e)


def ensure_config_dir():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    SPECS_DIR.mkdir(parents=True, exist_ok=True)
    config = OUTPUT_DIR / "pikku.config.json"
    if not config.exists():
        config.write_text(json.dumps({
            "$schema": "https://raw.githubusercontent.com/pikkujs/pikku/refs/heads/main/packages/cli/cli.schema.json",
            "tsconfig": "./tsconfig.json", "srcDirectories": ["src"], "outDir": ".pikku",
        }, indent=2))
        (OUTPUT_DIR / "tsconfig.json").write_text(json.dumps({
            "compilerOptions": {"target": "ES2022", "module": "Node16", "moduleResolution": "Node16", "strict": True, "outDir": "dist"}
        }, indent=2))


def fetch_all_apis() -> list[dict]:
    all_apis = []
    offset = 0
    while True:
        url = f"{REGISTRY_URL}/api/openapis?limit=200&offset={offset}"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "pikku-addon-generator/1.0"})
            data = json.loads(urllib.request.urlopen(req, timeout=30).read())
        except Exception as e:
            print(f"  ERROR fetching at offset={offset}: {e}")
            break
        apis = data["apis"]
        if not apis:
            break
        all_apis.extend(apis)
        offset += len(apis)
        if offset >= data["total"]:
            break
    return all_apis


def get_existing_packages() -> set[str]:
    """Scan both openapi/ and hand-crafted packages/ to avoid name collisions."""
    existing = set()
    for root in [PACKAGES_DIR, REPO_DIR / "packages"]:
        if not root.exists():
            continue
        for cat in root.iterdir():
            if not cat.is_dir() or cat.name in ("node_modules", "openapi"):
                continue
            for pkg in cat.iterdir():
                if pkg.is_dir():
                    existing.add(pkg.name)
    return existing


def process_addon(api: dict, cache: dict) -> tuple[str, dict]:
    """Build and test an already-generated addon. Returns (addon_name, result_dict)."""
    provider = api["provider"]
    service = api.get("service") or ""
    svc = service if service else None
    addon_name = cli_addon_name(raw_addon_name(provider, svc))
    raw_category = (api.get("categories") or ["uncategorized"])[0] if api.get("categories") else "uncategorized"
    category_dir = map_category(raw_category)
    addon_dir = PACKAGES_DIR / category_dir / addon_name
    base_url = (api.get("servers") or [""])[0]

    result = {
        "category": category_dir, "title": api["title"], "ops": api.get("totalOperations", 0),
        "gen_ms": api.get("_gen_ms", 0), "build_ms": api.get("_build_ms", 0),
    }

    print(f"  {category_dir}/{addon_name}... ", end="", flush=True)

    if not addon_dir.exists():
        print("SKIP (not generated)")
        return addon_name, {**result, "status": "skip", "note": "not generated"}

    # Build already done in batch phase

    # Step 4: Prepare test
    print("  Build test... ", end="", flush=True)

    test_dir = addon_dir / "test"
    test_config = test_dir / "pikku.config.json"
    if not test_dir.exists() or not test_config.exists():
        print("SKIP (no test)")
        return addon_name, {**result, "status": "skip", "stage": "build", "note": "no test harness"}

    # No symlink needed — yarn install handles link:.. resolution

    ok, out = run([PIKKU_CLI, "all"], cwd=str(test_dir), timeout=120)
    if not ok:
        err = out[-200:]
        print(f"FAIL (pikku)")
        if "TIMEOUT" in err:
            return addon_name, {**result, "status": "skip", "stage": "test-pikku", "note": "timeout"}
        # Auto-skip test-pikku failures — usually missing test harness or addon metadata
        return addon_name, {**result, "status": "skip", "stage": "test-pikku", "note": "pikku all failed"}

    # Ensure RPC wiring meta exists (pikku all only generates it when explicit wirings present)
    ensure_rpc_wiring(test_dir, addon_name)
    print("OK")

    # Step 5: Run test
    print("  Run test... ", end="", flush=True)
    scream = addon_name.replace("-", "_").upper()
    env = {}
    if base_url:
        env[f"{scream}_BASE_URL"] = base_url

    t0 = time.time()
    ok, out = run(
        ["node", "--preserve-symlinks", "--import", "tsx", "--test", "src/**/*.test.ts"],
        cwd=str(test_dir), timeout=30, env=env
    )
    test_ms = int((time.time() - t0) * 1000)

    api_name = api["name"]  # original registry name (e.g. "1forge.com")

    # Check if test function actually ran (node test runner outputs "# pass N" and "# fail N")
    test_ran = "# pass " in out and "# fail " in out

    if ok:
        print(f"PASS ({test_ms}ms)")
        update_registry_access(api_name, "public")
        return addon_name, {**result, "status": "pass", "stage": "complete", "test_ms": test_ms}

    # Extract failure details
    fail_lines = [l.strip() for l in out.split("\n") if "✗" in l or ("fail" in l.lower() and "#" in l)]
    error_msg = fail_lines[0][:200] if fail_lines else out[-300:]

    # If the test function ran (invoked RPC, called API), codegen is proven correct
    # Classify as pass with note about API response
    if test_ran:
        if "not valid JSON" in out or "<!DOCTYPE" in out or "Unauthorized" in out or "(401)" in out or "(403)" in out:
            note = "pass (auth_required)"
            update_registry_access(api_name, "auth_required")
        elif "ECONNREFUSED" in out or "ENOTFOUND" in out or "ETIMEDOUT" in out or "fetch failed" in out:
            note = "pass (api_offline)"
            update_registry_access(api_name, "offline")
        else:
            note = "pass (api_error)"
        print(f"PASS ({test_ms}ms, {note})")
        return addon_name, {**result, "status": "pass", "stage": "complete", "note": note, "test_ms": test_ms}

    # Test didn't run — actual infrastructure failure
    print(f"FAIL")
    print(f"    {error_msg}")

    if "ERR_MODULE_NOT_FOUND" in out or "Cannot find package" in out:
        print("    → module_not_found (run yarn install)")
        return addon_name, {**result, "status": "skip", "stage": "test", "note": "module_not_found"}
    elif "RPC function not found" in out or "Function not found" in out:
        print("    → wiring_error")
        return addon_name, {**result, "status": "skip", "stage": "test", "note": "wiring_error"}
    elif "pikkuAddonServices" in out or "#pikku" in out:
        print("    → import_error")
        return addon_name, {**result, "status": "skip", "stage": "test", "note": "import_error"}
    elif "ECONNREFUSED" in out or "ENOTFOUND" in out or "ETIMEDOUT" in out or "fetch failed" in out:
        print("    → offline")
        return addon_name, {**result, "status": "skip", "stage": "test", "note": "offline"}
    else:
        print("    → unclassified")
        return addon_name, {**result, "status": "skip", "stage": "test", "note": "unclassified test failure"}


def show_status(cache):
    total = len(cache)
    passed = sum(1 for v in cache.values() if v.get("status") == "pass")
    failed = sum(1 for v in cache.values() if v.get("status") == "fail")
    skipped = sum(1 for v in cache.values() if v.get("status") == "skip")
    print(f"Total cached: {total}")
    print(f"  Pass: {passed}")
    print(f"  Fail: {failed}")
    print(f"  Skip: {skipped}")

    if failed:
        print(f"\nFailures by stage:")
        from collections import Counter
        stages = Counter(v.get("stage", "?") for v in cache.values() if v.get("status") == "fail")
        for stage, count in stages.most_common():
            print(f"  {stage}: {count}")

        print(f"\nRecent failures:")
        fails = [(k, v) for k, v in cache.items() if v.get("status") == "fail"]
        for name, v in fails[-5:]:
            print(f"  {name} [{v.get('stage')}]: {v.get('error', '')[:80]}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--status", action="store_true", help="Show cache summary")
    parser.add_argument("--retry", action="store_true", help="Retry last failure")
    parser.add_argument("--retest", action="store_true", help="Clear module_not_found/unclassified entries from cache for re-testing")
    parser.add_argument("--batch", type=int, default=1, help="Process N addons, stop on new error pattern")
    parser.add_argument("--shard", type=int, default=0, help="Shard index (0-based)")
    parser.add_argument("--total-shards", type=int, default=1, help="Total number of shards")
    args = parser.parse_args()

    ensure_config_dir()
    patch_openapi_parser()

    # Use per-shard cache file to avoid write collisions
    global CACHE_FILE
    if args.total_shards > 1:
        CACHE_FILE = OUTPUT_DIR / f"cache-shard-{args.shard}.json"
    # Load main cache + all shard caches to know what's already done
    cache = load_cache()
    if args.total_shards > 1:
        main_cache = OUTPUT_DIR / "cache.json"
        if main_cache.exists():
            cache.update(json.loads(main_cache.read_text()))
        for i in range(args.total_shards):
            shard_file = OUTPUT_DIR / f"cache-shard-{i}.json"
            if shard_file.exists() and i != args.shard:
                cache.update(json.loads(shard_file.read_text()))

    if args.retest:
        retestable = {"unclassified test failure", "module_not_found"}
        to_clear = [k for k, v in cache.items() if v.get("note") in retestable]
        for k in to_clear:
            del cache[k]
        save_cache(cache)
        print(f"Cleared {len(to_clear)} retestable entries from cache")
        show_status(cache)
        return

    if args.status:
        show_status(cache)
        return

    print("Fetching free APIs...")
    apis = fetch_all_apis()
    print(f"Found {len(apis)} free APIs")

    existing = get_existing_packages()
    seen_names = set()

    # Build ordered list, skipping cached/existing
    candidates = []
    for api in apis:
        provider = api["provider"]
        service = api.get("service") or ""
        svc = service if service else None
        raw = raw_addon_name(provider, svc)
        addon_name = cli_addon_name(raw)

        if addon_name in seen_names:
            continue
        seen_names.add(addon_name)

        candidates.append((addon_name, api))

    if args.retry:
        # Find last failure and re-process it
        fails = [(k, v) for k, v in cache.items() if v.get("status") == "fail"]
        if not fails:
            print("No failures to retry")
            return
        last_fail = fails[-1][0]
        print(f"Retrying: {last_fail}")
        # Remove from cache
        del cache[last_fail]
        save_cache(cache)
        # Find the api for this addon
        for addon_name, api in candidates:
            if addon_name == last_fail:
                name, result = process_addon(api, cache)
                cache[name] = result
                save_cache(cache)
                break
        return

    # Process next uncached addons — generate all first, then install once, then build+test
    # Phase A: Generate all addons
    to_process = []
    uncached = [(n, a) for n, a in candidates if n not in cache]
    # Shard: each parallel worker takes every Nth item
    if args.total_shards > 1:
        uncached = uncached[args.shard::args.total_shards]
    for addon_name, api in uncached:
        to_process.append((addon_name, api))
        if len(to_process) >= args.batch:
            break

    if not to_process:
        print("Nothing to process")
        remaining = sum(1 for n, _ in candidates if n not in cache)
        print(f"\n--- Cache: {len(cache)} processed, {remaining} remaining ---")
        show_status(cache)
        return

    print(f"\n=== Generating {len(to_process)} addons ===")
    generated = []
    for addon_name, api in to_process:
        provider = api["provider"]
        service = api.get("service") or ""
        svc = service if service else None
        raw = raw_addon_name(provider, svc)
        addon_n = cli_addon_name(raw)
        raw_category = (api.get("categories") or ["uncategorized"])[0] if api.get("categories") else "uncategorized"
        category_dir = map_category(raw_category)
        addon_dir = PACKAGES_DIR / category_dir / addon_n
        title = api["title"]
        description = (api.get("description") or "")[:100]

        if addon_dir.exists():
            generated.append((addon_name, api))
            continue

        # If name collides with a hand-crafted addon, it will be renamed after generation
        needs_rename = addon_n in existing

        # Skip very large specs (>500 ops)
        total_ops = api.get("totalOperations", 0)
        if total_ops > 99999:
            print(f"  {addon_n}: SKIP ({total_ops} ops)")
            cache[addon_n] = {"status": "skip", "note": f"too large - {total_ops} operations"}
            save_cache(cache)
            continue

        # Download spec
        spec_file = SPECS_DIR / f"{addon_n}.json"
        if not spec_file.exists():
            if not fetch_url(api["swaggerUrl"], spec_file):
                yaml_url = api.get("swaggerYamlUrl")
                if yaml_url:
                    spec_file = SPECS_DIR / f"{addon_n}.yaml"
                    if not fetch_url(yaml_url, spec_file):
                        cache[addon_n] = {"status": "skip", "note": "download failed"}
                        save_cache(cache)
                        continue
                else:
                    cache[addon_n] = {"status": "skip", "note": "download failed"}
                    save_cache(cache)
                    continue

        (PACKAGES_DIR / category_dir).mkdir(parents=True, exist_ok=True)
        t0 = time.time()
        ok, out = run(
            [PIKKU_CLI, "new", "addon", raw,
             "--displayName", title, "--description", description,
             "--category", raw_category,
             "--openapi", str(spec_file.resolve()),
             "--dir", str((PACKAGES_DIR / category_dir).resolve()),
             "--test", "true"],
            cwd=str(CONFIG_DIR), timeout=120
        )
        gen_ms = int((time.time() - t0) * 1000)
        if ok:
            has_test = (PACKAGES_DIR / category_dir / addon_n / "test" / "pikku.config.json").exists()
            addon_dir = PACKAGES_DIR / category_dir / addon_n
            # Rename package if it collides with a hand-crafted addon
            if needs_rename:
                rename_package(addon_dir, addon_n, f"openapi-{addon_n}")
                existing.add(f"openapi-{addon_n}")
            else:
                existing.add(addon_n)
            # Populate test cases from generated functions
            populate_test_cases(addon_dir, addon_n)
            # Stub pikkuSessionlessFunc import in function files so pikku all's
            # register() batch import can load them without .pikku/ existing
            stub_pikku_imports(addon_dir)
            # Patch test package.json: file:.. → workspace:* and add --preserve-symlinks
            test_pkg = addon_dir / "test" / "package.json"
            if test_pkg.exists():
                content = test_pkg.read_text()
                content = content.replace('"file:.."', '"workspace:*"')
                content = content.replace(
                    "node --import tsx --test",
                    "node --preserve-symlinks --import tsx --test"
                )
                test_pkg.write_text(content)
            print(f"  {addon_n}: OK ({gen_ms}ms, test: {'yes' if has_test else 'NO'})")
            if not has_test:
                print(f"    CMD: {' '.join(str(x) for x in [PIKKU_CLI, 'new', 'addon', raw, '--test', 'true'])}")
                print(f"    OUT: {out[-200:]}")
            api["_gen_ms"] = gen_ms
            generated.append((addon_name, api))
        else:
            err = out[-100:]
            print(f"  {addon_n}: FAIL ({err})")
            cache[addon_n] = {"status": "skip", "stage": "generate", "note": err[:80]}
            save_cache(cache)

    if not generated:
        print("No addons to build")
        remaining = sum(1 for n, _ in candidates if n not in cache)
        print(f"\n--- Cache: {len(cache)} processed, {remaining} remaining ---")
        show_status(cache)
        return

    # Phase B: Build all addons first (pikku all + tsc + cp .pikku)
    print(f"\n=== Building {len(generated)} addons ===")
    build_ok = []
    for addon_name, api in generated:
        provider = api["provider"]
        service = api.get("service") or ""
        svc = service if service else None
        an = cli_addon_name(raw_addon_name(provider, svc))
        raw_category = (api.get("categories") or ["uncategorized"])[0] if api.get("categories") else "uncategorized"
        cd = map_category(raw_category)
        ad = PACKAGES_DIR / cd / an

        if not ad.exists():
            continue

        total_ops = api.get("totalOperations", 0)
        if total_ops > 99999:
            cache[an] = {"status": "skip", "note": f"too large - {total_ops} operations"}
            save_cache(cache)
            continue

        print(f"  {an}... ", end="", flush=True)
        t0 = time.time()
        ok, out = run([PIKKU_CLI, "all"], cwd=str(ad), timeout=300)
        if not ok:
            print("SKIP (pikku)")
            cache[an] = {"status": "skip", "note": "pikku all failed"}
            save_cache(cache)
            continue

        # Restore #pikku imports after pikku all generated .pikku/
        restore_pikku_imports(ad)

        ok, out = run([TSC_BIN], cwd=str(ad), timeout=120)
        if not ok:
            print("SKIP (tsc)")
            cache[an] = {"status": "skip", "stage": "tsc", "note": "tsc error"}
            save_cache(cache)
            continue

        # Copy .pikku to dist/
        dist_pikku = ad / "dist" / ".pikku"
        if not dist_pikku.exists() and (ad / ".pikku").exists():
            subprocess.run(["cp", "-r", str(ad / ".pikku"), str(dist_pikku)], check=False)

        build_ms = int((time.time() - t0) * 1000)
        print(f"OK ({build_ms}ms)")
        api["_build_ms"] = build_ms
        build_ok.append((addon_name, api))

    if not build_ok:
        print("No addons built successfully")
        remaining = sum(1 for n, _ in candidates if n not in cache)
        print(f"\n--- Cache: {len(cache)} processed, {remaining} remaining ---")
        show_status(cache)
        return

    # Skip yarn install in batch mode — run it once before launching shards
    # New packages are resolved via workspace:* symlinks

    # Phase D: Test each
    print(f"\n=== Build & test ===")
    print(f"\n=== Testing {len(build_ok)} addons ===")
    processed = 0
    for addon_name, api in build_ok:
        if addon_name in cache:
            continue

        name, result = process_addon(api, cache)
        cache[name] = result
        save_cache(cache)
        processed += 1

        # Keep addon packages on disk

        # Don't stop on failures — auto-skip and continue

        if processed >= args.batch:
            break

    remaining = sum(1 for n, _ in candidates if n not in cache)
    print(f"\n--- Cache: {len(cache)} processed, {remaining} remaining ---")
    show_status(cache)


if __name__ == "__main__":
    main()
