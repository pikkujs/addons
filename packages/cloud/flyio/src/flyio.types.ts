import { z } from 'zod'

// Shared schemas from Machines API v1.0

export const AcmeChallengeSchema = z.object({
  name: z.string().optional(),
  target: z.string().optional(),
})
export type AcmeChallenge = z.infer<typeof AcmeChallengeSchema>

export const AppSchema = z.object({
  id: z.string().optional(),
  internal_numeric_id: z.number().int().optional(),
  machine_count: z.number().int().optional(),
  name: z.string().optional(),
  network: z.string().optional(),
  organization: z.object({
    internal_numeric_id: z.number().int().optional(),
    name: z.string().optional(),
    slug: z.string().optional(),
  }).optional(),
  status: z.string().optional(),
  volume_count: z.number().int().optional(),
})
export type App = z.infer<typeof AppSchema>

export const AppOrganizationInfoSchema = z.object({
  internal_numeric_id: z.number().int().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
})
export type AppOrganizationInfo = z.infer<typeof AppOrganizationInfoSchema>

export const AppSecretSchema = z.object({
  created_at: z.string().optional(),
  digest: z.string().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
  value: z.string().optional(),
})
export type AppSecret = z.infer<typeof AppSecretSchema>

export const AppSecretsSchema = z.object({
  secrets: z.array(z.object({
    created_at: z.string().optional(),
    digest: z.string().optional(),
    name: z.string().optional(),
    updated_at: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
})
export type AppSecrets = z.infer<typeof AppSecretsSchema>

export const AppSecretsUpdateRequestSchema = z.object({
  values: z.record(z.string(), z.string()).optional(),
})
export type AppSecretsUpdateRequest = z.infer<typeof AppSecretsUpdateRequestSchema>

export const AppSecretsUpdateRespSchema = z.object({
  Version: z.number().int().optional().describe("DEPRECATED"),
  secrets: z.array(z.object({
    created_at: z.string().optional(),
    digest: z.string().optional(),
    name: z.string().optional(),
    updated_at: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
  version: z.number().int().optional(),
})
export type AppSecretsUpdateResp = z.infer<typeof AppSecretsUpdateRespSchema>

export const CertificateCheckResponseSchema = z.object({
  acme_requested: z.boolean().optional(),
  certificates: z.array(z.object({
    created_at: z.string().optional(),
    expires_at: z.string().optional(),
    issued: z.array(z.object({
      certificate_authority: z.string().optional(),
      expires_at: z.string().optional(),
      type: z.enum(["rsa", "ecdsa"]).optional(),
    })).optional(),
    issuer: z.string().optional(),
    source: z.enum(["custom", "fly"]).optional(),
    status: z.enum(["active", "pending_ownership", "pending_validation"]).optional(),
  })).optional(),
  configured: z.boolean().optional(),
  dns_provider: z.string().optional(),
  dns_records: z.object({
    a: z.array(z.string()).optional(),
    aaaa: z.array(z.string()).optional(),
    acme_challenge_cname: z.string().optional(),
    cname: z.array(z.string()).optional(),
    ownership_txt: z.string().optional(),
    resolved_addresses: z.array(z.string()).optional(),
    soa: z.string().optional(),
  }).optional(),
  dns_requirements: z.object({
    a: z.array(z.string()).optional(),
    aaaa: z.array(z.string()).optional(),
    acme_challenge: z.object({
      name: z.string().optional(),
      target: z.string().optional(),
    }).optional(),
    cname: z.string().optional(),
    ownership: z.object({
      app_value: z.string().optional(),
      name: z.string().optional(),
      org_value: z.string().optional(),
    }).optional(),
  }).optional(),
  hostname: z.string().optional(),
  rate_limited_until: z.string().optional(),
  status: z.string().optional(),
  validation: z.object({
    alpn_configured: z.boolean().optional(),
    dns_configured: z.boolean().optional(),
    http_configured: z.boolean().optional(),
    ownership_txt_configured: z.boolean().optional(),
  }).optional(),
  validation_errors: z.array(z.object({
    code: z.string().optional(),
    message: z.string().optional(),
    remediation: z.string().optional(),
    timestamp: z.string().optional(),
  })).optional(),
})
export type CertificateCheckResponse = z.infer<typeof CertificateCheckResponseSchema>

export const CertificateDetailSchema = z.object({
  acme_requested: z.boolean().optional(),
  certificates: z.array(z.object({
    created_at: z.string().optional(),
    expires_at: z.string().optional(),
    issued: z.array(z.object({
      certificate_authority: z.string().optional(),
      expires_at: z.string().optional(),
      type: z.enum(["rsa", "ecdsa"]).optional(),
    })).optional(),
    issuer: z.string().optional(),
    source: z.enum(["custom", "fly"]).optional(),
    status: z.enum(["active", "pending_ownership", "pending_validation"]).optional(),
  })).optional(),
  configured: z.boolean().optional(),
  dns_provider: z.string().optional(),
  dns_requirements: z.object({
    a: z.array(z.string()).optional(),
    aaaa: z.array(z.string()).optional(),
    acme_challenge: z.object({
      name: z.string().optional(),
      target: z.string().optional(),
    }).optional(),
    cname: z.string().optional(),
    ownership: z.object({
      app_value: z.string().optional(),
      name: z.string().optional(),
      org_value: z.string().optional(),
    }).optional(),
  }).optional(),
  hostname: z.string().optional(),
  rate_limited_until: z.string().optional(),
  status: z.string().optional(),
  validation: z.object({
    alpn_configured: z.boolean().optional(),
    dns_configured: z.boolean().optional(),
    http_configured: z.boolean().optional(),
    ownership_txt_configured: z.boolean().optional(),
  }).optional(),
  validation_errors: z.array(z.object({
    code: z.string().optional(),
    message: z.string().optional(),
    remediation: z.string().optional(),
    timestamp: z.string().optional(),
  })).optional(),
})
export type CertificateDetail = z.infer<typeof CertificateDetailSchema>

export const CertificateEntrySchema = z.object({
  created_at: z.string().optional(),
  expires_at: z.string().optional(),
  issued: z.array(z.object({
    certificate_authority: z.string().optional(),
    expires_at: z.string().optional(),
    type: z.enum(["rsa", "ecdsa"]).optional(),
  })).optional(),
  issuer: z.string().optional(),
  source: z.enum(["custom", "fly"]).optional(),
  status: z.enum(["active", "pending_ownership", "pending_validation"]).optional(),
})
export type CertificateEntry = z.infer<typeof CertificateEntrySchema>

export const CertificateSummarySchema = z.object({
  acme_alpn_configured: z.boolean().optional(),
  acme_dns_configured: z.boolean().optional(),
  acme_http_configured: z.boolean().optional(),
  acme_requested: z.boolean().optional(),
  configured: z.boolean().optional(),
  created_at: z.string().optional(),
  dns_provider: z.string().optional(),
  has_custom_certificate: z.boolean().optional(),
  has_fly_certificate: z.boolean().optional(),
  hostname: z.string().optional(),
  ownership_txt_configured: z.boolean().optional(),
  status: z.string().optional(),
  updated_at: z.string().optional(),
})
export type CertificateSummary = z.infer<typeof CertificateSummarySchema>

export const CertificateValidationSchema = z.object({
  alpn_configured: z.boolean().optional(),
  dns_configured: z.boolean().optional(),
  http_configured: z.boolean().optional(),
  ownership_txt_configured: z.boolean().optional(),
})
export type CertificateValidation = z.infer<typeof CertificateValidationSchema>

export const CertificateValidationErrorSchema = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
  remediation: z.string().optional(),
  timestamp: z.string().optional(),
})
export type CertificateValidationError = z.infer<typeof CertificateValidationErrorSchema>

export const CheckStatusSchema = z.object({
  name: z.string().optional(),
  output: z.string().optional(),
  status: z.string().optional(),
  updated_at: z.string().optional(),
})
export type CheckStatus = z.infer<typeof CheckStatusSchema>

export const CreateAppDeployTokenRequestSchema = z.object({
  expiry: z.string().optional(),
})
export type CreateAppDeployTokenRequest = z.infer<typeof CreateAppDeployTokenRequestSchema>

export const CreateAppRequestSchema = z.object({
  enable_subdomains: z.boolean().optional(),
  name: z.string().optional(),
  network: z.string().optional(),
  org_slug: z.string().optional(),
})
export type CreateAppRequest = z.infer<typeof CreateAppRequestSchema>

export const CreateAppResponseSchema = z.object({
  token: z.string().optional(),
})
export type CreateAppResponse = z.infer<typeof CreateAppResponseSchema>

export const CreateLeaseRequestSchema = z.object({
  description: z.string().optional(),
  ttl: z.number().int().optional().describe("seconds lease will be valid"),
})
export type CreateLeaseRequest = z.infer<typeof CreateLeaseRequestSchema>

export const CreateMachineRequestSchema = z.object({
  config: z.object({
    auto_destroy: z.boolean().optional().describe("Optional boolean telling the Machine to destroy itself once it’s complete (default false)"),
    checks: z.record(z.string(), z.object({
      grace_period: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The time to wait after a VM starts before checking its health"),
      headers: z.array(z.object({
        name: z.string().optional().describe("The header name"),
        values: z.array(z.string()).optional().describe("The header value"),
      })).optional(),
      interval: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The time between connectivity checks"),
      kind: z.enum(["informational", "readiness"]).optional().describe("Kind of the check (informational, readiness)"),
      method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
      path: z.string().optional().describe("For http checks, the path to send the request to"),
      port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
      protocol: z.string().optional().describe("For http checks, whether to use http or https"),
      timeout: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
      tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
      tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
      type: z.string().optional().describe("tcp or http"),
    })).optional().describe("An optional object that defines one or more named top-level checks. The key for each check is the check name."),
    containers: z.array(z.object({
      cmd: z.array(z.string()).optional().describe("CmdOverride is used to override the default command of the image."),
      depends_on: z.array(z.object({
        condition: z.unknown().optional(),
        name: z.string().optional(),
      })).optional().describe("DependsOn can be used to define dependencies between containers. The container will only be\nstarted after all of its dependent conditions have been satisfied."),
      entrypoint: z.array(z.string()).optional().describe("EntrypointOverride is used to override the default entrypoint of the image."),
      env: z.record(z.string(), z.string()).optional().describe("ExtraEnv is used to add additional environment variables to the container."),
      env_from: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
      })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
      exec: z.array(z.string()).optional().describe("Image Config overrides - these fields are used to override the image configuration.\nIf not provided, the image configuration will be used.\nExecOverride is used to override the default command of the image."),
      files: z.array(z.object({
        guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
        image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
        mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
        raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
        secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
      })).optional().describe("Files are files that will be written to the container file system."),
      healthchecks: z.array(z.object({
        exec: z.object({
          command: z.array(z.string()).optional().describe("The command to run to check the health of the container (e.g. [\"cat\", \"/tmp/healthy\"])"),
        }).optional(),
        failure_threshold: z.number().int().optional().describe("The number of times the check must fail before considering the container unhealthy."),
        grace_period: z.number().int().optional().describe("The time in seconds to wait after a container starts before checking its health."),
        http: z.object({
          headers: z.array(z.object({
            name: z.string().optional().describe("The header name"),
            values: z.array(z.string()).optional().describe("The header value"),
          })).optional().describe("Additional headers to send with the request"),
          method: z.string().optional().describe("The HTTP method to use to when making the request"),
          path: z.string().optional().describe("The path to send the request to"),
          port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
          scheme: z.unknown().optional().describe("Whether to use http or https"),
          tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
          tls_skip_verify: z.boolean().optional().describe("If the protocol is https, whether or not to verify the TLS certificate"),
        }).optional(),
        interval: z.number().int().optional().describe("The time in seconds between executing the defined check."),
        kind: z.unknown().optional().describe("Kind of healthcheck (readiness, liveness)"),
        name: z.string().optional().describe("The name of the check. Must be unique within the container."),
        success_threshold: z.number().int().optional().describe("The number of times the check must succeeed before considering the container healthy."),
        tcp: z.object({
          port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
        }).optional(),
        timeout: z.number().int().optional().describe("The time in seconds to wait for the check to complete."),
        unhealthy: z.unknown().optional().describe("Unhealthy policy that determines what action to take if a container is deemed unhealthy"),
      })).optional().describe("Healthchecks determine the health of your containers. Healthchecks can use HTTP, TCP or an Exec command."),
      image: z.string().optional().describe("Image is the docker image to run."),
      name: z.string().optional().describe("Name is used to identify the container in the machine."),
      restart: z.object({
        gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
        max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
        policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
      }).optional().describe("Restart is used to define the restart policy for the container. NOTE: spot-price is not\nsupported for containers."),
      secrets: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
      })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
      stop: z.object({
        signal: z.string().optional(),
        timeout: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional(),
      }).optional().describe("Stop is used to define the signal and timeout for stopping the container."),
      user: z.string().optional().describe("UserOverride is used to override the default user of the image."),
    })).optional().describe("Containers are a list of containers that will run in the machine. Currently restricted to\nonly specific organizations."),
    disable_machine_autostart: z.boolean().optional().describe("Deprecated: use Service.Autostart instead"),
    dns: z.object({
      dns_forward_rules: z.array(z.object({
        addr: z.string().optional(),
        basename: z.string().optional(),
      })).optional(),
      hostname: z.string().optional(),
      hostname_fqdn: z.string().optional(),
      nameservers: z.array(z.string()).optional(),
      options: z.array(z.object({
        name: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      searches: z.array(z.string()).optional(),
      skip_registration: z.boolean().optional(),
    }).optional(),
    env: z.record(z.string(), z.string()).optional().describe("An object filled with key/value pairs to be set as environment variables"),
    files: z.array(z.object({
      guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
      image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
      mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
      raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
      secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
    })).optional(),
    guest: z.object({
      cpu_kind: z.string().optional(),
      cpus: z.number().int().optional(),
      gpu_kind: z.string().optional(),
      gpus: z.number().int().optional(),
      host_dedication_id: z.string().optional(),
      kernel_args: z.array(z.string()).optional(),
      memory_mb: z.number().int().optional(),
      persist_rootfs: z.enum(["never", "always", "restart"]).optional().describe("Deprecated: use MachineConfig.Rootfs instead"),
    }).optional(),
    image: z.string().optional().describe("The docker image to run"),
    init: z.object({
      cmd: z.array(z.string()).optional(),
      entrypoint: z.array(z.string()).optional(),
      exec: z.array(z.string()).optional(),
      kernel_args: z.array(z.string()).optional(),
      swap_size_mb: z.number().int().optional(),
      tty: z.boolean().optional(),
    }).optional(),
    metadata: z.record(z.string(), z.string()).optional(),
    metrics: z.object({
      https: z.boolean().optional(),
      path: z.string().optional(),
      port: z.number().int().optional(),
    }).optional(),
    mounts: z.array(z.object({
      add_size_gb: z.number().int().optional(),
      encrypted: z.boolean().optional(),
      extend_threshold_percent: z.number().int().optional(),
      name: z.string().optional(),
      path: z.string().optional(),
      size_gb: z.number().int().optional(),
      size_gb_limit: z.number().int().optional(),
      volume: z.string().optional(),
    })).optional(),
    processes: z.array(z.object({
      cmd: z.array(z.string()).optional(),
      entrypoint: z.array(z.string()).optional(),
      env: z.record(z.string(), z.string()).optional(),
      env_from: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
      })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
      exec: z.array(z.string()).optional(),
      ignore_app_secrets: z.boolean().optional().describe("IgnoreAppSecrets can be set to true to ignore the secrets for the App the Machine belongs to\nand only use the secrets provided at the process level. The default/legacy behavior is to use\nthe secrets provided at the App level."),
      secrets: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
      })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
      user: z.string().optional(),
    })).optional(),
    restart: z.object({
      gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
      max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
      policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
    }).optional().describe("The Machine restart policy defines whether and how flyd restarts a Machine after its main process exits. See https://fly.io/docs/machines/guides-examples/machine-restart-policy/."),
    rootfs: z.object({
      fs_size_gb: z.number().int().optional(),
      persist: z.enum(["never", "always", "restart"]).optional(),
      size_gb: z.number().int().optional(),
    }).optional(),
    schedule: z.string().optional(),
    services: z.array(z.object({
      autostart: z.boolean().optional(),
      autostop: z.enum(["off", "stop", "suspend"]).optional().describe("Accepts a string (new format) or a boolean (old format). For backward compatibility with older clients, the API continues to use booleans for \"off\" and \"stop\" in responses.\n* \"off\" or false - Do not autostop the Machine.\n* \"stop\" or true - Automatically stop the Machine.\n* \"suspend\" - Automatically suspend the Machine, falling back to a full stop if this is not possible."),
      checks: z.array(z.object({
        grace_period: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The time to wait after a VM starts before checking its health"),
        headers: z.array(z.object({
          name: z.string().optional().describe("The header name"),
          values: z.array(z.string()).optional().describe("The header value"),
        })).optional(),
        interval: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The time between connectivity checks"),
        method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
        path: z.string().optional().describe("For http checks, the path to send the request to"),
        port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
        protocol: z.string().optional().describe("For http checks, whether to use http or https"),
        timeout: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
        tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
        tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
        type: z.string().optional().describe("tcp or http"),
      })).optional().describe("An optional list of service checks"),
      concurrency: z.object({
        hard_limit: z.number().int().optional(),
        soft_limit: z.number().int().optional(),
        type: z.string().optional(),
      }).optional(),
      force_instance_description: z.string().optional(),
      force_instance_key: z.string().optional(),
      internal_port: z.number().int().optional(),
      min_machines_running: z.number().int().optional(),
      ports: z.array(z.object({
        end_port: z.number().int().optional(),
        force_https: z.boolean().optional(),
        handlers: z.array(z.string()).optional(),
        http_options: z.object({
          compress: z.boolean().optional(),
          h2_backend: z.boolean().optional(),
          headers_read_timeout: z.number().int().optional(),
          idle_timeout: z.number().int().optional(),
          replay_cache: z.array(z.object({
            allow_bypass: z.boolean().optional(),
            name: z.string().optional().describe("Name of the cookie or header to key the cache on"),
            path_prefix: z.string().optional(),
            ttl_seconds: z.number().int().optional(),
            type: z.enum(["cookie", "header"]).optional().describe("Currently either \"cookie\" or \"header\""),
          })).optional(),
          response: z.object({
            headers: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
            pristine: z.boolean().optional(),
          }).optional(),
        }).optional(),
        port: z.number().int().optional(),
        proxy_proto_options: z.object({
          version: z.string().optional(),
        }).optional(),
        start_port: z.number().int().optional(),
        tls_options: z.object({
          alpn: z.array(z.string()).optional(),
          default_self_signed: z.boolean().optional(),
          versions: z.array(z.string()).optional(),
        }).optional(),
      })).optional(),
      protocol: z.string().optional(),
    })).optional(),
    size: z.string().optional().describe("Deprecated: use Guest instead"),
    standbys: z.array(z.string()).optional().describe("Standbys enable a machine to be a standby for another. In the event of a hardware failure,\nthe standby machine will be started."),
    statics: z.array(z.object({
      guest_path: z.string(),
      index_document: z.string().optional(),
      tigris_bucket: z.string().optional(),
      url_prefix: z.string(),
    })).optional(),
    stop_config: z.object({
      signal: z.string().optional(),
      timeout: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional(),
    }).optional(),
  }).optional().describe("An object defining the Machine configuration"),
  lease_ttl: z.number().int().optional(),
  lsvd: z.boolean().optional(),
  min_secrets_version: z.number().int().optional(),
  name: z.string().optional().describe("Unique name for this Machine. If omitted, one is generated for you"),
  region: z.string().optional().describe("The target region. Omitting this param launches in the same region as your WireGuard peer connection (somewhere near you)."),
  skip_launch: z.boolean().optional(),
  skip_secrets: z.boolean().optional(),
  skip_service_registration: z.boolean().optional(),
})
export type CreateMachineRequest = z.infer<typeof CreateMachineRequestSchema>

