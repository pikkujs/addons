import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GenericContainer, Wait } from 'testcontainers'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

test('ldap addon', { timeout: 120_000 }, async (t) => {
  const container = await new GenericContainer('osixia/openldap:1.5.0')
    .withExposedPorts(389)
    .withEnvironment({
      LDAP_ORGANISATION: 'Example Inc',
      LDAP_DOMAIN: 'example.org',
      LDAP_ADMIN_PASSWORD: 'adminpassword',
    })
    .withStartupTimeout(60_000)
    .withWaitStrategy(Wait.forLogMessage('slapd starting'))
    .start()

  const host = container.getHost()
  const port = container.getMappedPort(389)

  const secrets = new LocalSecretService()
  await secrets.setSecretJSON('LDAP_CREDENTIALS', {
    url: `ldap://${host}:${port}`,
    bindDN: 'cn=admin,dc=example,dc=org',
    bindPassword: 'adminpassword',
  })

  const singletonServices = await createSingletonServices({}, { secrets })
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  try {
    await t.test('ldapCreate creates an organizational unit', async () => {
      const result = await rpc.invoke('ldap:ldapCreate', {
        dn: 'ou=people,dc=example,dc=org',
        attributes: {
          objectClass: ['organizationalUnit', 'top'],
          ou: 'people',
        },
      })
      assert.equal(result.success, true)
    })

    await t.test('ldapCreate creates a user entry', async () => {
      const result = await rpc.invoke('ldap:ldapCreate', {
        dn: 'cn=alice,ou=people,dc=example,dc=org',
        attributes: {
          objectClass: ['inetOrgPerson', 'organizationalPerson', 'person', 'top'],
          cn: 'alice',
          sn: 'Smith',
          mail: 'alice@example.org',
          userPassword: 'secret123',
        },
      })
      assert.equal(result.success, true)
      assert.equal(result.dn, 'cn=alice,ou=people,dc=example,dc=org')
    })

    await t.test('ldapSearch finds entries', async () => {
      const result = await rpc.invoke('ldap:ldapSearch', {
        baseDN: 'ou=people,dc=example,dc=org',
        filter: '(objectClass=inetOrgPerson)',
      })
      assert.ok(result.count >= 1)
      const alice = result.entries.find((e: any) => e.dn === 'cn=alice,ou=people,dc=example,dc=org')
      assert.ok(alice)
      assert.equal(alice.attributes.mail, 'alice@example.org')
    })

    await t.test('ldapSearch with scope one', async () => {
      const result = await rpc.invoke('ldap:ldapSearch', {
        baseDN: 'dc=example,dc=org',
        filter: '(ou=people)',
        scope: 'one',
      })
      assert.ok(result.count >= 1)
    })

    await t.test('ldapCompare checks attribute value', async () => {
      const result = await rpc.invoke('ldap:ldapCompare', {
        dn: 'cn=alice,ou=people,dc=example,dc=org',
        attribute: 'sn',
        value: 'Smith',
      })
      assert.equal(result.match, true)
    })

    await t.test('ldapCompare returns false for wrong value', async () => {
      const result = await rpc.invoke('ldap:ldapCompare', {
        dn: 'cn=alice,ou=people,dc=example,dc=org',
        attribute: 'sn',
        value: 'Jones',
      })
      assert.equal(result.match, false)
    })

    await t.test('ldapUpdate modifies an entry', async () => {
      const result = await rpc.invoke('ldap:ldapUpdate', {
        dn: 'cn=alice,ou=people,dc=example,dc=org',
        changes: [{
          operation: 'replace',
          attribute: 'mail',
          values: ['alice.smith@example.org'],
        }],
      })
      assert.equal(result.success, true)

      const search = await rpc.invoke('ldap:ldapSearch', {
        baseDN: 'cn=alice,ou=people,dc=example,dc=org',
        filter: '(objectClass=*)',
        scope: 'base',
      })
      assert.equal(search.entries[0].attributes.mail, 'alice.smith@example.org')
    })

    await t.test('ldapDelete removes an entry', async () => {
      const result = await rpc.invoke('ldap:ldapDelete', {
        dn: 'cn=alice,ou=people,dc=example,dc=org',
      })
      assert.equal(result.success, true)

      const search = await rpc.invoke('ldap:ldapSearch', {
        baseDN: 'ou=people,dc=example,dc=org',
        filter: '(cn=alice)',
      })
      assert.equal(search.count, 0)
    })
  } finally {
    await stopSingletonServices()
    await container.stop()
  }
})
