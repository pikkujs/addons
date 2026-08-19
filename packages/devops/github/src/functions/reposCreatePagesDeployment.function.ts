// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposCreatePagesDeploymentInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  artifact_url: z.string().describe("The URL of an artifact that contains the .zip or .tar of static assets to deploy. The artifact belongs to the repository."),
  environment: z.string().optional().default("github-pages").describe("The target environment for this GitHub Pages deployment."),
  oidc_token: z.string().describe("The OIDC token issued by GitHub Actions certifying the origin of the deployment."),
  pages_build_version: z.string().default("GITHUB_SHA").describe("A unique string that represents the version of the build for this deployment."),
})

export const ReposCreatePagesDeploymentOutput = z.object({
  page_url: z.string().url().describe("The URI to the deployed GitHub Pages."),
  preview_url: z.string().url().optional().describe("The URI to the deployed GitHub Pages preview."),
  status_url: z.string().url().describe("The URI to monitor GitHub Pages deployment status."),
}).describe("The GitHub Pages deployment status.")

export const reposCreatePagesDeployment = pikkuSessionlessFunc({
  description: "Create a GitHub Pages deployment for a repository.\n\nUsers must have write permissions. GitHub Apps must have the `pages:write` permission to use this endpoint.",
  input: ReposCreatePagesDeploymentInput,
  output: ReposCreatePagesDeploymentOutput,
  errors: [BadRequestError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/pages/deployment", data) as any
  },
})