export const CreateOIDCTokenRequestSchema = z.object({
  aud: z.string().optional(),
  aws_principal_tags: z.boolean().optional(),
}).describe("Optional parameters")
export type CreateOIDCTokenRequest = z.infer<typeof CreateOIDCTokenRequestSchema>

export const CreateVolumeRequestSchema = z.object({
  auto_backup_enabled: z.boolean().optional().describe("enable scheduled automatic snapshots. Defaults to `true`"),
  compute: z.object({
    cpu_kind: z.string().optional(),
    cpus: z.number().int().optional(),
    gpu_kind: z.string().optional(),
    gpus: z.number().int().optional(),
    host_dedication_id: z.string().optional(),
    kernel_args: z.array(z.string()).optional(),
    memory_mb: z.number().int().optional(),
    persist_rootfs: z.enum(["never", "always", "restart"]).optional().describe("Deprecated: use MachineConfig.Rootfs instead"),
  }).optional(),
  compute_image: z.string().optional(),
  encrypted: z.boolean().optional(),
  fstype: z.string().optional(),
  name: z.string().optional(),
  region: z.string().optional(),
  require_unique_zone: z.boolean().optional(),
  size_gb: z.number().int().optional(),
  snapshot_id: z.string().optional().describe("restore from snapshot"),
  snapshot_retention: z.number().int().optional(),
  source_volume_id: z.string().optional().describe("fork from remote volume"),
  unique_zone_app_wide: z.boolean().optional(),
})
export type CreateVolumeRequest = z.infer<typeof CreateVolumeRequestSchema>

export const CurrentTokenResponseSchema = z.object({
  tokens: z.array(z.object({
    apps: z.array(z.string()).optional(),
    org_slug: z.string().optional(),
    organization: z.string().optional(),
    restricted_to_machine: z.string().optional().describe("Machine the token is restricted to (FromMachine caveat)"),
    source_machine_id: z.string().optional().describe("Machine making the request"),
    token_id: z.string().optional(),
    user: z.string().optional().describe("User identifier if token is for a user"),
  })).optional(),
})
export type CurrentTokenResponse = z.infer<typeof CurrentTokenResponseSchema>

export const DNSRecordsSchema = z.object({
  a: z.array(z.string()).optional(),
  aaaa: z.array(z.string()).optional(),
  acme_challenge_cname: z.string().optional(),
  cname: z.array(z.string()).optional(),
  ownership_txt: z.string().optional(),
  resolved_addresses: z.array(z.string()).optional(),
  soa: z.string().optional(),
})
export type DNSRecords = z.infer<typeof DNSRecordsSchema>

export const DNSRequirementsSchema = z.object({
  a: z.array(z.string()).optional(),
  aaaa: z.array(z.string()).optional(),
  acme_challenge: z.object({
    name: z.string().optional(),
    target: z.string().optional(),
  }).optional(),
  cname: z.string().optional(),
  ownership: z.object({
    app_value: z.string().optional(),
    name: z.string().optional(),
    org_value: z.string().optional(),
  }).optional(),
})
export type DNSRequirements = z.infer<typeof DNSRequirementsSchema>

export const DecryptSecretkeyRequestSchema = z.object({
  associated_data: z.array(z.number().int()).optional(),
  ciphertext: z.array(z.number().int()).optional(),
})
export type DecryptSecretkeyRequest = z.infer<typeof DecryptSecretkeyRequestSchema>

export const DecryptSecretkeyResponseSchema = z.object({
  plaintext: z.array(z.number().int()).optional(),
})
export type DecryptSecretkeyResponse = z.infer<typeof DecryptSecretkeyResponseSchema>

export const DeleteAppSecretResponseSchema = z.object({
  Version: z.number().int().optional().describe("DEPRECATED"),
  version: z.number().int().optional(),
})
export type DeleteAppSecretResponse = z.infer<typeof DeleteAppSecretResponseSchema>

export const DeleteSecretkeyResponseSchema = z.object({
  Version: z.number().int().optional().describe("DEPRECATED"),
  version: z.number().int().optional(),
})
export type DeleteSecretkeyResponse = z.infer<typeof DeleteSecretkeyResponseSchema>

export const EncryptSecretkeyRequestSchema = z.object({
  associated_data: z.array(z.number().int()).optional(),
  plaintext: z.array(z.number().int()).optional(),
})
export type EncryptSecretkeyRequest = z.infer<typeof EncryptSecretkeyRequestSchema>

export const EncryptSecretkeyResponseSchema = z.object({
  ciphertext: z.array(z.number().int()).optional(),
})
export type EncryptSecretkeyResponse = z.infer<typeof EncryptSecretkeyResponseSchema>

export const ErrorResponseSchema = z.object({
  details: z.record(z.string(), z.unknown()).optional().describe("Deprecated"),
  error: z.string().optional(),
  status: z.enum(["unknown", "insufficient_capacity"]).optional(),
})
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

export const ExtendVolumeRequestSchema = z.object({
  size_gb: z.number().int().optional(),
})
export type ExtendVolumeRequest = z.infer<typeof ExtendVolumeRequestSchema>

export const ExtendVolumeResponseSchema = z.object({
  needs_restart: z.boolean().optional(),
  volume: z.object({
    attached_alloc_id: z.string().optional(),
    attached_machine_id: z.string().optional(),
    auto_backup_enabled: z.boolean().optional(),
    block_size: z.number().int().optional(),
    blocks: z.number().int().optional(),
    blocks_avail: z.number().int().optional(),
    blocks_free: z.number().int().optional(),
    bytes_total: z.number().int().optional(),
    bytes_used: z.number().int().optional(),
    created_at: z.string().optional(),
    encrypted: z.boolean().optional(),
    fstype: z.string().optional(),
    host_status: z.enum(["ok", "unknown", "unreachable"]).optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    region: z.string().optional(),
    size_gb: z.number().int().optional(),
    snapshot_retention: z.number().int().optional(),
    state: z.string().optional(),
    zone: z.string().optional(),
  }).optional(),
})
export type ExtendVolumeResponse = z.infer<typeof ExtendVolumeResponseSchema>

export const IPAssignmentSchema = z.object({
  created_at: z.string().optional(),
  ip: z.string().optional(),
  region: z.string().optional(),
  service_name: z.string().optional(),
  shared: z.boolean().optional(),
})
export type IPAssignment = z.infer<typeof IPAssignmentSchema>

export const ImageRefSchema = z.object({
  digest: z.string().optional(),
  labels: z.record(z.string(), z.string()).optional(),
  registry: z.string().optional(),
  repository: z.string().optional(),
  tag: z.string().optional(),
})
export type ImageRef = z.infer<typeof ImageRefSchema>

export const IssuedCertificateSchema = z.object({
  certificate_authority: z.string().optional(),
  expires_at: z.string().optional(),
  type: z.enum(["rsa", "ecdsa"]).optional(),
})
export type IssuedCertificate = z.infer<typeof IssuedCertificateSchema>

export const LeaseSchema = z.object({
  description: z.string().optional().describe("Description or reason for the Lease."),
  expires_at: z.number().int().optional().describe("ExpiresAt is the unix timestamp in UTC to denote when the Lease will no longer be valid."),
  nonce: z.string().optional().describe("Nonce is the unique ID autogenerated and associated with the Lease."),
  owner: z.string().optional().describe("Owner is the user identifier which acquired the Lease."),
  version: z.string().optional().describe("Machine version"),
})
export type Lease = z.infer<typeof LeaseSchema>

export const ListAppsResponseSchema = z.object({
  apps: z.array(z.object({
    id: z.string().optional(),
    internal_numeric_id: z.number().int().optional(),
    machine_count: z.number().int().optional(),
    name: z.string().optional(),
    network: z.string().optional(),
    organization: z.object({
      internal_numeric_id: z.number().int().optional(),
      name: z.string().optional(),
      slug: z.string().optional(),
    }).optional(),
    status: z.string().optional(),
    volume_count: z.number().int().optional(),
  })).optional(),
  total_apps: z.number().int().optional(),
})
export type ListAppsResponse = z.infer<typeof ListAppsResponseSchema>

export const ListenSocketSchema = z.object({
  address: z.string().optional(),
  proto: z.string().optional(),
})
export type ListenSocket = z.infer<typeof ListenSocketSchema>

