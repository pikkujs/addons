#!/bin/bash
# Unit tests, then the acceptance app. With GREPTIME_BIN set (a v1.3.0 `greptime`
# binary) or `greptime` on PATH, a throwaway GreptimeDB is started for the real
# suites (GREPTIME_URL is set for them) and for the acceptance app. Without one
# the real suites and the run-side acceptance checks skip.
set -u
cd "$(dirname "$0")"

BIN="${GREPTIME_BIN:-$(command -v greptime || true)}"
PID=""
DATA=""
cleanup() {
  if [ -n "$PID" ]; then kill "$PID" 2>/dev/null; wait "$PID" 2>/dev/null; fi
  if [ -n "$DATA" ]; then rm -rf "$DATA"; fi
}
trap cleanup EXIT

if [ -z "${GREPTIME_URL:-}" ] && [ -n "$BIN" ] && "$BIN" --version >/dev/null 2>&1; then
  DATA="$(mktemp -d)"
  PORT="$(python3 -c 'import socket; s=socket.socket(); s.bind(("127.0.0.1",0)); print(s.getsockname()[1]); s.close()')"
  GRPC="$(python3 -c 'import socket; s=socket.socket(); s.bind(("127.0.0.1",0)); print(s.getsockname()[1]); s.close()')"
  cat > "$DATA/config.toml" <<TOML
enable_telemetry = false
default_timezone = "UTC"
[http]
addr = "127.0.0.1:$PORT"
timeout = "0s"
[grpc]
bind_addr = "127.0.0.1:$GRPC"
[mysql]
enable = false
[postgres]
enable = false
[otlp]
enable = true
TOML
  "$BIN" standalone start -c "$DATA/config.toml" --data-home "$DATA/data" >/dev/null 2>&1 &
  PID=$!
  for _ in $(seq 1 240); do
    curl -sf "http://127.0.0.1:$PORT/health" >/dev/null && break
    sleep 0.25
  done
  export GREPTIME_URL="http://127.0.0.1:$PORT"
  export GREPTIME_BIN="$BIN"
else
  echo "no greptime binary (set GREPTIME_BIN): real-database suites will skip"
fi

bun test --parallel --timeout 120000 unit || exit 1
# The acceptance app starts its own database from GREPTIME_BIN.
unset GREPTIME_URL
npx tsx acceptance/test-greptime.ts
