import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const BulkSetAgentAttributeValuesJobInput = z.object({
  job: z.object({
  action: z.string().describe("The action to perform on the attribute values. One of the following: \"upsert\", \"update\", \"delete\""),
  attributes: z.object({
    attribute_values: z.array(z.object({
      agent_skill_priority: z.enum(["NORMAL", "HIGH"]).optional().describe("The priority of the agent skill for this attribute value"),
      attribute_id: z.string().optional().describe("Id of the associated attribute"),
      created_at: z.string().datetime().optional().describe("When this record was created"),
      id: z.string().optional().describe("Automatically assigned when an attribute value is created"),
      name: z.string().optional().describe("The name of the attribute value"),
      updated_at: z.string().datetime().optional().describe("When this record was last updated"),
      url: z.string().optional().describe("URL of the attribute value"),
    })).optional(),
  }).describe("The attribute values to update. See [Attribute Values](#attribute-values). `agent_skill_priority` is optional. If not provided, it keeps the current priority or defaults to `NORMAL` when adding new attribute values."),
  items: z.array(z.number().int()).describe("The list of agent ids"),
}).optional(),
})

export const BulkSetAgentAttributeValuesJobOutput = z.object({
  job_status: z.object({
    id: z.string().optional().describe("Automatically assigned when the job is queued"),
    job_type: z.string().optional().describe("The type of the job"),
    message: z.string().nullable().optional().describe("Message from the job worker, if any"),
    progress: z.number().int().nullable().optional().describe("Number of tasks that have already been completed"),
    results: z.union([z.array(z.union([z.object({
      id: z.number().int().describe("the id of the new resource"),
      index: z.number().int().describe("the index number of the resul"),
    }), z.object({
      action: z.string().describe("the action the job attempted (`\"action\": \"update\"`)\n"),
      id: z.number().int().describe("the id of the resource the job attempted to update"),
      status: z.string().describe("the status (`\"status\": \"Updated\"`)\n"),
      success: z.boolean().describe("whether the action was successful or not (`\"success\": true`)\n"),
    }), z.object({
      action: z.string().describe("The action the job attempted (`\"action\": \"update\"`)"),
      details: z.string().describe("The details of the error"),
      error: z.string().describe("The error message"),
      id: z.number().int().describe("The id of the resource the job attempted to update"),
      success: z.boolean().describe("Whether the action was successful or not (`\"success\": true`)"),
    })])), z.object({
      success: z.boolean().describe("Whether the action was successful or not"),
    })]).optional().describe("Result data from processed tasks. See [Results](#results) below"),
    status: z.string().optional().describe("The current status. One of the following: \"queued\", \"working\", \"failed\", \"completed\""),
    total: z.number().int().nullable().optional().describe("The total number of tasks this job is batching through"),
    url: z.string().optional().describe("The URL to poll for status updates"),
  }).optional(),
})

export const bulkSetAgentAttributeValuesJob = pikkuSessionlessFunc({
  description: "Adds, replaces or removes multiple attributes for up to 100 agents.\n\n#### Allowed For\n* Admins\n* [Agents in custom role with permission to manage skills](https://support.zendesk.com/hc/en-us/articles/4408882153882)\n\n#### Available Parameters\n\nThe request takes a data object with the following properties:\n| Name       | Type   | Required | Description                                                                                                                                                                                                                                       |\n| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| action     | string | true     | The action to perform on the attribute values. One of the following: \"upsert\", \"update\", \"delete\"                                                                                                                                                 |\n| attributes | object | true     | The attribute values to update. See [Attribute Values](#attribute-values). `agent_skill_priority` is optional. If not provided, it keeps the current priority or defaults to `NORMAL` when adding new attribute values.                           |\n| items      | array  | true     | The list of agent ids                                                                                                                                                                                                                             |\n\nAction can be one of the following:\n  * upsert: Adds new attribute values to the agents\n  * update: Replaces all the current attribute values of the agents with the new values\n  * delete: Removes specified attribute values from the agents\n\nThis endpoint returns a `job_status` [JSON object](/api-reference/ticketing/ticket-management/job_statuses/#json-format) and queues a background job to do the work. Use the [Show Job Status](/api-reference/ticketing/ticket-management/job_statuses/#show-job-status) endpoint to check for the job's completion.",
  input: BulkSetAgentAttributeValuesJobInput,
  output: BulkSetAgentAttributeValuesJobOutput,
  errors: [BadRequestError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/routing/agents/instance_values/jobs", data) as any
  },
})
