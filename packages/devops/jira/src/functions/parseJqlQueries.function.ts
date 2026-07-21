// JQL — This resource represents JQL search auto-complete details. Use it to obtain JQL search auto-complete data and suggestions for use in programmatic construction of queries or custom query builders. It also provides operations to: * convert one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs. * convert readable details in one or more JQL queries to IDs where a user doesn't have permission to view the entity whose details are readable.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const ParseJqlQueriesInput = z.object({
  validation: z.enum(["strict", "warn", "none"]).optional().default("strict").describe("How to validate the JQL query and treat the validation results. Validation options include:\n\n *  `strict` Returns all errors. If validation fails, the query structure is not returned.\n *  `warn` Returns all errors. If validation fails but the JQL query is correctly formed, the query structure is returned.\n *  `none` No validation is performed. If JQL query is correctly formed, the query structure is returned."),
  queries: z.array(z.string()).describe("A list of queries to parse."),
})

export const ParseJqlQueriesOutput = z.object({
  queries: z.array(z.object({
    errors: z.array(z.string()).optional().describe("The list of syntax or validation errors."),
    query: z.string().describe("The JQL query that was parsed and validated."),
    structure: z.object({
      orderBy: z.object({
        fields: z.array(z.object({
          direction: z.enum(["asc", "desc"]).optional().describe("The direction in which to order the results."),
          field: z.object({
            encodedName: z.string().optional().describe("The encoded name of the field, which can be used directly in a JQL query."),
            name: z.string().describe("The name of the field."),
            property: z.array(z.object({
              entity: z.string().describe("The object on which the property is set."),
              key: z.string().describe("The key of the property."),
              path: z.string().describe("The path in the property value to query."),
              type: z.enum(["number", "string", "text", "date", "user"]).optional().describe("The type of the property value extraction. Not available if the extraction for the property is not registered on the instance with the [Entity property](https://developer.atlassian.com/cloud/jira/platform/modules/entity-property/) module."),
            })).optional().describe("When the field refers to a value in an entity property, details of the entity property value."),
          }).describe("A field used in a JQL query. See [Advanced searching - fields reference](https://confluence.atlassian.com/x/dAiiLQ) for more information about fields in JQL queries."),
        })).describe("The list of order-by clause fields and their ordering directives."),
      }).optional().describe("Details of the order-by JQL clause."),
      where: z.union([z.object({
        clauses: z.array(z.union([z.any(), z.object({
          field: z.object({
            encodedName: z.string().optional().describe("The encoded name of the field, which can be used directly in a JQL query."),
            name: z.string().describe("The name of the field."),
            property: z.array(z.object({
              entity: z.string().describe("The object on which the property is set."),
              key: z.string().describe("The key of the property."),
              path: z.string().describe("The path in the property value to query."),
              type: z.enum(["number", "string", "text", "date", "user"]).optional().describe("The type of the property value extraction. Not available if the extraction for the property is not registered on the instance with the [Entity property](https://developer.atlassian.com/cloud/jira/platform/modules/entity-property/) module."),
            })).optional().describe("When the field refers to a value in an entity property, details of the entity property value."),
          }).describe("A field used in a JQL query. See [Advanced searching - fields reference](https://confluence.atlassian.com/x/dAiiLQ) for more information about fields in JQL queries."),
          operand: z.union([z.object({
            encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
            values: z.array(z.union([z.object({
              encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
              value: z.string().describe("The operand value."),
            }), z.object({
              arguments: z.array(z.string()).describe("The list of function arguments."),
              encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
              function: z.string().describe("The name of the function."),
            }), z.object({
              keyword: z.literal("empty").describe("The keyword that is the operand value."),
            })])).describe("The list of operand values."),
          }), z.object({
            encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
            value: z.string().describe("The operand value."),
          }), z.object({
            arguments: z.array(z.string()).describe("The list of function arguments."),
            encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
            function: z.string().describe("The name of the function."),
          }), z.object({
            keyword: z.literal("empty").describe("The keyword that is the operand value."),
          })]).describe("Details of an operand in a JQL clause."),
          operator: z.enum(["=", "!=", ">", "<", ">=", "<=", "in", "not in", "~", "~=", "is", "is not"]).describe("The operator between the field and operand."),
        }), z.object({
          field: z.object({
            encodedName: z.string().optional().describe("The encoded name of the field, which can be used directly in a JQL query."),
            name: z.string().describe("The name of the field."),
            property: z.array(z.object({
              entity: z.string().describe("The object on which the property is set."),
              key: z.string().describe("The key of the property."),
              path: z.string().describe("The path in the property value to query."),
              type: z.enum(["number", "string", "text", "date", "user"]).optional().describe("The type of the property value extraction. Not available if the extraction for the property is not registered on the instance with the [Entity property](https://developer.atlassian.com/cloud/jira/platform/modules/entity-property/) module."),
            })).optional().describe("When the field refers to a value in an entity property, details of the entity property value."),
          }).describe("A field used in a JQL query. See [Advanced searching - fields reference](https://confluence.atlassian.com/x/dAiiLQ) for more information about fields in JQL queries."),
          operand: z.union([z.object({
            encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
            values: z.array(z.union([z.object({
              encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
              value: z.string().describe("The operand value."),
            }), z.object({
              arguments: z.array(z.string()).describe("The list of function arguments."),
              encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
              function: z.string().describe("The name of the function."),
            }), z.object({
              keyword: z.literal("empty").describe("The keyword that is the operand value."),
            })])).describe("The list of operand values."),
          }), z.object({
            encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
            value: z.string().describe("The operand value."),
          }), z.object({
            arguments: z.array(z.string()).describe("The list of function arguments."),
            encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
            function: z.string().describe("The name of the function."),
          }), z.object({
            keyword: z.literal("empty").describe("The keyword that is the operand value."),
          })]).describe("Details of an operand in a JQL clause."),
          operator: z.enum(["was", "was in", "was not in", "was not"]).describe("The operator between the field and operand."),
          predicates: z.array(z.object({
            operand: z.union([z.object({
              encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
              values: z.array(z.union([z.object({
                encodedValue: z.any().optional().describe("Encoded value, which can be used directly in a JQL query."),
                value: z.any().describe("The operand value."),
              }), z.object({
                arguments: z.any().describe("The list of function arguments."),
                encodedOperand: z.any().optional().describe("Encoded operand, which can be used directly in a JQL query."),
                function: z.any().describe("The name of the function."),
              }), z.object({
                keyword: z.any().describe("The keyword that is the operand value."),
              })])).describe("The list of operand values."),
            }), z.object({
              encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
              value: z.string().describe("The operand value."),
            }), z.object({
              arguments: z.array(z.string()).describe("The list of function arguments."),
              encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
              function: z.string().describe("The name of the function."),
            }), z.object({
              keyword: z.literal("empty").describe("The keyword that is the operand value."),
            })]).describe("Details of an operand in a JQL clause."),
            operator: z.enum(["before", "after", "from", "to", "on", "during", "by"]).describe("The operator between the field and the operand."),
          })).describe("The list of time predicates."),
        }), z.object({
          field: z.object({
            encodedName: z.string().optional().describe("The encoded name of the field, which can be used directly in a JQL query."),
            name: z.string().describe("The name of the field."),
            property: z.array(z.object({
              entity: z.string().describe("The object on which the property is set."),
              key: z.string().describe("The key of the property."),
              path: z.string().describe("The path in the property value to query."),
              type: z.enum(["number", "string", "text", "date", "user"]).optional().describe("The type of the property value extraction. Not available if the extraction for the property is not registered on the instance with the [Entity property](https://developer.atlassian.com/cloud/jira/platform/modules/entity-property/) module."),
            })).optional().describe("When the field refers to a value in an entity property, details of the entity property value."),
          }).describe("A field used in a JQL query. See [Advanced searching - fields reference](https://confluence.atlassian.com/x/dAiiLQ) for more information about fields in JQL queries."),
          operator: z.literal("changed").describe("The operator applied to the field."),
          predicates: z.array(z.object({
            operand: z.union([z.object({
              encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
              values: z.array(z.union([z.object({
                encodedValue: z.any().optional().describe("Encoded value, which can be used directly in a JQL query."),
                value: z.any().describe("The operand value."),
              }), z.object({
                arguments: z.any().describe("The list of function arguments."),
                encodedOperand: z.any().optional().describe("Encoded operand, which can be used directly in a JQL query."),
                function: z.any().describe("The name of the function."),
              }), z.object({
                keyword: z.any().describe("The keyword that is the operand value."),
              })])).describe("The list of operand values."),
            }), z.object({
              encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
              value: z.string().describe("The operand value."),
            }), z.object({
              arguments: z.array(z.string()).describe("The list of function arguments."),
              encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
              function: z.string().describe("The name of the function."),
            }), z.object({
              keyword: z.literal("empty").describe("The keyword that is the operand value."),
            })]).describe("Details of an operand in a JQL clause."),
            operator: z.enum(["before", "after", "from", "to", "on", "during", "by"]).describe("The operator between the field and the operand."),
          })).describe("The list of time predicates."),
        })])).describe("The list of nested clauses."),
        operator: z.enum(["and", "or", "not"]).describe("The operator between the clauses."),
      }), z.object({
        field: z.object({
          encodedName: z.string().optional().describe("The encoded name of the field, which can be used directly in a JQL query."),
          name: z.string().describe("The name of the field."),
          property: z.array(z.object({
            entity: z.string().describe("The object on which the property is set."),
            key: z.string().describe("The key of the property."),
            path: z.string().describe("The path in the property value to query."),
            type: z.enum(["number", "string", "text", "date", "user"]).optional().describe("The type of the property value extraction. Not available if the extraction for the property is not registered on the instance with the [Entity property](https://developer.atlassian.com/cloud/jira/platform/modules/entity-property/) module."),
          })).optional().describe("When the field refers to a value in an entity property, details of the entity property value."),
        }).describe("A field used in a JQL query. See [Advanced searching - fields reference](https://confluence.atlassian.com/x/dAiiLQ) for more information about fields in JQL queries."),
        operand: z.union([z.object({
          encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
          values: z.array(z.union([z.object({
            encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
            value: z.string().describe("The operand value."),
          }), z.object({
            arguments: z.array(z.string()).describe("The list of function arguments."),
            encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
            function: z.string().describe("The name of the function."),
          }), z.object({
            keyword: z.literal("empty").describe("The keyword that is the operand value."),
          })])).describe("The list of operand values."),
        }), z.object({
          encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
          value: z.string().describe("The operand value."),
        }), z.object({
          arguments: z.array(z.string()).describe("The list of function arguments."),
          encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
          function: z.string().describe("The name of the function."),
        }), z.object({
          keyword: z.literal("empty").describe("The keyword that is the operand value."),
        })]).describe("Details of an operand in a JQL clause."),
        operator: z.enum(["=", "!=", ">", "<", ">=", "<=", "in", "not in", "~", "~=", "is", "is not"]).describe("The operator between the field and operand."),
      }), z.object({
        field: z.object({
          encodedName: z.string().optional().describe("The encoded name of the field, which can be used directly in a JQL query."),
          name: z.string().describe("The name of the field."),
          property: z.array(z.object({
            entity: z.string().describe("The object on which the property is set."),
            key: z.string().describe("The key of the property."),
            path: z.string().describe("The path in the property value to query."),
            type: z.enum(["number", "string", "text", "date", "user"]).optional().describe("The type of the property value extraction. Not available if the extraction for the property is not registered on the instance with the [Entity property](https://developer.atlassian.com/cloud/jira/platform/modules/entity-property/) module."),
          })).optional().describe("When the field refers to a value in an entity property, details of the entity property value."),
        }).describe("A field used in a JQL query. See [Advanced searching - fields reference](https://confluence.atlassian.com/x/dAiiLQ) for more information about fields in JQL queries."),
        operand: z.union([z.object({
          encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
          values: z.array(z.union([z.object({
            encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
            value: z.string().describe("The operand value."),
          }), z.object({
            arguments: z.array(z.string()).describe("The list of function arguments."),
            encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
            function: z.string().describe("The name of the function."),
          }), z.object({
            keyword: z.literal("empty").describe("The keyword that is the operand value."),
          })])).describe("The list of operand values."),
        }), z.object({
          encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
          value: z.string().describe("The operand value."),
        }), z.object({
          arguments: z.array(z.string()).describe("The list of function arguments."),
          encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
          function: z.string().describe("The name of the function."),
        }), z.object({
          keyword: z.literal("empty").describe("The keyword that is the operand value."),
        })]).describe("Details of an operand in a JQL clause."),
        operator: z.enum(["was", "was in", "was not in", "was not"]).describe("The operator between the field and operand."),
        predicates: z.array(z.object({
          operand: z.union([z.object({
            encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
            values: z.array(z.union([z.object({
              encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
              value: z.string().describe("The operand value."),
            }), z.object({
              arguments: z.array(z.string()).describe("The list of function arguments."),
              encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
              function: z.string().describe("The name of the function."),
            }), z.object({
              keyword: z.literal("empty").describe("The keyword that is the operand value."),
            })])).describe("The list of operand values."),
          }), z.object({
            encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
            value: z.string().describe("The operand value."),
          }), z.object({
            arguments: z.array(z.string()).describe("The list of function arguments."),
            encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
            function: z.string().describe("The name of the function."),
          }), z.object({
            keyword: z.literal("empty").describe("The keyword that is the operand value."),
          })]).describe("Details of an operand in a JQL clause."),
          operator: z.enum(["before", "after", "from", "to", "on", "during", "by"]).describe("The operator between the field and the operand."),
        })).describe("The list of time predicates."),
      }), z.object({
        field: z.object({
          encodedName: z.string().optional().describe("The encoded name of the field, which can be used directly in a JQL query."),
          name: z.string().describe("The name of the field."),
          property: z.array(z.object({
            entity: z.string().describe("The object on which the property is set."),
            key: z.string().describe("The key of the property."),
            path: z.string().describe("The path in the property value to query."),
            type: z.enum(["number", "string", "text", "date", "user"]).optional().describe("The type of the property value extraction. Not available if the extraction for the property is not registered on the instance with the [Entity property](https://developer.atlassian.com/cloud/jira/platform/modules/entity-property/) module."),
          })).optional().describe("When the field refers to a value in an entity property, details of the entity property value."),
        }).describe("A field used in a JQL query. See [Advanced searching - fields reference](https://confluence.atlassian.com/x/dAiiLQ) for more information about fields in JQL queries."),
        operator: z.literal("changed").describe("The operator applied to the field."),
        predicates: z.array(z.object({
          operand: z.union([z.object({
            encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
            values: z.array(z.union([z.object({
              encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
              value: z.string().describe("The operand value."),
            }), z.object({
              arguments: z.array(z.string()).describe("The list of function arguments."),
              encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
              function: z.string().describe("The name of the function."),
            }), z.object({
              keyword: z.literal("empty").describe("The keyword that is the operand value."),
            })])).describe("The list of operand values."),
          }), z.object({
            encodedValue: z.string().optional().describe("Encoded value, which can be used directly in a JQL query."),
            value: z.string().describe("The operand value."),
          }), z.object({
            arguments: z.array(z.string()).describe("The list of function arguments."),
            encodedOperand: z.string().optional().describe("Encoded operand, which can be used directly in a JQL query."),
            function: z.string().describe("The name of the function."),
          }), z.object({
            keyword: z.literal("empty").describe("The keyword that is the operand value."),
          })]).describe("Details of an operand in a JQL clause."),
          operator: z.enum(["before", "after", "from", "to", "on", "during", "by"]).describe("The operator between the field and the operand."),
        })).describe("The list of time predicates."),
      })]).optional().describe("A JQL query clause."),
    }).optional().describe("The syntax tree of the query. Empty if the query was invalid."),
  })).describe("A list of parsed JQL queries."),
}).describe("A list of parsed JQL queries.")

export const parseJqlQueries = pikkuSessionlessFunc({
  description: "Parses and validates JQL queries.\n\nValidation is performed in context of the current user.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  input: ParseJqlQueriesInput,
  output: ParseJqlQueriesOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/jql/parse", data) as any
  },
})