export const MachineSchema = z.object({
  checks: z.array(z.object({
    name: z.string().optional(),
    output: z.string().optional(),
    status: z.string().optional(),
    updated_at: z.string().optional(),
  })).optional(),
  config: z.object({
    auto_destroy: z.boolean().optional().describe("Optional boolean telling the Machine to destroy itself once it’s complete (default false)"),
    checks: z.record(z.string(), z.object({
      grace_period: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The time to wait after a VM starts before checking its health"),
      headers: z.array(z.object({
        name: z.string().optional().describe("The header name"),
        values: z.array(z.string()).optional().describe("The header value"),
      })).optional(),
      interval: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The time between connectivity checks"),
      kind: z.enum(["informational", "readiness"]).optional().describe("Kind of the check (informational, readiness)"),
      method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
      path: z.string().optional().describe("For http checks, the path to send the request to"),
      port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
      protocol: z.string().optional().describe("For http checks, whether to use http or https"),
      timeout: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
      tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
      tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
      type: z.string().optional().describe("tcp or http"),
    })).optional().describe("An optional object that defines one or more named top-level checks. The key for each check is the check name."),
    containers: z.array(z.object({
      cmd: z.array(z.string()).optional().describe("CmdOverride is used to override the default command of the image."),
      depends_on: z.array(z.object({
        condition: z.unknown().optional(),
        name: z.string().optional(),
      })).optional().describe("DependsOn can be used to define dependencies between containers. The container will only be\nstarted after all of its dependent conditions have been satisfied."),
      entrypoint: z.array(z.string()).optional().describe("EntrypointOverride is used to override the default entrypoint of the image."),
      env: z.record(z.string(), z.string()).optional().describe("ExtraEnv is used to add additional environment variables to the container."),
      env_from: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
      })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
      exec: z.array(z.string()).optional().describe("Image Config overrides - these fields are used to override the image configuration.\nIf not provided, the image configuration will be used.\nExecOverride is used to override the default command of the image."),
      files: z.array(z.object({
        guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
        image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
        mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
        raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
        secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
      })).optional().describe("Files are files that will be written to the container file system."),
      healthchecks: z.array(z.object({
        exec: z.object({
          command: z.array(z.string()).optional().describe("The command to run to check the health of the container (e.g. [\"cat\", \"/tmp/healthy\"])"),
        }).optional(),
        failure_threshold: z.number().int().optional().describe("The number of times the check must fail before considering the container unhealthy."),
        grace_period: z.number().int().optional().describe("The time in seconds to wait after a container starts before checking its health."),
        http: z.object({
          headers: z.array(z.object({
            name: z.string().optional().describe("The header name"),
            values: z.array(z.string()).optional().describe("The header value"),
          })).optional().describe("Additional headers to send with the request"),
          method: z.string().optional().describe("The HTTP method to use to when making the request"),
          path: z.string().optional().describe("The path to send the request to"),
          port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
          scheme: z.unknown().optional().describe("Whether to use http or https"),
          tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
          tls_skip_verify: z.boolean().optional().describe("If the protocol is https, whether or not to verify the TLS certificate"),
        }).optional(),
        interval: z.number().int().optional().describe("The time in seconds between executing the defined check."),
        kind: z.unknown().optional().describe("Kind of healthcheck (readiness, liveness)"),
        name: z.string().optional().describe("The name of the check. Must be unique within the container."),
        success_threshold: z.number().int().optional().describe("The number of times the check must succeeed before considering the container healthy."),
        tcp: z.object({
          port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
        }).optional(),
        timeout: z.number().int().optional().describe("The time in seconds to wait for the check to complete."),
        unhealthy: z.unknown().optional().describe("Unhealthy policy that determines what action to take if a container is deemed unhealthy"),
      })).optional().describe("Healthchecks determine the health of your containers. Healthchecks can use HTTP, TCP or an Exec command."),
      image: z.string().optional().describe("Image is the docker image to run."),
      name: z.string().optional().describe("Name is used to identify the container in the machine."),
      restart: z.object({
        gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
        max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
        policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
      }).optional().describe("Restart is used to define the restart policy for the container. NOTE: spot-price is not\nsupported for containers."),
      secrets: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
      })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
      stop: z.object({
        signal: z.string().optional(),
        timeout: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional(),
      }).optional().describe("Stop is used to define the signal and timeout for stopping the container."),
      user: z.string().optional().describe("UserOverride is used to override the default user of the image."),
    })).optional().describe("Containers are a list of containers that will run in the machine. Currently restricted to\nonly specific organizations."),
    disable_machine_autostart: z.boolean().optional().describe("Deprecated: use Service.Autostart instead"),
    dns: z.object({
      dns_forward_rules: z.array(z.object({
        addr: z.string().optional(),
        basename: z.string().optional(),
      })).optional(),
      hostname: z.string().optional(),
      hostname_fqdn: z.string().optional(),
      nameservers: z.array(z.string()).optional(),
      options: z.array(z.object({
        name: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      searches: z.array(z.string()).optional(),
      skip_registration: z.boolean().optional(),
    }).optional(),
    env: z.record(z.string(), z.string()).optional().describe("An object filled with key/value pairs to be set as environment variables"),
    files: z.array(z.object({
      guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
      image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
      mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
      raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
      secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
    })).optional(),
    guest: z.object({
      cpu_kind: z.string().optional(),
      cpus: z.number().int().optional(),
      gpu_kind: z.string().optional(),
      gpus: z.number().int().optional(),
      host_dedication_id: z.string().optional(),
      kernel_args: z.array(z.string()).optional(),
      memory_mb: z.number().int().optional(),
      persist_rootfs: z.enum(["never", "always", "restart"]).optional().describe("Deprecated: use MachineConfig.Rootfs instead"),
    }).optional(),
    image: z.string().optional().describe("The docker image to run"),
    init: z.object({
      cmd: z.array(z.string()).optional(),
      entrypoint: z.array(z.string()).optional(),
      exec: z.array(z.string()).optional(),
      kernel_args: z.array(z.string()).optional(),
      swap_size_mb: z.number().int().optional(),
      tty: z.boolean().optional(),
    }).optional(),
    metadata: z.record(z.string(), z.string()).optional(),
    metrics: z.object({
      https: z.boolean().optional(),
      path: z.string().optional(),
      port: z.number().int().optional(),
    }).optional(),
    mounts: z.array(z.object({
      add_size_gb: z.number().int().optional(),
      encrypted: z.boolean().optional(),
      extend_threshold_percent: z.number().int().optional(),
      name: z.string().optional(),
      path: z.string().optional(),
      size_gb: z.number().int().optional(),
      size_gb_limit: z.number().int().optional(),
      volume: z.string().optional(),
    })).optional(),
    processes: z.array(z.object({
      cmd: z.array(z.string()).optional(),
      entrypoint: z.array(z.string()).optional(),
      env: z.record(z.string(), z.string()).optional(),
      env_from: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
      })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
      exec: z.array(z.string()).optional(),
      ignore_app_secrets: z.boolean().optional().describe("IgnoreAppSecrets can be set to true to ignore the secrets for the App the Machine belongs to\nand only use the secrets provided at the process level. The default/legacy behavior is to use\nthe secrets provided at the App level."),
      secrets: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
      })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
      user: z.string().optional(),
    })).optional(),
    restart: z.object({
      gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
      max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
      policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
    }).optional().describe("The Machine restart policy defines whether and how flyd restarts a Machine after its main process exits. See https://fly.io/docs/machines/guides-examples/machine-restart-policy/."),
    rootfs: z.object({
      fs_size_gb: z.number().int().optional(),
      persist: z.enum(["never", "always", "restart"]).optional(),
      size_gb: z.number().int().optional(),
    }).optional(),
    schedule: z.string().optional(),
    services: z.array(z.object({
      autostart: z.boolean().optional(),
      autostop: z.enum(["off", "stop", "suspend"]).optional().describe("Accepts a string (new format) or a boolean (old format). For backward compatibility with older clients, the API continues to use booleans for \"off\" and \"stop\" in responses.\n* \"off\" or false - Do not autostop the Machine.\n* \"stop\" or true - Automatically stop the Machine.\n* \"suspend\" - Automatically suspend the Machine, falling back to a full stop if this is not possible."),
      checks: z.array(z.object({
        grace_period: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The time to wait after a VM starts before checking its health"),
        headers: z.array(z.object({
          name: z.string().optional().describe("The header name"),
          values: z.array(z.string()).optional().describe("The header value"),
        })).optional(),
        interval: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The time between connectivity checks"),
        method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
        path: z.string().optional().describe("For http checks, the path to send the request to"),
        port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
        protocol: z.string().optional().describe("For http checks, whether to use http or https"),
        timeout: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
        tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
        tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
        type: z.string().optional().describe("tcp or http"),
      })).optional().describe("An optional list of service checks"),
      concurrency: z.object({
        hard_limit: z.number().int().optional(),
        soft_limit: z.number().int().optional(),
        type: z.string().optional(),
      }).optional(),
      force_instance_description: z.string().optional(),
      force_instance_key: z.string().optional(),
      internal_port: z.number().int().optional(),
      min_machines_running: z.number().int().optional(),
      ports: z.array(z.object({
        end_port: z.number().int().optional(),
        force_https: z.boolean().optional(),
        handlers: z.array(z.string()).optional(),
        http_options: z.object({
          compress: z.boolean().optional(),
          h2_backend: z.boolean().optional(),
          headers_read_timeout: z.number().int().optional(),
          idle_timeout: z.number().int().optional(),
          replay_cache: z.array(z.object({
            allow_bypass: z.boolean().optional(),
            name: z.string().optional().describe("Name of the cookie or header to key the cache on"),
            path_prefix: z.string().optional(),
            ttl_seconds: z.number().int().optional(),
            type: z.enum(["cookie", "header"]).optional().describe("Currently either \"cookie\" or \"header\""),
          })).optional(),
          response: z.object({
            headers: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
            pristine: z.boolean().optional(),
          }).optional(),
        }).optional(),
        port: z.number().int().optional(),
        proxy_proto_options: z.object({
          version: z.string().optional(),
        }).optional(),
        start_port: z.number().int().optional(),
        tls_options: z.object({
          alpn: z.array(z.string()).optional(),
          default_self_signed: z.boolean().optional(),
          versions: z.array(z.string()).optional(),
        }).optional(),
      })).optional(),
      protocol: z.string().optional(),
    })).optional(),
    size: z.string().optional().describe("Deprecated: use Guest instead"),
    standbys: z.array(z.string()).optional().describe("Standbys enable a machine to be a standby for another. In the event of a hardware failure,\nthe standby machine will be started."),
    statics: z.array(z.object({
      guest_path: z.string(),
      index_document: z.string().optional(),
      tigris_bucket: z.string().optional(),
      url_prefix: z.string(),
    })).optional(),
    stop_config: z.object({
      signal: z.string().optional(),
      timeout: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional(),
    }).optional(),
  }).optional(),
  created_at: z.string().optional(),
  events: z.array(z.object({
    id: z.string().optional(),
    request: z.record(z.string(), z.unknown()).optional(),
    source: z.string().optional(),
    status: z.string().optional(),
    timestamp: z.number().int().optional(),
    type: z.string().optional(),
  })).optional(),
  host_status: z.enum(["ok", "unknown", "unreachable"]).optional(),
  id: z.string().optional(),
  image_ref: z.object({
    digest: z.string().optional(),
    labels: z.record(z.string(), z.string()).optional(),
    registry: z.string().optional(),
    repository: z.string().optional(),
    tag: z.string().optional(),
  }).optional(),
  incomplete_config: z.object({
    auto_destroy: z.boolean().optional().describe("Optional boolean telling the Machine to destroy itself once it’s complete (default false)"),
    checks: z.record(z.string(), z.object({
      grace_period: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The time to wait after a VM starts before checking its health"),
      headers: z.array(z.object({
        name: z.string().optional().describe("The header name"),
        values: z.array(z.string()).optional().describe("The header value"),
      })).optional(),
      interval: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The time between connectivity checks"),
      kind: z.enum(["informational", "readiness"]).optional().describe("Kind of the check (informational, readiness)"),
      method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
      path: z.string().optional().describe("For http checks, the path to send the request to"),
      port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
      protocol: z.string().optional().describe("For http checks, whether to use http or https"),
      timeout: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
      tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
      tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
      type: z.string().optional().describe("tcp or http"),
    })).optional().describe("An optional object that defines one or more named top-level checks. The key for each check is the check name."),
    containers: z.array(z.object({
      cmd: z.array(z.string()).optional().describe("CmdOverride is used to override the default command of the image."),
      depends_on: z.array(z.object({
        condition: z.unknown().optional(),
        name: z.string().optional(),
      })).optional().describe("DependsOn can be used to define dependencies between containers. The container will only be\nstarted after all of its dependent conditions have been satisfied."),
      entrypoint: z.array(z.string()).optional().describe("EntrypointOverride is used to override the default entrypoint of the image."),
      env: z.record(z.string(), z.string()).optional().describe("ExtraEnv is used to add additional environment variables to the container."),
      env_from: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
      })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
      exec: z.array(z.string()).optional().describe("Image Config overrides - these fields are used to override the image configuration.\nIf not provided, the image configuration will be used.\nExecOverride is used to override the default command of the image."),
      files: z.array(z.object({
        guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
        image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
        mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
        raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
        secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
      })).optional().describe("Files are files that will be written to the container file system."),
      healthchecks: z.array(z.object({
        exec: z.object({
          command: z.array(z.string()).optional().describe("The command to run to check the health of the container (e.g. [\"cat\", \"/tmp/healthy\"])"),
        }).optional(),
        failure_threshold: z.number().int().optional().describe("The number of times the check must fail before considering the container unhealthy."),
        grace_period: z.number().int().optional().describe("The time in seconds to wait after a container starts before checking its health."),
        http: z.object({
          headers: z.array(z.object({
            name: z.string().optional().describe("The header name"),
            values: z.array(z.string()).optional().describe("The header value"),
          })).optional().describe("Additional headers to send with the request"),
          method: z.string().optional().describe("The HTTP method to use to when making the request"),
          path: z.string().optional().describe("The path to send the request to"),
          port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
          scheme: z.unknown().optional().describe("Whether to use http or https"),
          tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
          tls_skip_verify: z.boolean().optional().describe("If the protocol is https, whether or not to verify the TLS certificate"),
        }).optional(),
        interval: z.number().int().optional().describe("The time in seconds between executing the defined check."),
        kind: z.unknown().optional().describe("Kind of healthcheck (readiness, liveness)"),
        name: z.string().optional().describe("The name of the check. Must be unique within the container."),
        success_threshold: z.number().int().optional().describe("The number of times the check must succeeed before considering the container healthy."),
        tcp: z.object({
          port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
        }).optional(),
        timeout: z.number().int().optional().describe("The time in seconds to wait for the check to complete."),
        unhealthy: z.unknown().optional().describe("Unhealthy policy that determines what action to take if a container is deemed unhealthy"),
      })).optional().describe("Healthchecks determine the health of your containers. Healthchecks can use HTTP, TCP or an Exec command."),
      image: z.string().optional().describe("Image is the docker image to run."),
      name: z.string().optional().describe("Name is used to identify the container in the machine."),
      restart: z.object({
        gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
        max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
        policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
      }).optional().describe("Restart is used to define the restart policy for the container. NOTE: spot-price is not\nsupported for containers."),
      secrets: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
      })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
      stop: z.object({
        signal: z.string().optional(),
        timeout: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional(),
      }).optional().describe("Stop is used to define the signal and timeout for stopping the container."),
      user: z.string().optional().describe("UserOverride is used to override the default user of the image."),
    })).optional().describe("Containers are a list of containers that will run in the machine. Currently restricted to\nonly specific organizations."),
    disable_machine_autostart: z.boolean().optional().describe("Deprecated: use Service.Autostart instead"),
    dns: z.object({
      dns_forward_rules: z.array(z.object({
        addr: z.string().optional(),
        basename: z.string().optional(),
      })).optional(),
      hostname: z.string().optional(),
      hostname_fqdn: z.string().optional(),
      nameservers: z.array(z.string()).optional(),
      options: z.array(z.object({
        name: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      searches: z.array(z.string()).optional(),
      skip_registration: z.boolean().optional(),
    }).optional(),
    env: z.record(z.string(), z.string()).optional().describe("An object filled with key/value pairs to be set as environment variables"),
    files: z.array(z.object({
      guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
      image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
      mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
      raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
      secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
    })).optional(),
    guest: z.object({
      cpu_kind: z.string().optional(),
      cpus: z.number().int().optional(),
      gpu_kind: z.string().optional(),
      gpus: z.number().int().optional(),
      host_dedication_id: z.string().optional(),
      kernel_args: z.array(z.string()).optional(),
      memory_mb: z.number().int().optional(),
      persist_rootfs: z.enum(["never", "always", "restart"]).optional().describe("Deprecated: use MachineConfig.Rootfs instead"),
    }).optional(),
    image: z.string().optional().describe("The docker image to run"),
    init: z.object({
      cmd: z.array(z.string()).optional(),
      entrypoint: z.array(z.string()).optional(),
      exec: z.array(z.string()).optional(),
      kernel_args: z.array(z.string()).optional(),
      swap_size_mb: z.number().int().optional(),
      tty: z.boolean().optional(),
    }).optional(),
    metadata: z.record(z.string(), z.string()).optional(),
    metrics: z.object({
      https: z.boolean().optional(),
      path: z.string().optional(),
      port: z.number().int().optional(),
    }).optional(),
    mounts: z.array(z.object({
      add_size_gb: z.number().int().optional(),
      encrypted: z.boolean().optional(),
      extend_threshold_percent: z.number().int().optional(),
      name: z.string().optional(),
      path: z.string().optional(),
      size_gb: z.number().int().optional(),
      size_gb_limit: z.number().int().optional(),
      volume: z.string().optional(),
    })).optional(),
    processes: z.array(z.object({
      cmd: z.array(z.string()).optional(),
      entrypoint: z.array(z.string()).optional(),
      env: z.record(z.string(), z.string()).optional(),
      env_from: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
      })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
      exec: z.array(z.string()).optional(),
      ignore_app_secrets: z.boolean().optional().describe("IgnoreAppSecrets can be set to true to ignore the secrets for the App the Machine belongs to\nand only use the secrets provided at the process level. The default/legacy behavior is to use\nthe secrets provided at the App level."),
      secrets: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
      })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
      user: z.string().optional(),
    })).optional(),
    restart: z.object({
      gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
      max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
      policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
    }).optional().describe("The Machine restart policy defines whether and how flyd restarts a Machine after its main process exits. See https://fly.io/docs/machines/guides-examples/machine-restart-policy/."),
    rootfs: z.object({
      fs_size_gb: z.number().int().optional(),
      persist: z.enum(["never", "always", "restart"]).optional(),
      size_gb: z.number().int().optional(),
    }).optional(),
    schedule: z.string().optional(),
    services: z.array(z.object({
      autostart: z.boolean().optional(),
      autostop: z.enum(["off", "stop", "suspend"]).optional().describe("Accepts a string (new format) or a boolean (old format). For backward compatibility with older clients, the API continues to use booleans for \"off\" and \"stop\" in responses.\n* \"off\" or false - Do not autostop the Machine.\n* \"stop\" or true - Automatically stop the Machine.\n* \"suspend\" - Automatically suspend the Machine, falling back to a full stop if this is not possible."),
      checks: z.array(z.object({
        grace_period: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The time to wait after a VM starts before checking its health"),
        headers: z.array(z.object({
          name: z.string().optional().describe("The header name"),
          values: z.array(z.string()).optional().describe("The header value"),
        })).optional(),
        interval: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The time between connectivity checks"),
        method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
        path: z.string().optional().describe("For http checks, the path to send the request to"),
        port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
        protocol: z.string().optional().describe("For http checks, whether to use http or https"),
        timeout: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
        tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
        tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
        type: z.string().optional().describe("tcp or http"),
      })).optional().describe("An optional list of service checks"),
      concurrency: z.object({
        hard_limit: z.number().int().optional(),
        soft_limit: z.number().int().optional(),
        type: z.string().optional(),
      }).optional(),
      force_instance_description: z.string().optional(),
      force_instance_key: z.string().optional(),
      internal_port: z.number().int().optional(),
      min_machines_running: z.number().int().optional(),
      ports: z.array(z.object({
        end_port: z.number().int().optional(),
        force_https: z.boolean().optional(),
        handlers: z.array(z.string()).optional(),
        http_options: z.object({
          compress: z.boolean().optional(),
          h2_backend: z.boolean().optional(),
          headers_read_timeout: z.number().int().optional(),
          idle_timeout: z.number().int().optional(),
          replay_cache: z.array(z.object({
            allow_bypass: z.boolean().optional(),
            name: z.string().optional().describe("Name of the cookie or header to key the cache on"),
            path_prefix: z.string().optional(),
            ttl_seconds: z.number().int().optional(),
            type: z.enum(["cookie", "header"]).optional().describe("Currently either \"cookie\" or \"header\""),
          })).optional(),
          response: z.object({
            headers: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
            pristine: z.boolean().optional(),
          }).optional(),
        }).optional(),
        port: z.number().int().optional(),
        proxy_proto_options: z.object({
          version: z.string().optional(),
        }).optional(),
        start_port: z.number().int().optional(),
        tls_options: z.object({
          alpn: z.array(z.string()).optional(),
          default_self_signed: z.boolean().optional(),
          versions: z.array(z.string()).optional(),
        }).optional(),
      })).optional(),
      protocol: z.string().optional(),
    })).optional(),
    size: z.string().optional().describe("Deprecated: use Guest instead"),
    standbys: z.array(z.string()).optional().describe("Standbys enable a machine to be a standby for another. In the event of a hardware failure,\nthe standby machine will be started."),
    statics: z.array(z.object({
      guest_path: z.string(),
      index_document: z.string().optional(),
      tigris_bucket: z.string().optional(),
      url_prefix: z.string(),
    })).optional(),
    stop_config: z.object({
      signal: z.string().optional(),
      timeout: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional(),
    }).optional(),
  }).optional(),
  instance_id: z.string().optional().describe("InstanceID is unique for each version of the machine"),
  name: z.string().optional(),
  nonce: z.string().optional().describe("Nonce is only every returned on machine creation if a lease_duration was provided."),
  private_ip: z.string().optional().describe("PrivateIP is the internal 6PN address of the machine."),
  region: z.string().optional(),
  state: z.string().optional(),
  updated_at: z.string().optional(),
})
export type Machine = z.infer<typeof MachineSchema>

