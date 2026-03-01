import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile, mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

let repoDir: string
let singletonServices: any
let rpc: any

test('git addon', async (t) => {
  repoDir = await mkdtemp(join(tmpdir(), 'pikku-git-test-'))
  singletonServices = await createSingletonServices({}, {})
  rpc = rpcService.getContextRPCService(singletonServices, {})

  await t.test('gitInit initializes a new repository', async () => {
    const result = await rpc.invoke('git:gitInit', { directory: repoDir })
    assert.equal(result.directory, repoDir)
  })

  await t.test('gitStatus shows clean repo after init', async () => {
    const result = await rpc.invoke('git:gitStatus', { directory: repoDir })
    assert.equal(result.isClean, true)
    assert.equal(result.staged.length, 0)
    assert.equal(result.modified.length, 0)
  })

  await t.test('gitAdd stages files', async () => {
    await writeFile(join(repoDir, 'hello.txt'), 'Hello World')
    const result = await rpc.invoke('git:gitAdd', {
      directory: repoDir,
      files: ['hello.txt'],
    })
    assert.deepEqual(result.staged, ['hello.txt'])
  })

  await t.test('gitStatus shows staged file', async () => {
    const result = await rpc.invoke('git:gitStatus', { directory: repoDir })
    assert.ok(result.staged.length > 0)
  })

  await t.test('gitCommit creates a commit', async () => {
    const result = await rpc.invoke('git:gitCommit', {
      directory: repoDir,
      message: 'Initial commit',
    })
    assert.ok(result.hash.length > 0)
  })

  await t.test('gitLog returns commit history', async () => {
    const result = await rpc.invoke('git:gitLog', { directory: repoDir })
    assert.equal(result.total, 1)
    assert.equal(result.commits[0].message, 'Initial commit')
  })

  await t.test('gitShow displays commit details', async () => {
    const result = await rpc.invoke('git:gitShow', { directory: repoDir })
    assert.ok(result.output.includes('Initial commit'))
  })

  await t.test('gitDiff shows changes', async () => {
    await writeFile(join(repoDir, 'hello.txt'), 'Hello World Updated')
    const result = await rpc.invoke('git:gitDiff', { directory: repoDir })
    assert.ok(result.diff.includes('Updated'))
    assert.ok(result.files.length > 0)
  })

  await t.test('gitReset unstages changes', async () => {
    await rpc.invoke('git:gitAdd', { directory: repoDir, files: ['hello.txt'] })
    const result = await rpc.invoke('git:gitReset', {
      directory: repoDir,
      files: ['hello.txt'],
    })
    assert.equal(result.reset, true)
  })

  await t.test('gitStash saves and restores changes', async () => {
    await writeFile(join(repoDir, 'hello.txt'), 'Stashed content')
    await rpc.invoke('git:gitAdd', { directory: repoDir, files: ['hello.txt'] })
    await rpc.invoke('git:gitStash', { directory: repoDir, action: 'push', message: 'test stash' })

    const listResult = await rpc.invoke('git:gitStash', { directory: repoDir, action: 'list' })
    assert.ok(listResult.result.includes('test stash'))

    await rpc.invoke('git:gitStash', { directory: repoDir, action: 'pop' })
  })

  // Commit stashed changes so we have a clean state
  await rpc.invoke('git:gitAdd', { directory: repoDir, files: ['hello.txt'] })
  await rpc.invoke('git:gitCommit', { directory: repoDir, message: 'Second commit' })

  await t.test('gitBranchCreate creates a new branch', async () => {
    const result = await rpc.invoke('git:gitBranchCreate', {
      directory: repoDir,
      name: 'feature-test',
    })
    assert.equal(result.branch, 'feature-test')
  })

  await t.test('gitBranchList lists branches', async () => {
    const result = await rpc.invoke('git:gitBranchList', { directory: repoDir })
    assert.ok(result.branches.some((b: any) => b.name === 'feature-test'))
    assert.equal(result.current, 'feature-test')
  })

  await t.test('gitCheckout switches branches', async () => {
    await rpc.invoke('git:gitCheckout', { directory: repoDir, target: 'master' })
    const status = await rpc.invoke('git:gitStatus', { directory: repoDir })
    assert.ok(status.current === 'master' || status.current === 'main')
  })

  await t.test('gitMerge merges branches', async () => {
    // Make a change on feature-test branch
    await rpc.invoke('git:gitCheckout', { directory: repoDir, target: 'feature-test' })
    await writeFile(join(repoDir, 'feature.txt'), 'Feature content')
    await rpc.invoke('git:gitAdd', { directory: repoDir, files: ['feature.txt'] })
    await rpc.invoke('git:gitCommit', { directory: repoDir, message: 'Feature commit' })
    await rpc.invoke('git:gitCheckout', { directory: repoDir, target: 'master' })

    const result = await rpc.invoke('git:gitMerge', {
      directory: repoDir,
      branch: 'feature-test',
    })
    assert.equal(result.merged, true)
  })

  await t.test('gitBranchDelete removes a branch', async () => {
    const result = await rpc.invoke('git:gitBranchDelete', {
      directory: repoDir,
      name: 'feature-test',
    })
    assert.equal(result.deleted, 'feature-test')
  })

  await t.test('gitTagCreate creates a tag', async () => {
    const result = await rpc.invoke('git:gitTagCreate', {
      directory: repoDir,
      name: 'v1.0.0',
      message: 'Release v1.0.0',
    })
    assert.equal(result.tag, 'v1.0.0')
  })

  await t.test('gitTagList lists tags', async () => {
    const result = await rpc.invoke('git:gitTagList', { directory: repoDir })
    assert.ok(result.tags.includes('v1.0.0'))
    assert.equal(result.latest, 'v1.0.0')
  })

  await t.test('gitClean shows untracked files in dry run', async () => {
    await writeFile(join(repoDir, 'untracked.txt'), 'untracked')
    const result = await rpc.invoke('git:gitClean', {
      directory: repoDir,
      dryRun: true,
    })
    assert.ok(result.paths.some((p: string) => p.includes('untracked.txt')))
  })

  await t.test('gitClean removes untracked files', async () => {
    await rpc.invoke('git:gitClean', {
      directory: repoDir,
      force: true,
    })
    const status = await rpc.invoke('git:gitStatus', { directory: repoDir })
    assert.equal(status.not_added.length, 0)
  })

  await t.test('gitRaw executes raw git commands', async () => {
    const result = await rpc.invoke('git:gitRaw', {
      directory: repoDir,
      args: ['rev-parse', '--short', 'HEAD'],
    })
    assert.ok(result.output.trim().length > 0)
  })

  await t.test('gitRemoteAdd and gitRemoteList manage remotes', async () => {
    await rpc.invoke('git:gitRemoteAdd', {
      directory: repoDir,
      name: 'test-remote',
      url: 'https://example.com/repo.git',
    })
    const result = await rpc.invoke('git:gitRemoteList', { directory: repoDir })
    assert.ok(result.remotes.some((r: any) => r.name === 'test-remote'))
  })

  await t.test('gitRemoteRemove removes a remote', async () => {
    await rpc.invoke('git:gitRemoteRemove', {
      directory: repoDir,
      name: 'test-remote',
    })
    const result = await rpc.invoke('git:gitRemoteList', { directory: repoDir })
    assert.ok(!result.remotes.some((r: any) => r.name === 'test-remote'))
  })

  await t.test('gitRevert reverts a commit', async () => {
    await writeFile(join(repoDir, 'revert-test.txt'), 'to revert')
    await rpc.invoke('git:gitAdd', { directory: repoDir, files: ['revert-test.txt'] })
    const { hash } = await rpc.invoke('git:gitCommit', {
      directory: repoDir,
      message: 'Commit to revert',
    })
    const log = await rpc.invoke('git:gitLog', { directory: repoDir, maxCount: 1 })
    const result = await rpc.invoke('git:gitRevert', {
      directory: repoDir,
      commit: log.commits[0].hash,
    })
    assert.equal(result.reverted, true)
  })

  await t.test('gitClone clones a repository', async () => {
    const cloneDir = await mkdtemp(join(tmpdir(), 'pikku-git-clone-'))
    const targetDir = join(cloneDir, 'cloned')
    const result = await rpc.invoke('git:gitClone', {
      repoUrl: repoDir,
      directory: targetDir,
    })
    assert.equal(result.directory, targetDir)

    const status = await rpc.invoke('git:gitStatus', { directory: targetDir })
    assert.ok(status.current)

    await rm(cloneDir, { recursive: true, force: true })
  })

  // Cleanup
  await rm(repoDir, { recursive: true, force: true })
})
