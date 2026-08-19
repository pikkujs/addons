// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposDeleteDeploymentInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  deployment_id: z.number().int().describe("deployment_id parameter"),
})

export const reposDeleteDeployment = pikkuSessionlessFunc({
  description: "If the repository only has one deployment, you can delete the deployment regardless of its status. If the repository has more than one deployment, you can only delete inactive deployments. This ensures that repositories with multiple deployments will always have an active deployment. Anyone with `repo` or `repo_deployment` scopes can delete a deployment.\n\nTo set a deployment as inactive, you must:\n\n*   Create a new deployment that is active so that the system has a record of the current state, then delete the previously active deployment.\n*   Mark the active deployment as inactive by adding any non-successful deployment status.\n\nFor more information, see \"[Create a deployment](https://docs.github.com/rest/deployments/deployments/#create-a-deployment)\" and \"[Create a deployment status](https://docs.github.com/rest/deployments/deployment-statuses#create-a-deployment-status).\"",
  input: ReposDeleteDeploymentInput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/deployments/{deployment_id}", data)
  },
})