export const MachineEventSchema = z.object({
  id: z.string().optional(),
  request: z.record(z.string(), z.unknown()).optional(),
  source: z.string().optional(),
  status: z.string().optional(),
  timestamp: z.number().int().optional(),
  type: z.string().optional(),
})
export type MachineEvent = z.infer<typeof MachineEventSchema>

export const MachineExecRequestSchema = z.object({
  cmd: z.string().optional().describe("Deprecated: use Command instead"),
  command: z.array(z.string()).optional(),
  container: z.string().optional(),
  stdin: z.string().optional(),
  timeout: z.number().int().optional(),
})
export type MachineExecRequest = z.infer<typeof MachineExecRequestSchema>

export const MachineVersionSchema = z.object({
  user_config: z.object({
    auto_destroy: z.boolean().optional().describe("Optional boolean telling the Machine to destroy itself once it’s complete (default false)"),
    checks: z.record(z.string(), z.object({
      grace_period: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The time to wait after a VM starts before checking its health"),
      headers: z.array(z.object({
        name: z.string().optional().describe("The header name"),
        values: z.array(z.string()).optional().describe("The header value"),
      })).optional(),
      interval: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The time between connectivity checks"),
      kind: z.enum(["informational", "readiness"]).optional().describe("Kind of the check (informational, readiness)"),
      method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
      path: z.string().optional().describe("For http checks, the path to send the request to"),
      port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
      protocol: z.string().optional().describe("For http checks, whether to use http or https"),
      timeout: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
      tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
      tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
      type: z.string().optional().describe("tcp or http"),
    })).optional().describe("An optional object that defines one or more named top-level checks. The key for each check is the check name."),
    containers: z.array(z.object({
      cmd: z.array(z.string()).optional().describe("CmdOverride is used to override the default command of the image."),
      depends_on: z.array(z.object({
        condition: z.unknown().optional(),
        name: z.string().optional(),
      })).optional().describe("DependsOn can be used to define dependencies between containers. The container will only be\nstarted after all of its dependent conditions have been satisfied."),
      entrypoint: z.array(z.string()).optional().describe("EntrypointOverride is used to override the default entrypoint of the image."),
      env: z.record(z.string(), z.string()).optional().describe("ExtraEnv is used to add additional environment variables to the container."),
      env_from: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
      })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
      exec: z.array(z.string()).optional().describe("Image Config overrides - these fields are used to override the image configuration.\nIf not provided, the image configuration will be used.\nExecOverride is used to override the default command of the image."),
      files: z.array(z.object({
        guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
        image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
        mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
        raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
        secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
      })).optional().describe("Files are files that will be written to the container file system."),
      healthchecks: z.array(z.object({
        exec: z.object({
          command: z.array(z.string()).optional().describe("The command to run to check the health of the container (e.g. [\"cat\", \"/tmp/healthy\"])"),
        }).optional(),
        failure_threshold: z.number().int().optional().describe("The number of times the check must fail before considering the container unhealthy."),
        grace_period: z.number().int().optional().describe("The time in seconds to wait after a container starts before checking its health."),
        http: z.object({
          headers: z.array(z.object({
            name: z.string().optional().describe("The header name"),
            values: z.array(z.string()).optional().describe("The header value"),
          })).optional().describe("Additional headers to send with the request"),
          method: z.string().optional().describe("The HTTP method to use to when making the request"),
          path: z.string().optional().describe("The path to send the request to"),
          port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
          scheme: z.unknown().optional().describe("Whether to use http or https"),
          tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
          tls_skip_verify: z.boolean().optional().describe("If the protocol is https, whether or not to verify the TLS certificate"),
        }).optional(),
        interval: z.number().int().optional().describe("The time in seconds between executing the defined check."),
        kind: z.unknown().optional().describe("Kind of healthcheck (readiness, liveness)"),
        name: z.string().optional().describe("The name of the check. Must be unique within the container."),
        success_threshold: z.number().int().optional().describe("The number of times the check must succeeed before considering the container healthy."),
        tcp: z.object({
          port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
        }).optional(),
        timeout: z.number().int().optional().describe("The time in seconds to wait for the check to complete."),
        unhealthy: z.unknown().optional().describe("Unhealthy policy that determines what action to take if a container is deemed unhealthy"),
      })).optional().describe("Healthchecks determine the health of your containers. Healthchecks can use HTTP, TCP or an Exec command."),
      image: z.string().optional().describe("Image is the docker image to run."),
      name: z.string().optional().describe("Name is used to identify the container in the machine."),
      restart: z.object({
        gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
        max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
        policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
      }).optional().describe("Restart is used to define the restart policy for the container. NOTE: spot-price is not\nsupported for containers."),
      secrets: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
      })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
      stop: z.object({
        signal: z.string().optional(),
        timeout: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional(),
      }).optional().describe("Stop is used to define the signal and timeout for stopping the container."),
      user: z.string().optional().describe("UserOverride is used to override the default user of the image."),
    })).optional().describe("Containers are a list of containers that will run in the machine. Currently restricted to\nonly specific organizations."),
    disable_machine_autostart: z.boolean().optional().describe("Deprecated: use Service.Autostart instead"),
    dns: z.object({
      dns_forward_rules: z.array(z.object({
        addr: z.string().optional(),
        basename: z.string().optional(),
      })).optional(),
      hostname: z.string().optional(),
      hostname_fqdn: z.string().optional(),
      nameservers: z.array(z.string()).optional(),
      options: z.array(z.object({
        name: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      searches: z.array(z.string()).optional(),
      skip_registration: z.boolean().optional(),
    }).optional(),
    env: z.record(z.string(), z.string()).optional().describe("An object filled with key/value pairs to be set as environment variables"),
    files: z.array(z.object({
      guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
      image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
      mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
      raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
      secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
    })).optional(),
    guest: z.object({
      cpu_kind: z.string().optional(),
      cpus: z.number().int().optional(),
      gpu_kind: z.string().optional(),
      gpus: z.number().int().optional(),
      host_dedication_id: z.string().optional(),
      kernel_args: z.array(z.string()).optional(),
      memory_mb: z.number().int().optional(),
      persist_rootfs: z.enum(["never", "always", "restart"]).optional().describe("Deprecated: use MachineConfig.Rootfs instead"),
    }).optional(),
    image: z.string().optional().describe("The docker image to run"),
    init: z.object({
      cmd: z.array(z.string()).optional(),
      entrypoint: z.array(z.string()).optional(),
      exec: z.array(z.string()).optional(),
      kernel_args: z.array(z.string()).optional(),
      swap_size_mb: z.number().int().optional(),
      tty: z.boolean().optional(),
    }).optional(),
    metadata: z.record(z.string(), z.string()).optional(),
    metrics: z.object({
      https: z.boolean().optional(),
      path: z.string().optional(),
      port: z.number().int().optional(),
    }).optional(),
    mounts: z.array(z.object({
      add_size_gb: z.number().int().optional(),
      encrypted: z.boolean().optional(),
      extend_threshold_percent: z.number().int().optional(),
      name: z.string().optional(),
      path: z.string().optional(),
      size_gb: z.number().int().optional(),
      size_gb_limit: z.number().int().optional(),
      volume: z.string().optional(),
    })).optional(),
    processes: z.array(z.object({
      cmd: z.array(z.string()).optional(),
      entrypoint: z.array(z.string()).optional(),
      env: z.record(z.string(), z.string()).optional(),
      env_from: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
      })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
      exec: z.array(z.string()).optional(),
      ignore_app_secrets: z.boolean().optional().describe("IgnoreAppSecrets can be set to true to ignore the secrets for the App the Machine belongs to\nand only use the secrets provided at the process level. The default/legacy behavior is to use\nthe secrets provided at the App level."),
      secrets: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
      })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
      user: z.string().optional(),
    })).optional(),
    restart: z.object({
      gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
      max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
      policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
    }).optional().describe("The Machine restart policy defines whether and how flyd restarts a Machine after its main process exits. See https://fly.io/docs/machines/guides-examples/machine-restart-policy/."),
    rootfs: z.object({
      fs_size_gb: z.number().int().optional(),
      persist: z.enum(["never", "always", "restart"]).optional(),
      size_gb: z.number().int().optional(),
    }).optional(),
    schedule: z.string().optional(),
    services: z.array(z.object({
      autostart: z.boolean().optional(),
      autostop: z.enum(["off", "stop", "suspend"]).optional().describe("Accepts a string (new format) or a boolean (old format). For backward compatibility with older clients, the API continues to use booleans for \"off\" and \"stop\" in responses.\n* \"off\" or false - Do not autostop the Machine.\n* \"stop\" or true - Automatically stop the Machine.\n* \"suspend\" - Automatically suspend the Machine, falling back to a full stop if this is not possible."),
      checks: z.array(z.object({
        grace_period: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The time to wait after a VM starts before checking its health"),
        headers: z.array(z.object({
          name: z.string().optional().describe("The header name"),
          values: z.array(z.string()).optional().describe("The header value"),
        })).optional(),
        interval: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The time between connectivity checks"),
        method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
        path: z.string().optional().describe("For http checks, the path to send the request to"),
        port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
        protocol: z.string().optional().describe("For http checks, whether to use http or https"),
        timeout: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
        tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
        tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
        type: z.string().optional().describe("tcp or http"),
      })).optional().describe("An optional list of service checks"),
      concurrency: z.object({
        hard_limit: z.number().int().optional(),
        soft_limit: z.number().int().optional(),
        type: z.string().optional(),
      }).optional(),
      force_instance_description: z.string().optional(),
      force_instance_key: z.string().optional(),
      internal_port: z.number().int().optional(),
      min_machines_running: z.number().int().optional(),
      ports: z.array(z.object({
        end_port: z.number().int().optional(),
        force_https: z.boolean().optional(),
        handlers: z.array(z.string()).optional(),
        http_options: z.object({
          compress: z.boolean().optional(),
          h2_backend: z.boolean().optional(),
          headers_read_timeout: z.number().int().optional(),
          idle_timeout: z.number().int().optional(),
          replay_cache: z.array(z.object({
            allow_bypass: z.boolean().optional(),
            name: z.string().optional().describe("Name of the cookie or header to key the cache on"),
            path_prefix: z.string().optional(),
            ttl_seconds: z.number().int().optional(),
            type: z.enum(["cookie", "header"]).optional().describe("Currently either \"cookie\" or \"header\""),
          })).optional(),
          response: z.object({
            headers: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
            pristine: z.boolean().optional(),
          }).optional(),
        }).optional(),
        port: z.number().int().optional(),
        proxy_proto_options: z.object({
          version: z.string().optional(),
        }).optional(),
        start_port: z.number().int().optional(),
        tls_options: z.object({
          alpn: z.array(z.string()).optional(),
          default_self_signed: z.boolean().optional(),
          versions: z.array(z.string()).optional(),
        }).optional(),
      })).optional(),
      protocol: z.string().optional(),
    })).optional(),
    size: z.string().optional().describe("Deprecated: use Guest instead"),
    standbys: z.array(z.string()).optional().describe("Standbys enable a machine to be a standby for another. In the event of a hardware failure,\nthe standby machine will be started."),
    statics: z.array(z.object({
      guest_path: z.string(),
      index_document: z.string().optional(),
      tigris_bucket: z.string().optional(),
      url_prefix: z.string(),
    })).optional(),
    stop_config: z.object({
      signal: z.string().optional(),
      timeout: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional(),
    }).optional(),
  }).optional(),
  version: z.string().optional(),
})
export type MachineVersion = z.infer<typeof MachineVersionSchema>

