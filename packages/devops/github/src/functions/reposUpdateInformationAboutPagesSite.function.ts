// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ConflictError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposUpdateInformationAboutPagesSiteInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  build_type: z.enum(["legacy", "workflow"]).optional().describe("The process by which the GitHub Pages site will be built. `workflow` means that the site is built by a custom GitHub Actions workflow. `legacy` means that the site is built by GitHub when changes are pushed to a specific branch."),
  cname: z.string().nullable().optional().describe("Specify a custom domain for the repository. Sending a `null` value will remove the custom domain. For more about custom domains, see \"[Using a custom domain with GitHub Pages](https://docs.github.com/articles/using-a-custom-domain-with-github-pages/).\""),
  https_enforced: z.boolean().optional().describe("Specify whether HTTPS should be enforced for the repository."),
  source: z.union([z.enum(["gh-pages", "master", "master /docs"]), z.object({
  branch: z.string().describe("The repository branch used to publish your site's source files."),
  path: z.enum(["/", "/docs"]).describe("The repository directory that includes the source files for the Pages site. Allowed paths are `/` or `/docs`."),
})]).optional(),
})

export const reposUpdateInformationAboutPagesSite = pikkuSessionlessFunc({
  description: "Updates information for a GitHub Pages site. For more information, see \"[About GitHub Pages](/github/working-with-github-pages/about-github-pages).\n\nTo use this endpoint, you must be a repository administrator, maintainer, or have the 'manage GitHub Pages settings' permission. A token with the `repo` scope or Pages write permission is required. GitHub Apps must have the `administration:write` and `pages:write` permissions.",
  input: ReposUpdateInformationAboutPagesSiteInput,
  errors: [BadRequestError, ConflictError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/pages", data)
  },
})