export const OrgMachineSchema = z.object({
  app_id: z.number().int().optional(),
  app_name: z.string().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  instance_id: z.string().optional(),
  name: z.string().optional(),
  private_ip: z.string().optional(),
  region: z.string().optional(),
  state: z.string().optional(),
  updated_at: z.string().optional(),
})
export type OrgMachine = z.infer<typeof OrgMachineSchema>

export const OrgMachinesResponseSchema = z.object({
  last_machine_id: z.string().optional(),
  last_updated_at: z.string().optional(),
  machines: z.array(z.object({
    app_id: z.number().int().optional(),
    app_name: z.string().optional(),
    created_at: z.string().optional(),
    id: z.string().optional(),
    instance_id: z.string().optional(),
    name: z.string().optional(),
    private_ip: z.string().optional(),
    region: z.string().optional(),
    state: z.string().optional(),
    updated_at: z.string().optional(),
  })).optional(),
  next_cursor: z.string().optional(),
})
export type OrgMachinesResponse = z.infer<typeof OrgMachinesResponseSchema>

export const OwnershipVerificationSchema = z.object({
  app_value: z.string().optional(),
  name: z.string().optional(),
  org_value: z.string().optional(),
})
export type OwnershipVerification = z.infer<typeof OwnershipVerificationSchema>

export const ProcessStatSchema = z.object({
  command: z.string().optional(),
  cpu: z.number().int().optional(),
  directory: z.string().optional(),
  listen_sockets: z.array(z.object({
    address: z.string().optional(),
    proto: z.string().optional(),
  })).optional(),
  pid: z.number().int().optional(),
  rss: z.number().int().optional(),
  rtime: z.number().int().optional(),
  stime: z.number().int().optional(),
})
export type ProcessStat = z.infer<typeof ProcessStatSchema>

export const SecretKeySchema = z.object({
  created_at: z.string().optional(),
  name: z.string().optional(),
  public_key: z.array(z.number().int()).optional(),
  type: z.string().optional(),
  updated_at: z.string().optional(),
})
export type SecretKey = z.infer<typeof SecretKeySchema>

export const SecretKeysSchema = z.object({
  secret_keys: z.array(z.object({
    created_at: z.string().optional(),
    name: z.string().optional(),
    public_key: z.array(z.number().int()).optional(),
    type: z.string().optional(),
    updated_at: z.string().optional(),
  })).optional(),
})
export type SecretKeys = z.infer<typeof SecretKeysSchema>

export const SetAppSecretRequestSchema = z.object({
  value: z.string().optional(),
})
export type SetAppSecretRequest = z.infer<typeof SetAppSecretRequestSchema>

export const SetAppSecretResponseSchema = z.object({
  Version: z.number().int().optional().describe("DEPRECATED"),
  created_at: z.string().optional(),
  digest: z.string().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
  value: z.string().optional(),
  version: z.number().int().optional(),
})
export type SetAppSecretResponse = z.infer<typeof SetAppSecretResponseSchema>

export const SetSecretkeyRequestSchema = z.object({
  type: z.string().optional(),
  value: z.array(z.number().int()).optional(),
})
export type SetSecretkeyRequest = z.infer<typeof SetSecretkeyRequestSchema>

export const SetSecretkeyResponseSchema = z.object({
  Version: z.number().int().optional().describe("DEPRECATED"),
  created_at: z.string().optional(),
  name: z.string().optional(),
  public_key: z.array(z.number().int()).optional(),
  type: z.string().optional(),
  updated_at: z.string().optional(),
  version: z.number().int().optional(),
})
export type SetSecretkeyResponse = z.infer<typeof SetSecretkeyResponseSchema>

export const SignSecretkeyRequestSchema = z.object({
  plaintext: z.array(z.number().int()).optional(),
})
export type SignSecretkeyRequest = z.infer<typeof SignSecretkeyRequestSchema>

export const SignSecretkeyResponseSchema = z.object({
  signature: z.array(z.number().int()).optional(),
})
export type SignSecretkeyResponse = z.infer<typeof SignSecretkeyResponseSchema>

export const SignalRequestSchema = z.object({
  signal: z.enum(["SIGABRT", "SIGALRM", "SIGFPE", "SIGHUP", "SIGILL", "SIGINT", "SIGKILL", "SIGPIPE", "SIGQUIT", "SIGSEGV", "SIGTERM", "SIGTRAP", "SIGUSR1"]).optional(),
})
export type SignalRequest = z.infer<typeof SignalRequestSchema>

export const StopRequestSchema = z.object({
  signal: z.string().optional(),
  timeout: z.object({
    "time.Duration": z.number().int().optional(),
  }).optional(),
})
export type StopRequest = z.infer<typeof StopRequestSchema>

export const UpdateMachineRequestSchema = z.object({
  config: z.object({
    auto_destroy: z.boolean().optional().describe("Optional boolean telling the Machine to destroy itself once it’s complete (default false)"),
    checks: z.record(z.string(), z.object({
      grace_period: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The time to wait after a VM starts before checking its health"),
      headers: z.array(z.object({
        name: z.string().optional().describe("The header name"),
        values: z.array(z.string()).optional().describe("The header value"),
      })).optional(),
      interval: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The time between connectivity checks"),
      kind: z.enum(["informational", "readiness"]).optional().describe("Kind of the check (informational, readiness)"),
      method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
      path: z.string().optional().describe("For http checks, the path to send the request to"),
      port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
      protocol: z.string().optional().describe("For http checks, whether to use http or https"),
      timeout: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
      tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
      tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
      type: z.string().optional().describe("tcp or http"),
    })).optional().describe("An optional object that defines one or more named top-level checks. The key for each check is the check name."),
    containers: z.array(z.object({
      cmd: z.array(z.string()).optional().describe("CmdOverride is used to override the default command of the image."),
      depends_on: z.array(z.object({
        condition: z.unknown().optional(),
        name: z.string().optional(),
      })).optional().describe("DependsOn can be used to define dependencies between containers. The container will only be\nstarted after all of its dependent conditions have been satisfied."),
      entrypoint: z.array(z.string()).optional().describe("EntrypointOverride is used to override the default entrypoint of the image."),
      env: z.record(z.string(), z.string()).optional().describe("ExtraEnv is used to add additional environment variables to the container."),
      env_from: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
      })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
      exec: z.array(z.string()).optional().describe("Image Config overrides - these fields are used to override the image configuration.\nIf not provided, the image configuration will be used.\nExecOverride is used to override the default command of the image."),
      files: z.array(z.object({
        guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
        image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
        mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
        raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
        secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
      })).optional().describe("Files are files that will be written to the container file system."),
      healthchecks: z.array(z.object({
        exec: z.object({
          command: z.array(z.string()).optional().describe("The command to run to check the health of the container (e.g. [\"cat\", \"/tmp/healthy\"])"),
        }).optional(),
        failure_threshold: z.number().int().optional().describe("The number of times the check must fail before considering the container unhealthy."),
        grace_period: z.number().int().optional().describe("The time in seconds to wait after a container starts before checking its health."),
        http: z.object({
          headers: z.array(z.object({
            name: z.string().optional().describe("The header name"),
            values: z.array(z.string()).optional().describe("The header value"),
          })).optional().describe("Additional headers to send with the request"),
          method: z.string().optional().describe("The HTTP method to use to when making the request"),
          path: z.string().optional().describe("The path to send the request to"),
          port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
          scheme: z.unknown().optional().describe("Whether to use http or https"),
          tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
          tls_skip_verify: z.boolean().optional().describe("If the protocol is https, whether or not to verify the TLS certificate"),
        }).optional(),
        interval: z.number().int().optional().describe("The time in seconds between executing the defined check."),
        kind: z.unknown().optional().describe("Kind of healthcheck (readiness, liveness)"),
        name: z.string().optional().describe("The name of the check. Must be unique within the container."),
        success_threshold: z.number().int().optional().describe("The number of times the check must succeeed before considering the container healthy."),
        tcp: z.object({
          port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
        }).optional(),
        timeout: z.number().int().optional().describe("The time in seconds to wait for the check to complete."),
        unhealthy: z.unknown().optional().describe("Unhealthy policy that determines what action to take if a container is deemed unhealthy"),
      })).optional().describe("Healthchecks determine the health of your containers. Healthchecks can use HTTP, TCP or an Exec command."),
      image: z.string().optional().describe("Image is the docker image to run."),
      name: z.string().optional().describe("Name is used to identify the container in the machine."),
      restart: z.object({
        gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
        max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
        policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
      }).optional().describe("Restart is used to define the restart policy for the container. NOTE: spot-price is not\nsupported for containers."),
      secrets: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
      })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
      stop: z.object({
        signal: z.string().optional(),
        timeout: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional(),
      }).optional().describe("Stop is used to define the signal and timeout for stopping the container."),
      user: z.string().optional().describe("UserOverride is used to override the default user of the image."),
    })).optional().describe("Containers are a list of containers that will run in the machine. Currently restricted to\nonly specific organizations."),
    disable_machine_autostart: z.boolean().optional().describe("Deprecated: use Service.Autostart instead"),
    dns: z.object({
      dns_forward_rules: z.array(z.object({
        addr: z.string().optional(),
        basename: z.string().optional(),
      })).optional(),
      hostname: z.string().optional(),
      hostname_fqdn: z.string().optional(),
      nameservers: z.array(z.string()).optional(),
      options: z.array(z.object({
        name: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      searches: z.array(z.string()).optional(),
      skip_registration: z.boolean().optional(),
    }).optional(),
    env: z.record(z.string(), z.string()).optional().describe("An object filled with key/value pairs to be set as environment variables"),
    files: z.array(z.object({
      guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
      image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
      mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
      raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
      secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
    })).optional(),
    guest: z.object({
      cpu_kind: z.string().optional(),
      cpus: z.number().int().optional(),
      gpu_kind: z.string().optional(),
      gpus: z.number().int().optional(),
      host_dedication_id: z.string().optional(),
      kernel_args: z.array(z.string()).optional(),
      memory_mb: z.number().int().optional(),
      persist_rootfs: z.enum(["never", "always", "restart"]).optional().describe("Deprecated: use MachineConfig.Rootfs instead"),
    }).optional(),
    image: z.string().optional().describe("The docker image to run"),
    init: z.object({
      cmd: z.array(z.string()).optional(),
      entrypoint: z.array(z.string()).optional(),
      exec: z.array(z.string()).optional(),
      kernel_args: z.array(z.string()).optional(),
      swap_size_mb: z.number().int().optional(),
      tty: z.boolean().optional(),
    }).optional(),
    metadata: z.record(z.string(), z.string()).optional(),
    metrics: z.object({
      https: z.boolean().optional(),
      path: z.string().optional(),
      port: z.number().int().optional(),
    }).optional(),
    mounts: z.array(z.object({
      add_size_gb: z.number().int().optional(),
      encrypted: z.boolean().optional(),
      extend_threshold_percent: z.number().int().optional(),
      name: z.string().optional(),
      path: z.string().optional(),
      size_gb: z.number().int().optional(),
      size_gb_limit: z.number().int().optional(),
      volume: z.string().optional(),
    })).optional(),
    processes: z.array(z.object({
      cmd: z.array(z.string()).optional(),
      entrypoint: z.array(z.string()).optional(),
      env: z.record(z.string(), z.string()).optional(),
      env_from: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
      })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
      exec: z.array(z.string()).optional(),
      ignore_app_secrets: z.boolean().optional().describe("IgnoreAppSecrets can be set to true to ignore the secrets for the App the Machine belongs to\nand only use the secrets provided at the process level. The default/legacy behavior is to use\nthe secrets provided at the App level."),
      secrets: z.array(z.object({
        env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
        name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
      })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
      user: z.string().optional(),
    })).optional(),
    restart: z.object({
      gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
      max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
      policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
    }).optional().describe("The Machine restart policy defines whether and how flyd restarts a Machine after its main process exits. See https://fly.io/docs/machines/guides-examples/machine-restart-policy/."),
    rootfs: z.object({
      fs_size_gb: z.number().int().optional(),
      persist: z.enum(["never", "always", "restart"]).optional(),
      size_gb: z.number().int().optional(),
    }).optional(),
    schedule: z.string().optional(),
    services: z.array(z.object({
      autostart: z.boolean().optional(),
      autostop: z.enum(["off", "stop", "suspend"]).optional().describe("Accepts a string (new format) or a boolean (old format). For backward compatibility with older clients, the API continues to use booleans for \"off\" and \"stop\" in responses.\n* \"off\" or false - Do not autostop the Machine.\n* \"stop\" or true - Automatically stop the Machine.\n* \"suspend\" - Automatically suspend the Machine, falling back to a full stop if this is not possible."),
      checks: z.array(z.object({
        grace_period: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The time to wait after a VM starts before checking its health"),
        headers: z.array(z.object({
          name: z.string().optional().describe("The header name"),
          values: z.array(z.string()).optional().describe("The header value"),
        })).optional(),
        interval: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The time between connectivity checks"),
        method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
        path: z.string().optional().describe("For http checks, the path to send the request to"),
        port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
        protocol: z.string().optional().describe("For http checks, whether to use http or https"),
        timeout: z.object({
          "time.Duration": z.number().int().optional(),
        }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
        tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
        tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
        type: z.string().optional().describe("tcp or http"),
      })).optional().describe("An optional list of service checks"),
      concurrency: z.object({
        hard_limit: z.number().int().optional(),
        soft_limit: z.number().int().optional(),
        type: z.string().optional(),
      }).optional(),
      force_instance_description: z.string().optional(),
      force_instance_key: z.string().optional(),
      internal_port: z.number().int().optional(),
      min_machines_running: z.number().int().optional(),
      ports: z.array(z.object({
        end_port: z.number().int().optional(),
        force_https: z.boolean().optional(),
        handlers: z.array(z.string()).optional(),
        http_options: z.object({
          compress: z.boolean().optional(),
          h2_backend: z.boolean().optional(),
          headers_read_timeout: z.number().int().optional(),
          idle_timeout: z.number().int().optional(),
          replay_cache: z.array(z.object({
            allow_bypass: z.boolean().optional(),
            name: z.string().optional().describe("Name of the cookie or header to key the cache on"),
            path_prefix: z.string().optional(),
            ttl_seconds: z.number().int().optional(),
            type: z.enum(["cookie", "header"]).optional().describe("Currently either \"cookie\" or \"header\""),
          })).optional(),
          response: z.object({
            headers: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
            pristine: z.boolean().optional(),
          }).optional(),
        }).optional(),
        port: z.number().int().optional(),
        proxy_proto_options: z.object({
          version: z.string().optional(),
        }).optional(),
        start_port: z.number().int().optional(),
        tls_options: z.object({
          alpn: z.array(z.string()).optional(),
          default_self_signed: z.boolean().optional(),
          versions: z.array(z.string()).optional(),
        }).optional(),
      })).optional(),
      protocol: z.string().optional(),
    })).optional(),
    size: z.string().optional().describe("Deprecated: use Guest instead"),
    standbys: z.array(z.string()).optional().describe("Standbys enable a machine to be a standby for another. In the event of a hardware failure,\nthe standby machine will be started."),
    statics: z.array(z.object({
      guest_path: z.string(),
      index_document: z.string().optional(),
      tigris_bucket: z.string().optional(),
      url_prefix: z.string(),
    })).optional(),
    stop_config: z.object({
      signal: z.string().optional(),
      timeout: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional(),
    }).optional(),
  }).optional().describe("An object defining the Machine configuration"),
  current_version: z.string().optional(),
  lease_ttl: z.number().int().optional(),
  lsvd: z.boolean().optional(),
  min_secrets_version: z.number().int().optional(),
  name: z.string().optional().describe("Unique name for this Machine. If omitted, one is generated for you"),
  region: z.string().optional().describe("The target region. Omitting this param launches in the same region as your WireGuard peer connection (somewhere near you)."),
  skip_launch: z.boolean().optional(),
  skip_secrets: z.boolean().optional(),
  skip_service_registration: z.boolean().optional(),
})
export type UpdateMachineRequest = z.infer<typeof UpdateMachineRequestSchema>

export const UpdateVolumeRequestSchema = z.object({
  auto_backup_enabled: z.boolean().optional(),
  snapshot_retention: z.number().int().optional(),
})
export type UpdateVolumeRequest = z.infer<typeof UpdateVolumeRequestSchema>

export const VerifySecretkeyRequestSchema = z.object({
  plaintext: z.array(z.number().int()).optional(),
  signature: z.array(z.number().int()).optional(),
})
export type VerifySecretkeyRequest = z.infer<typeof VerifySecretkeyRequestSchema>

export const VolumeSchema = z.object({
  attached_alloc_id: z.string().optional(),
  attached_machine_id: z.string().optional(),
  auto_backup_enabled: z.boolean().optional(),
  block_size: z.number().int().optional(),
  blocks: z.number().int().optional(),
  blocks_avail: z.number().int().optional(),
  blocks_free: z.number().int().optional(),
  bytes_total: z.number().int().optional(),
  bytes_used: z.number().int().optional(),
  created_at: z.string().optional(),
  encrypted: z.boolean().optional(),
  fstype: z.string().optional(),
  host_status: z.enum(["ok", "unknown", "unreachable"]).optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  region: z.string().optional(),
  size_gb: z.number().int().optional(),
  snapshot_retention: z.number().int().optional(),
  state: z.string().optional(),
  zone: z.string().optional(),
})
export type Volume = z.infer<typeof VolumeSchema>

export const VolumeSnapshotSchema = z.object({
  created_at: z.string().optional(),
  digest: z.string().optional(),
  id: z.string().optional(),
  retention_days: z.number().int().optional(),
  size: z.number().int().optional(),
  status: z.string().optional(),
  volume_size: z.number().int().optional(),
})
export type VolumeSnapshot = z.infer<typeof VolumeSnapshotSchema>

export const WaitMachineResponseSchema = z.object({
  ok: z.boolean().optional(),
  state: z.string().optional(),
})
export type WaitMachineResponse = z.infer<typeof WaitMachineResponseSchema>

export const assignIPRequestSchema = z.object({
  network: z.string().optional(),
  org_slug: z.string().optional(),
  region: z.string().optional(),
  service_name: z.string().optional(),
  type: z.string().optional(),
})
export type assignIPRequest = z.infer<typeof assignIPRequestSchema>

export const createAcmeCertificateRequestSchema = z.object({
  hostname: z.string().optional(),
})
export type createAcmeCertificateRequest = z.infer<typeof createAcmeCertificateRequestSchema>

export const createCustomCertificateRequestSchema = z.object({
  fullchain: z.string().optional(),
  hostname: z.string().optional(),
  private_key: z.string().optional(),
})
export type createCustomCertificateRequest = z.infer<typeof createCustomCertificateRequestSchema>

export const destroyCustomCertificateResponseSchema = z.object({
  acme_requested: z.boolean().optional(),
  certificates: z.array(z.object({
    created_at: z.string().optional(),
    expires_at: z.string().optional(),
    issued: z.array(z.object({
      certificate_authority: z.string().optional(),
      expires_at: z.string().optional(),
      type: z.enum(["rsa", "ecdsa"]).optional(),
    })).optional(),
    issuer: z.string().optional(),
    source: z.enum(["custom", "fly"]).optional(),
    status: z.enum(["active", "pending_ownership", "pending_validation"]).optional(),
  })).optional(),
  configured: z.boolean().optional(),
  dns_provider: z.string().optional(),
  dns_requirements: z.object({
    a: z.array(z.string()).optional(),
    aaaa: z.array(z.string()).optional(),
    acme_challenge: z.object({
      name: z.string().optional(),
      target: z.string().optional(),
    }).optional(),
    cname: z.string().optional(),
    ownership: z.object({
      app_value: z.string().optional(),
      name: z.string().optional(),
      org_value: z.string().optional(),
    }).optional(),
  }).optional(),
  hostname: z.string().optional(),
  rate_limited_until: z.string().optional(),
  status: z.string().optional(),
  validation: z.object({
    alpn_configured: z.boolean().optional(),
    dns_configured: z.boolean().optional(),
    http_configured: z.boolean().optional(),
    ownership_txt_configured: z.boolean().optional(),
  }).optional(),
  validation_errors: z.array(z.object({
    code: z.string().optional(),
    message: z.string().optional(),
    remediation: z.string().optional(),
    timestamp: z.string().optional(),
  })).optional(),
  warning: z.string().optional(),
})
export type destroyCustomCertificateResponse = z.infer<typeof destroyCustomCertificateResponseSchema>

export const flyContainerConfigSchema = z.object({
  cmd: z.array(z.string()).optional().describe("CmdOverride is used to override the default command of the image."),
  depends_on: z.array(z.object({
    condition: z.unknown().optional(),
    name: z.string().optional(),
  })).optional().describe("DependsOn can be used to define dependencies between containers. The container will only be\nstarted after all of its dependent conditions have been satisfied."),
  entrypoint: z.array(z.string()).optional().describe("EntrypointOverride is used to override the default entrypoint of the image."),
  env: z.record(z.string(), z.string()).optional().describe("ExtraEnv is used to add additional environment variables to the container."),
  env_from: z.array(z.object({
    env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
    field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
  })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
  exec: z.array(z.string()).optional().describe("Image Config overrides - these fields are used to override the image configuration.\nIf not provided, the image configuration will be used.\nExecOverride is used to override the default command of the image."),
  files: z.array(z.object({
    guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
    image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
    mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
    raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
    secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
  })).optional().describe("Files are files that will be written to the container file system."),
  healthchecks: z.array(z.object({
    exec: z.object({
      command: z.array(z.string()).optional().describe("The command to run to check the health of the container (e.g. [\"cat\", \"/tmp/healthy\"])"),
    }).optional(),
    failure_threshold: z.number().int().optional().describe("The number of times the check must fail before considering the container unhealthy."),
    grace_period: z.number().int().optional().describe("The time in seconds to wait after a container starts before checking its health."),
    http: z.object({
      headers: z.array(z.object({
        name: z.string().optional().describe("The header name"),
        values: z.array(z.string()).optional().describe("The header value"),
      })).optional().describe("Additional headers to send with the request"),
      method: z.string().optional().describe("The HTTP method to use to when making the request"),
      path: z.string().optional().describe("The path to send the request to"),
      port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
      scheme: z.unknown().optional().describe("Whether to use http or https"),
      tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
      tls_skip_verify: z.boolean().optional().describe("If the protocol is https, whether or not to verify the TLS certificate"),
    }).optional(),
    interval: z.number().int().optional().describe("The time in seconds between executing the defined check."),
    kind: z.unknown().optional().describe("Kind of healthcheck (readiness, liveness)"),
    name: z.string().optional().describe("The name of the check. Must be unique within the container."),
    success_threshold: z.number().int().optional().describe("The number of times the check must succeeed before considering the container healthy."),
    tcp: z.object({
      port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
    }).optional(),
    timeout: z.number().int().optional().describe("The time in seconds to wait for the check to complete."),
    unhealthy: z.unknown().optional().describe("Unhealthy policy that determines what action to take if a container is deemed unhealthy"),
  })).optional().describe("Healthchecks determine the health of your containers. Healthchecks can use HTTP, TCP or an Exec command."),
  image: z.string().optional().describe("Image is the docker image to run."),
  name: z.string().optional().describe("Name is used to identify the container in the machine."),
  restart: z.object({
    gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
    max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
    policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
  }).optional().describe("Restart is used to define the restart policy for the container. NOTE: spot-price is not\nsupported for containers."),
  secrets: z.array(z.object({
    env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
    name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
  })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
  stop: z.object({
    signal: z.string().optional(),
    timeout: z.object({
      "time.Duration": z.number().int().optional(),
    }).optional(),
  }).optional().describe("Stop is used to define the signal and timeout for stopping the container."),
  user: z.string().optional().describe("UserOverride is used to override the default user of the image."),
})
export type flyContainerConfig = z.infer<typeof flyContainerConfigSchema>

export const flyContainerDependencySchema = z.object({
  condition: z.unknown().optional(),
  name: z.string().optional(),
})
export type flyContainerDependency = z.infer<typeof flyContainerDependencySchema>

export const flyContainerDependencyConditionSchema = z.enum(["exited_successfully", "healthy", "started"])
export type flyContainerDependencyCondition = z.infer<typeof flyContainerDependencyConditionSchema>

export const flyContainerHealthcheckSchema = z.object({
  exec: z.object({
    command: z.array(z.string()).optional().describe("The command to run to check the health of the container (e.g. [\"cat\", \"/tmp/healthy\"])"),
  }).optional(),
  failure_threshold: z.number().int().optional().describe("The number of times the check must fail before considering the container unhealthy."),
  grace_period: z.number().int().optional().describe("The time in seconds to wait after a container starts before checking its health."),
  http: z.object({
    headers: z.array(z.object({
      name: z.string().optional().describe("The header name"),
      values: z.array(z.string()).optional().describe("The header value"),
    })).optional().describe("Additional headers to send with the request"),
    method: z.string().optional().describe("The HTTP method to use to when making the request"),
    path: z.string().optional().describe("The path to send the request to"),
    port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
    scheme: z.unknown().optional().describe("Whether to use http or https"),
    tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
    tls_skip_verify: z.boolean().optional().describe("If the protocol is https, whether or not to verify the TLS certificate"),
  }).optional(),
  interval: z.number().int().optional().describe("The time in seconds between executing the defined check."),
  kind: z.unknown().optional().describe("Kind of healthcheck (readiness, liveness)"),
  name: z.string().optional().describe("The name of the check. Must be unique within the container."),
  success_threshold: z.number().int().optional().describe("The number of times the check must succeeed before considering the container healthy."),
  tcp: z.object({
    port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
  }).optional(),
  timeout: z.number().int().optional().describe("The time in seconds to wait for the check to complete."),
  unhealthy: z.unknown().optional().describe("Unhealthy policy that determines what action to take if a container is deemed unhealthy"),
})
export type flyContainerHealthcheck = z.infer<typeof flyContainerHealthcheckSchema>

export const flyContainerHealthcheckKindSchema = z.enum(["readiness", "liveness"])
export type flyContainerHealthcheckKind = z.infer<typeof flyContainerHealthcheckKindSchema>

export const flyContainerHealthcheckSchemeSchema = z.enum(["http", "https"])
export type flyContainerHealthcheckScheme = z.infer<typeof flyContainerHealthcheckSchemeSchema>

export const flyDNSConfigSchema = z.object({
  dns_forward_rules: z.array(z.object({
    addr: z.string().optional(),
    basename: z.string().optional(),
  })).optional(),
  hostname: z.string().optional(),
  hostname_fqdn: z.string().optional(),
  nameservers: z.array(z.string()).optional(),
  options: z.array(z.object({
    name: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
  searches: z.array(z.string()).optional(),
  skip_registration: z.boolean().optional(),
})
export type flyDNSConfig = z.infer<typeof flyDNSConfigSchema>

export const flyDurationSchema = z.object({
  "time.Duration": z.number().int().optional(),
})
export type flyDuration = z.infer<typeof flyDurationSchema>

export const flyEnvFromSchema = z.object({
  env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
  field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
}).describe("EnvVar defines an environment variable to be populated from a machine field, env_var")
export type flyEnvFrom = z.infer<typeof flyEnvFromSchema>

export const flyExecHealthcheckSchema = z.object({
  command: z.array(z.string()).optional().describe("The command to run to check the health of the container (e.g. [\"cat\", \"/tmp/healthy\"])"),
})
export type flyExecHealthcheck = z.infer<typeof flyExecHealthcheckSchema>

export const flyFileSchema = z.object({
  guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
  image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
  mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
  raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
  secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
}).describe("A file that will be written to the Machine. One of RawValue or SecretName must be set.")
export type flyFile = z.infer<typeof flyFileSchema>

export const flyHTTPHealthcheckSchema = z.object({
  headers: z.array(z.object({
    name: z.string().optional().describe("The header name"),
    values: z.array(z.string()).optional().describe("The header value"),
  })).optional().describe("Additional headers to send with the request"),
  method: z.string().optional().describe("The HTTP method to use to when making the request"),
  path: z.string().optional().describe("The path to send the request to"),
  port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
  scheme: z.unknown().optional().describe("Whether to use http or https"),
  tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
  tls_skip_verify: z.boolean().optional().describe("If the protocol is https, whether or not to verify the TLS certificate"),
})
export type flyHTTPHealthcheck = z.infer<typeof flyHTTPHealthcheckSchema>

export const flyHTTPOptionsSchema = z.object({
  compress: z.boolean().optional(),
  h2_backend: z.boolean().optional(),
  headers_read_timeout: z.number().int().optional(),
  idle_timeout: z.number().int().optional(),
  replay_cache: z.array(z.object({
    allow_bypass: z.boolean().optional(),
    name: z.string().optional().describe("Name of the cookie or header to key the cache on"),
    path_prefix: z.string().optional(),
    ttl_seconds: z.number().int().optional(),
    type: z.enum(["cookie", "header"]).optional().describe("Currently either \"cookie\" or \"header\""),
  })).optional(),
  response: z.object({
    headers: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
    pristine: z.boolean().optional(),
  }).optional(),
})
export type flyHTTPOptions = z.infer<typeof flyHTTPOptionsSchema>

export const flyHTTPResponseOptionsSchema = z.object({
  headers: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
  pristine: z.boolean().optional(),
})
export type flyHTTPResponseOptions = z.infer<typeof flyHTTPResponseOptionsSchema>

export const flyMachineCheckSchema = z.object({
  grace_period: z.object({
    "time.Duration": z.number().int().optional(),
  }).optional().describe("The time to wait after a VM starts before checking its health"),
  headers: z.array(z.object({
    name: z.string().optional().describe("The header name"),
    values: z.array(z.string()).optional().describe("The header value"),
  })).optional(),
  interval: z.object({
    "time.Duration": z.number().int().optional(),
  }).optional().describe("The time between connectivity checks"),
  kind: z.enum(["informational", "readiness"]).optional().describe("Kind of the check (informational, readiness)"),
  method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
  path: z.string().optional().describe("For http checks, the path to send the request to"),
  port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
  protocol: z.string().optional().describe("For http checks, whether to use http or https"),
  timeout: z.object({
    "time.Duration": z.number().int().optional(),
  }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
  tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
  tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
  type: z.string().optional().describe("tcp or http"),
})
export type flyMachineCheck = z.infer<typeof flyMachineCheckSchema>

export const flyMachineConfigSchema = z.object({
  auto_destroy: z.boolean().optional().describe("Optional boolean telling the Machine to destroy itself once it’s complete (default false)"),
  checks: z.record(z.string(), z.object({
    grace_period: z.object({
      "time.Duration": z.number().int().optional(),
    }).optional().describe("The time to wait after a VM starts before checking its health"),
    headers: z.array(z.object({
      name: z.string().optional().describe("The header name"),
      values: z.array(z.string()).optional().describe("The header value"),
    })).optional(),
    interval: z.object({
      "time.Duration": z.number().int().optional(),
    }).optional().describe("The time between connectivity checks"),
    kind: z.enum(["informational", "readiness"]).optional().describe("Kind of the check (informational, readiness)"),
    method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
    path: z.string().optional().describe("For http checks, the path to send the request to"),
    port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
    protocol: z.string().optional().describe("For http checks, whether to use http or https"),
    timeout: z.object({
      "time.Duration": z.number().int().optional(),
    }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
    tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
    tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
    type: z.string().optional().describe("tcp or http"),
  })).optional().describe("An optional object that defines one or more named top-level checks. The key for each check is the check name."),
  containers: z.array(z.object({
    cmd: z.array(z.string()).optional().describe("CmdOverride is used to override the default command of the image."),
    depends_on: z.array(z.object({
      condition: z.unknown().optional(),
      name: z.string().optional(),
    })).optional().describe("DependsOn can be used to define dependencies between containers. The container will only be\nstarted after all of its dependent conditions have been satisfied."),
    entrypoint: z.array(z.string()).optional().describe("EntrypointOverride is used to override the default entrypoint of the image."),
    env: z.record(z.string(), z.string()).optional().describe("ExtraEnv is used to add additional environment variables to the container."),
    env_from: z.array(z.object({
      env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
      field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
    })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
    exec: z.array(z.string()).optional().describe("Image Config overrides - these fields are used to override the image configuration.\nIf not provided, the image configuration will be used.\nExecOverride is used to override the default command of the image."),
    files: z.array(z.object({
      guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
      image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
      mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
      raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
      secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
    })).optional().describe("Files are files that will be written to the container file system."),
    healthchecks: z.array(z.object({
      exec: z.object({
        command: z.array(z.string()).optional().describe("The command to run to check the health of the container (e.g. [\"cat\", \"/tmp/healthy\"])"),
      }).optional(),
      failure_threshold: z.number().int().optional().describe("The number of times the check must fail before considering the container unhealthy."),
      grace_period: z.number().int().optional().describe("The time in seconds to wait after a container starts before checking its health."),
      http: z.object({
        headers: z.array(z.object({
          name: z.string().optional().describe("The header name"),
          values: z.array(z.string()).optional().describe("The header value"),
        })).optional().describe("Additional headers to send with the request"),
        method: z.string().optional().describe("The HTTP method to use to when making the request"),
        path: z.string().optional().describe("The path to send the request to"),
        port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
        scheme: z.unknown().optional().describe("Whether to use http or https"),
        tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
        tls_skip_verify: z.boolean().optional().describe("If the protocol is https, whether or not to verify the TLS certificate"),
      }).optional(),
      interval: z.number().int().optional().describe("The time in seconds between executing the defined check."),
      kind: z.unknown().optional().describe("Kind of healthcheck (readiness, liveness)"),
      name: z.string().optional().describe("The name of the check. Must be unique within the container."),
      success_threshold: z.number().int().optional().describe("The number of times the check must succeeed before considering the container healthy."),
      tcp: z.object({
        port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
      }).optional(),
      timeout: z.number().int().optional().describe("The time in seconds to wait for the check to complete."),
      unhealthy: z.unknown().optional().describe("Unhealthy policy that determines what action to take if a container is deemed unhealthy"),
    })).optional().describe("Healthchecks determine the health of your containers. Healthchecks can use HTTP, TCP or an Exec command."),
    image: z.string().optional().describe("Image is the docker image to run."),
    name: z.string().optional().describe("Name is used to identify the container in the machine."),
    restart: z.object({
      gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
      max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
      policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
    }).optional().describe("Restart is used to define the restart policy for the container. NOTE: spot-price is not\nsupported for containers."),
    secrets: z.array(z.object({
      env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
      name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
    })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
    stop: z.object({
      signal: z.string().optional(),
      timeout: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional(),
    }).optional().describe("Stop is used to define the signal and timeout for stopping the container."),
    user: z.string().optional().describe("UserOverride is used to override the default user of the image."),
  })).optional().describe("Containers are a list of containers that will run in the machine. Currently restricted to\nonly specific organizations."),
  disable_machine_autostart: z.boolean().optional().describe("Deprecated: use Service.Autostart instead"),
  dns: z.object({
    dns_forward_rules: z.array(z.object({
      addr: z.string().optional(),
      basename: z.string().optional(),
    })).optional(),
    hostname: z.string().optional(),
    hostname_fqdn: z.string().optional(),
    nameservers: z.array(z.string()).optional(),
    options: z.array(z.object({
      name: z.string().optional(),
      value: z.string().optional(),
    })).optional(),
    searches: z.array(z.string()).optional(),
    skip_registration: z.boolean().optional(),
  }).optional(),
  env: z.record(z.string(), z.string()).optional().describe("An object filled with key/value pairs to be set as environment variables"),
  files: z.array(z.object({
    guest_path: z.string().optional().describe("GuestPath is the path on the machine where the file will be written and must be an absolute path.\nFor example: /full/path/to/file.json"),
    image_config: z.string().optional().describe("The name of an image to use the OCI image config as the file contents."),
    mode: z.number().int().optional().describe("Mode bits used to set permissions on this file as accepted by chmod(2)."),
    raw_value: z.string().optional().describe("The base64 encoded string of the file contents."),
    secret_name: z.string().optional().describe("The name of the secret that contains the base64 encoded file contents."),
  })).optional(),
  guest: z.object({
    cpu_kind: z.string().optional(),
    cpus: z.number().int().optional(),
    gpu_kind: z.string().optional(),
    gpus: z.number().int().optional(),
    host_dedication_id: z.string().optional(),
    kernel_args: z.array(z.string()).optional(),
    memory_mb: z.number().int().optional(),
    persist_rootfs: z.enum(["never", "always", "restart"]).optional().describe("Deprecated: use MachineConfig.Rootfs instead"),
  }).optional(),
  image: z.string().optional().describe("The docker image to run"),
  init: z.object({
    cmd: z.array(z.string()).optional(),
    entrypoint: z.array(z.string()).optional(),
    exec: z.array(z.string()).optional(),
    kernel_args: z.array(z.string()).optional(),
    swap_size_mb: z.number().int().optional(),
    tty: z.boolean().optional(),
  }).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  metrics: z.object({
    https: z.boolean().optional(),
    path: z.string().optional(),
    port: z.number().int().optional(),
  }).optional(),
  mounts: z.array(z.object({
    add_size_gb: z.number().int().optional(),
    encrypted: z.boolean().optional(),
    extend_threshold_percent: z.number().int().optional(),
    name: z.string().optional(),
    path: z.string().optional(),
    size_gb: z.number().int().optional(),
    size_gb_limit: z.number().int().optional(),
    volume: z.string().optional(),
  })).optional(),
  processes: z.array(z.object({
    cmd: z.array(z.string()).optional(),
    entrypoint: z.array(z.string()).optional(),
    env: z.record(z.string(), z.string()).optional(),
    env_from: z.array(z.object({
      env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
      field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
    })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
    exec: z.array(z.string()).optional(),
    ignore_app_secrets: z.boolean().optional().describe("IgnoreAppSecrets can be set to true to ignore the secrets for the App the Machine belongs to\nand only use the secrets provided at the process level. The default/legacy behavior is to use\nthe secrets provided at the App level."),
    secrets: z.array(z.object({
      env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
      name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
    })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
    user: z.string().optional(),
  })).optional(),
  restart: z.object({
    gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
    max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
    policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
  }).optional().describe("The Machine restart policy defines whether and how flyd restarts a Machine after its main process exits. See https://fly.io/docs/machines/guides-examples/machine-restart-policy/."),
  rootfs: z.object({
    fs_size_gb: z.number().int().optional(),
    persist: z.enum(["never", "always", "restart"]).optional(),
    size_gb: z.number().int().optional(),
  }).optional(),
  schedule: z.string().optional(),
  services: z.array(z.object({
    autostart: z.boolean().optional(),
    autostop: z.enum(["off", "stop", "suspend"]).optional().describe("Accepts a string (new format) or a boolean (old format). For backward compatibility with older clients, the API continues to use booleans for \"off\" and \"stop\" in responses.\n* \"off\" or false - Do not autostop the Machine.\n* \"stop\" or true - Automatically stop the Machine.\n* \"suspend\" - Automatically suspend the Machine, falling back to a full stop if this is not possible."),
    checks: z.array(z.object({
      grace_period: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The time to wait after a VM starts before checking its health"),
      headers: z.array(z.object({
        name: z.string().optional().describe("The header name"),
        values: z.array(z.string()).optional().describe("The header value"),
      })).optional(),
      interval: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The time between connectivity checks"),
      method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
      path: z.string().optional().describe("For http checks, the path to send the request to"),
      port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
      protocol: z.string().optional().describe("For http checks, whether to use http or https"),
      timeout: z.object({
        "time.Duration": z.number().int().optional(),
      }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
      tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
      tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
      type: z.string().optional().describe("tcp or http"),
    })).optional().describe("An optional list of service checks"),
    concurrency: z.object({
      hard_limit: z.number().int().optional(),
      soft_limit: z.number().int().optional(),
      type: z.string().optional(),
    }).optional(),
    force_instance_description: z.string().optional(),
    force_instance_key: z.string().optional(),
    internal_port: z.number().int().optional(),
    min_machines_running: z.number().int().optional(),
    ports: z.array(z.object({
      end_port: z.number().int().optional(),
      force_https: z.boolean().optional(),
      handlers: z.array(z.string()).optional(),
      http_options: z.object({
        compress: z.boolean().optional(),
        h2_backend: z.boolean().optional(),
        headers_read_timeout: z.number().int().optional(),
        idle_timeout: z.number().int().optional(),
        replay_cache: z.array(z.object({
          allow_bypass: z.boolean().optional(),
          name: z.string().optional().describe("Name of the cookie or header to key the cache on"),
          path_prefix: z.string().optional(),
          ttl_seconds: z.number().int().optional(),
          type: z.enum(["cookie", "header"]).optional().describe("Currently either \"cookie\" or \"header\""),
        })).optional(),
        response: z.object({
          headers: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
          pristine: z.boolean().optional(),
        }).optional(),
      }).optional(),
      port: z.number().int().optional(),
      proxy_proto_options: z.object({
        version: z.string().optional(),
      }).optional(),
      start_port: z.number().int().optional(),
      tls_options: z.object({
        alpn: z.array(z.string()).optional(),
        default_self_signed: z.boolean().optional(),
        versions: z.array(z.string()).optional(),
      }).optional(),
    })).optional(),
    protocol: z.string().optional(),
  })).optional(),
  size: z.string().optional().describe("Deprecated: use Guest instead"),
  standbys: z.array(z.string()).optional().describe("Standbys enable a machine to be a standby for another. In the event of a hardware failure,\nthe standby machine will be started."),
  statics: z.array(z.object({
    guest_path: z.string(),
    index_document: z.string().optional(),
    tigris_bucket: z.string().optional(),
    url_prefix: z.string(),
  })).optional(),
  stop_config: z.object({
    signal: z.string().optional(),
    timeout: z.object({
      "time.Duration": z.number().int().optional(),
    }).optional(),
  }).optional(),
})
export type flyMachineConfig = z.infer<typeof flyMachineConfigSchema>

export const flyMachineGuestSchema = z.object({
  cpu_kind: z.string().optional(),
  cpus: z.number().int().optional(),
  gpu_kind: z.string().optional(),
  gpus: z.number().int().optional(),
  host_dedication_id: z.string().optional(),
  kernel_args: z.array(z.string()).optional(),
  memory_mb: z.number().int().optional(),
  persist_rootfs: z.enum(["never", "always", "restart"]).optional().describe("Deprecated: use MachineConfig.Rootfs instead"),
})
export type flyMachineGuest = z.infer<typeof flyMachineGuestSchema>

export const flyMachineHTTPHeaderSchema = z.object({
  name: z.string().optional().describe("The header name"),
  values: z.array(z.string()).optional().describe("The header value"),
}).describe("For http checks, an array of objects with string field Name and array of strings field Values. The key/value pairs specify header and header values that will get passed with the check call.")
export type flyMachineHTTPHeader = z.infer<typeof flyMachineHTTPHeaderSchema>

export const flyMachineInitSchema = z.object({
  cmd: z.array(z.string()).optional(),
  entrypoint: z.array(z.string()).optional(),
  exec: z.array(z.string()).optional(),
  kernel_args: z.array(z.string()).optional(),
  swap_size_mb: z.number().int().optional(),
  tty: z.boolean().optional(),
})
export type flyMachineInit = z.infer<typeof flyMachineInitSchema>

export const flyMachineMetricsSchema = z.object({
  https: z.boolean().optional(),
  path: z.string().optional(),
  port: z.number().int().optional(),
})
export type flyMachineMetrics = z.infer<typeof flyMachineMetricsSchema>

export const flyMachineMountSchema = z.object({
  add_size_gb: z.number().int().optional(),
  encrypted: z.boolean().optional(),
  extend_threshold_percent: z.number().int().optional(),
  name: z.string().optional(),
  path: z.string().optional(),
  size_gb: z.number().int().optional(),
  size_gb_limit: z.number().int().optional(),
  volume: z.string().optional(),
})
export type flyMachineMount = z.infer<typeof flyMachineMountSchema>

export const flyMachinePortSchema = z.object({
  end_port: z.number().int().optional(),
  force_https: z.boolean().optional(),
  handlers: z.array(z.string()).optional(),
  http_options: z.object({
    compress: z.boolean().optional(),
    h2_backend: z.boolean().optional(),
    headers_read_timeout: z.number().int().optional(),
    idle_timeout: z.number().int().optional(),
    replay_cache: z.array(z.object({
      allow_bypass: z.boolean().optional(),
      name: z.string().optional().describe("Name of the cookie or header to key the cache on"),
      path_prefix: z.string().optional(),
      ttl_seconds: z.number().int().optional(),
      type: z.enum(["cookie", "header"]).optional().describe("Currently either \"cookie\" or \"header\""),
    })).optional(),
    response: z.object({
      headers: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
      pristine: z.boolean().optional(),
    }).optional(),
  }).optional(),
  port: z.number().int().optional(),
  proxy_proto_options: z.object({
    version: z.string().optional(),
  }).optional(),
  start_port: z.number().int().optional(),
  tls_options: z.object({
    alpn: z.array(z.string()).optional(),
    default_self_signed: z.boolean().optional(),
    versions: z.array(z.string()).optional(),
  }).optional(),
})
export type flyMachinePort = z.infer<typeof flyMachinePortSchema>

export const flyMachineProcessSchema = z.object({
  cmd: z.array(z.string()).optional(),
  entrypoint: z.array(z.string()).optional(),
  env: z.record(z.string(), z.string()).optional(),
  env_from: z.array(z.object({
    env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
    field_ref: z.enum(["id", "version", "app_name", "private_ip", "region", "image"]).optional().describe("FieldRef selects a field of the Machine: supports id, version, app_name, private_ip, region, image."),
  })).optional().describe("EnvFrom can be provided to set environment variables from machine fields."),
  exec: z.array(z.string()).optional(),
  ignore_app_secrets: z.boolean().optional().describe("IgnoreAppSecrets can be set to true to ignore the secrets for the App the Machine belongs to\nand only use the secrets provided at the process level. The default/legacy behavior is to use\nthe secrets provided at the App level."),
  secrets: z.array(z.object({
    env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
    name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
  })).optional().describe("Secrets can be provided at the process level to explicitly indicate which secrets should be\nused for the process. If not provided, the secrets provided at the machine level will be used."),
  user: z.string().optional(),
})
export type flyMachineProcess = z.infer<typeof flyMachineProcessSchema>

export const flyMachineRestartSchema = z.object({
  gpu_bid_price: z.number().optional().describe("GPU bid price for spot Machines."),
  max_retries: z.number().int().optional().describe("When policy is on-failure, the maximum number of times to attempt to restart the Machine before letting it stop."),
  policy: z.enum(["no", "always", "on-failure", "spot-price"]).optional().describe("* no - Never try to restart a Machine automatically when its main process exits, whether that’s on purpose or on a crash.\n* always - Always restart a Machine automatically and never let it enter a stopped state, even when the main process exits cleanly.\n* on-failure - Try up to MaxRetries times to automatically restart the Machine if it exits with a non-zero exit code. Default when no explicit policy is set, and for Machines with schedules.\n* spot-price - Starts the Machine only when there is capacity and the spot price is less than or equal to the bid price."),
}).describe("The Machine restart policy defines whether and how flyd restarts a Machine after its main process exits. See https://fly.io/docs/machines/guides-examples/machine-restart-policy/.")
export type flyMachineRestart = z.infer<typeof flyMachineRestartSchema>

export const flyMachineRootfsSchema = z.object({
  fs_size_gb: z.number().int().optional(),
  persist: z.enum(["never", "always", "restart"]).optional(),
  size_gb: z.number().int().optional(),
})
export type flyMachineRootfs = z.infer<typeof flyMachineRootfsSchema>

export const flyMachineSecretSchema = z.object({
  env_var: z.string().optional().describe("EnvVar is required and is the name of the environment variable that will be set from the\nsecret. It must be a valid environment variable name."),
  name: z.string().optional().describe("Name is optional and when provided is used to reference a secret name where the EnvVar is\ndifferent from what was set as the secret name."),
}).describe("A Secret needing to be set in the environment of the Machine. env_var is required")
export type flyMachineSecret = z.infer<typeof flyMachineSecretSchema>

export const flyMachineServiceSchema = z.object({
  autostart: z.boolean().optional(),
  autostop: z.enum(["off", "stop", "suspend"]).optional().describe("Accepts a string (new format) or a boolean (old format). For backward compatibility with older clients, the API continues to use booleans for \"off\" and \"stop\" in responses.\n* \"off\" or false - Do not autostop the Machine.\n* \"stop\" or true - Automatically stop the Machine.\n* \"suspend\" - Automatically suspend the Machine, falling back to a full stop if this is not possible."),
  checks: z.array(z.object({
    grace_period: z.object({
      "time.Duration": z.number().int().optional(),
    }).optional().describe("The time to wait after a VM starts before checking its health"),
    headers: z.array(z.object({
      name: z.string().optional().describe("The header name"),
      values: z.array(z.string()).optional().describe("The header value"),
    })).optional(),
    interval: z.object({
      "time.Duration": z.number().int().optional(),
    }).optional().describe("The time between connectivity checks"),
    method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
    path: z.string().optional().describe("For http checks, the path to send the request to"),
    port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
    protocol: z.string().optional().describe("For http checks, whether to use http or https"),
    timeout: z.object({
      "time.Duration": z.number().int().optional(),
    }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
    tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
    tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
    type: z.string().optional().describe("tcp or http"),
  })).optional().describe("An optional list of service checks"),
  concurrency: z.object({
    hard_limit: z.number().int().optional(),
    soft_limit: z.number().int().optional(),
    type: z.string().optional(),
  }).optional(),
  force_instance_description: z.string().optional(),
  force_instance_key: z.string().optional(),
  internal_port: z.number().int().optional(),
  min_machines_running: z.number().int().optional(),
  ports: z.array(z.object({
    end_port: z.number().int().optional(),
    force_https: z.boolean().optional(),
    handlers: z.array(z.string()).optional(),
    http_options: z.object({
      compress: z.boolean().optional(),
      h2_backend: z.boolean().optional(),
      headers_read_timeout: z.number().int().optional(),
      idle_timeout: z.number().int().optional(),
      replay_cache: z.array(z.object({
        allow_bypass: z.boolean().optional(),
        name: z.string().optional().describe("Name of the cookie or header to key the cache on"),
        path_prefix: z.string().optional(),
        ttl_seconds: z.number().int().optional(),
        type: z.enum(["cookie", "header"]).optional().describe("Currently either \"cookie\" or \"header\""),
      })).optional(),
      response: z.object({
        headers: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
        pristine: z.boolean().optional(),
      }).optional(),
    }).optional(),
    port: z.number().int().optional(),
    proxy_proto_options: z.object({
      version: z.string().optional(),
    }).optional(),
    start_port: z.number().int().optional(),
    tls_options: z.object({
      alpn: z.array(z.string()).optional(),
      default_self_signed: z.boolean().optional(),
      versions: z.array(z.string()).optional(),
    }).optional(),
  })).optional(),
  protocol: z.string().optional(),
})
export type flyMachineService = z.infer<typeof flyMachineServiceSchema>

export const flyMachineServiceCheckSchema = z.object({
  grace_period: z.object({
    "time.Duration": z.number().int().optional(),
  }).optional().describe("The time to wait after a VM starts before checking its health"),
  headers: z.array(z.object({
    name: z.string().optional().describe("The header name"),
    values: z.array(z.string()).optional().describe("The header value"),
  })).optional(),
  interval: z.object({
    "time.Duration": z.number().int().optional(),
  }).optional().describe("The time between connectivity checks"),
  method: z.string().optional().describe("For http checks, the HTTP method to use to when making the request"),
  path: z.string().optional().describe("For http checks, the path to send the request to"),
  port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
  protocol: z.string().optional().describe("For http checks, whether to use http or https"),
  timeout: z.object({
    "time.Duration": z.number().int().optional(),
  }).optional().describe("The maximum time a connection can take before being reported as failing its health check"),
  tls_server_name: z.string().optional().describe("If the protocol is https, the hostname to use for TLS certificate validation"),
  tls_skip_verify: z.boolean().optional().describe("For http checks with https protocol, whether or not to verify the TLS certificate"),
  type: z.string().optional().describe("tcp or http"),
})
export type flyMachineServiceCheck = z.infer<typeof flyMachineServiceCheckSchema>

export const flyMachineServiceConcurrencySchema = z.object({
  hard_limit: z.number().int().optional(),
  soft_limit: z.number().int().optional(),
  type: z.string().optional(),
})
export type flyMachineServiceConcurrency = z.infer<typeof flyMachineServiceConcurrencySchema>

export const flyProxyProtoOptionsSchema = z.object({
  version: z.string().optional(),
})
export type flyProxyProtoOptions = z.infer<typeof flyProxyProtoOptionsSchema>

export const flyReplayCacheSchema = z.object({
  allow_bypass: z.boolean().optional(),
  name: z.string().optional().describe("Name of the cookie or header to key the cache on"),
  path_prefix: z.string().optional(),
  ttl_seconds: z.number().int().optional(),
  type: z.enum(["cookie", "header"]).optional().describe("Currently either \"cookie\" or \"header\""),
})
export type flyReplayCache = z.infer<typeof flyReplayCacheSchema>

export const flyStaticSchema = z.object({
  guest_path: z.string(),
  index_document: z.string().optional(),
  tigris_bucket: z.string().optional(),
  url_prefix: z.string(),
})
export type flyStatic = z.infer<typeof flyStaticSchema>

export const flyStopConfigSchema = z.object({
  signal: z.string().optional(),
  timeout: z.object({
    "time.Duration": z.number().int().optional(),
  }).optional(),
})
export type flyStopConfig = z.infer<typeof flyStopConfigSchema>

export const flyTCPHealthcheckSchema = z.object({
  port: z.number().int().optional().describe("The port to connect to, often the same as internal_port"),
})
export type flyTCPHealthcheck = z.infer<typeof flyTCPHealthcheckSchema>

export const flyTLSOptionsSchema = z.object({
  alpn: z.array(z.string()).optional(),
  default_self_signed: z.boolean().optional(),
  versions: z.array(z.string()).optional(),
})
export type flyTLSOptions = z.infer<typeof flyTLSOptionsSchema>

export const flyUnhealthyPolicySchema = z.literal("stop")
export type flyUnhealthyPolicy = z.infer<typeof flyUnhealthyPolicySchema>

export const flydnsForwardRuleSchema = z.object({
  addr: z.string().optional(),
  basename: z.string().optional(),
})
export type flydnsForwardRule = z.infer<typeof flydnsForwardRuleSchema>

export const flydnsOptionSchema = z.object({
  name: z.string().optional(),
  value: z.string().optional(),
})
export type flydnsOption = z.infer<typeof flydnsOptionSchema>

export const flydv1ExecResponseSchema = z.object({
  exit_code: z.number().int().optional(),
  exit_signal: z.number().int().optional(),
  stderr: z.string().optional(),
  stdout: z.string().optional(),
})
export type flydv1ExecResponse = z.infer<typeof flydv1ExecResponseSchema>

export const listCertificatesResponseSchema = z.object({
  certificates: z.array(z.object({
    acme_alpn_configured: z.boolean().optional(),
    acme_dns_configured: z.boolean().optional(),
    acme_http_configured: z.boolean().optional(),
    acme_requested: z.boolean().optional(),
    configured: z.boolean().optional(),
    created_at: z.string().optional(),
    dns_provider: z.string().optional(),
    has_custom_certificate: z.boolean().optional(),
    has_fly_certificate: z.boolean().optional(),
    hostname: z.string().optional(),
    ownership_txt_configured: z.boolean().optional(),
    status: z.string().optional(),
    updated_at: z.string().optional(),
  })).optional(),
  next_cursor: z.string().optional(),
  total_count: z.number().int().optional(),
})
export type listCertificatesResponse = z.infer<typeof listCertificatesResponseSchema>

export const listIPAssignmentsResponseSchema = z.object({
  ips: z.array(z.object({
    created_at: z.string().optional(),
    ip: z.string().optional(),
    region: z.string().optional(),
    service_name: z.string().optional(),
    shared: z.boolean().optional(),
  })).optional(),
})
export type listIPAssignmentsResponse = z.infer<typeof listIPAssignmentsResponseSchema>

export const maingetPlacementsRequestSchema = z.object({
  compute: z.object({
    cpu_kind: z.string().optional(),
    cpus: z.number().int().optional(),
    gpu_kind: z.string().optional(),
    gpus: z.number().int().optional(),
    host_dedication_id: z.string().optional(),
    kernel_args: z.array(z.string()).optional(),
    memory_mb: z.number().int().optional(),
    persist_rootfs: z.enum(["never", "always", "restart"]).optional().describe("Deprecated: use MachineConfig.Rootfs instead"),
  }).optional().describe("Resource requirements for the Machine to simulate. Defaults to a performance-1x machine"),
  count: z.number().int().optional().describe("Number of machines to simulate placement.\nDefaults to 0, which returns the org-specific limit for each region."),
  org_slug: z.string(),
  region: z.string().optional().describe("Region expression for placement as a comma-delimited set of regions or aliases.\nDefaults to \"[region],any\", to prefer the API endpoint's local region with any other region as fallback."),
  volume_name: z.string().optional(),
  volume_size_bytes: z.number().int().optional(),
  weights: z.unknown().optional().describe("Optional weights to override default placement preferences."),
})
export type maingetPlacementsRequest = z.infer<typeof maingetPlacementsRequestSchema>

export const maingetPlacementsResponseSchema = z.object({
  regions: z.array(z.object({
    concurrency: z.number().int().optional(),
    count: z.number().int().optional(),
    region: z.string().optional(),
  })).optional(),
})
export type maingetPlacementsResponse = z.infer<typeof maingetPlacementsResponseSchema>

export const mainmemoryResponseSchema = z.object({
  available_mb: z.number().int().optional(),
  limit_mb: z.number().int().optional(),
})
export type mainmemoryResponse = z.infer<typeof mainmemoryResponseSchema>

export const mainreclaimMemoryRequestSchema = z.object({
  amount_mb: z.number().int().optional(),
})
export type mainreclaimMemoryRequest = z.infer<typeof mainreclaimMemoryRequestSchema>

export const mainreclaimMemoryResponseSchema = z.object({
  actual_mb: z.number().int().optional(),
})
export type mainreclaimMemoryResponse = z.infer<typeof mainreclaimMemoryResponseSchema>

export const mainregionResponseSchema = z.object({
  nearest: z.string().optional(),
  regions: z.array(z.object({
    capacity: z.number().int().optional(),
    code: z.string().optional(),
    deprecated: z.boolean().optional(),
    gateway_available: z.boolean().optional(),
    geo_region: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    name: z.string().optional(),
    requires_paid_plan: z.boolean().optional(),
  })).optional(),
})
export type mainregionResponse = z.infer<typeof mainregionResponseSchema>

export const mainsetMemoryLimitRequestSchema = z.object({
  limit_mb: z.number().int().optional(),
})
export type mainsetMemoryLimitRequest = z.infer<typeof mainsetMemoryLimitRequestSchema>

export const mainstatusCodeSchema = z.enum(["unknown", "insufficient_capacity"])
export type mainstatusCode = z.infer<typeof mainstatusCodeSchema>

export const maintokenInfoSchema = z.object({
  apps: z.array(z.string()).optional(),
  org_slug: z.string().optional(),
  organization: z.string().optional(),
  restricted_to_machine: z.string().optional().describe("Machine the token is restricted to (FromMachine caveat)"),
  source_machine_id: z.string().optional().describe("Machine making the request"),
  token_id: z.string().optional(),
  user: z.string().optional().describe("User identifier if token is for a user"),
})
export type maintokenInfo = z.infer<typeof maintokenInfoSchema>

export const metadataValueResponseSchema = z.object({
  value: z.string().optional(),
})
export type metadataValueResponse = z.infer<typeof metadataValueResponseSchema>

export const placementRegionPlacementSchema = z.object({
  concurrency: z.number().int().optional(),
  count: z.number().int().optional(),
  region: z.string().optional(),
})
export type placementRegionPlacement = z.infer<typeof placementRegionPlacementSchema>

export const placementWeightsSchema = z.record(z.string(), z.number().int())
export type placementWeights = z.infer<typeof placementWeightsSchema>

export const readsGetCapacityPerRegionRowSchema = z.object({
  capacity: z.number().int().optional(),
  code: z.string().optional(),
  deprecated: z.boolean().optional(),
  gateway_available: z.boolean().optional(),
  geo_region: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  name: z.string().optional(),
  requires_paid_plan: z.boolean().optional(),
})
export type readsGetCapacityPerRegionRow = z.infer<typeof readsGetCapacityPerRegionRowSchema>

export const updateMetadataRequestSchema = z.object({
  machine_version: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  updated_at: z.string().optional(),
})
export type updateMetadataRequest = z.infer<typeof updateMetadataRequestSchema>

export const upsertMetadataKeyRequestSchema = z.object({
  updated_at: z.string().optional(),
  value: z.string().optional(),
})
export type upsertMetadataKeyRequest = z.infer<typeof upsertMetadataKeyRequestSchema>
