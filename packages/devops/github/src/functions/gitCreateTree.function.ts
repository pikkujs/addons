// git — Raw Git functionality.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const GitCreateTreeInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  base_tree: z.string().optional().describe("The SHA1 of an existing Git tree object which will be used as the base for the new tree. If provided, a new Git tree object will be created from entries in the Git tree object pointed to by `base_tree` and entries defined in the `tree` parameter. Entries defined in the `tree` parameter will overwrite items from `base_tree` with the same `path`. If you're creating new changes on a branch, then normally you'd set `base_tree` to the SHA1 of the Git tree object of the current latest commit on the branch you're working on.\nIf not provided, GitHub will create a new Git tree object from only the entries defined in the `tree` parameter. If you create a new commit pointing to such a tree, then all files which were a part of the parent commit's tree and were not defined in the `tree` parameter will be listed as deleted by the new commit.\n"),
  tree: z.array(z.object({
  content: z.string().optional().describe("The content you want this file to have. GitHub will write this blob out and use that SHA for this entry. Use either this, or `tree.sha`.  \n  \n**Note:** Use either `tree.sha` or `content` to specify the contents of the entry. Using both `tree.sha` and `content` will return an error."),
  mode: z.enum(["100644", "100755", "040000", "160000", "120000"]).optional().describe("The file mode; one of `100644` for file (blob), `100755` for executable (blob), `040000` for subdirectory (tree), `160000` for submodule (commit), or `120000` for a blob that specifies the path of a symlink."),
  path: z.string().optional().describe("The file referenced in the tree."),
  sha: z.string().nullable().optional().describe("The SHA1 checksum ID of the object in the tree. Also called `tree.sha`. If the value is `null` then the file will be deleted.  \n  \n**Note:** Use either `tree.sha` or `content` to specify the contents of the entry. Using both `tree.sha` and `content` will return an error."),
  type: z.enum(["blob", "tree", "commit"]).optional().describe("Either `blob`, `tree`, or `commit`."),
})).describe("Objects (of `path`, `mode`, `type`, and `sha`) specifying a tree structure."),
})

export const GitCreateTreeOutput = z.object({
  sha: z.string(),
  tree: z.array(z.object({
    mode: z.string().optional(),
    path: z.string().optional(),
    sha: z.string().optional(),
    size: z.number().int().optional(),
    type: z.string().optional(),
    url: z.string().optional(),
  })).describe("Objects specifying a tree structure"),
  truncated: z.boolean(),
  url: z.string().url(),
}).describe("The hierarchy between files in a Git repository.")

export const gitCreateTree = pikkuSessionlessFunc({
  description: "The tree creation API accepts nested entries. If you specify both a tree and a nested path modifying that tree, this endpoint will overwrite the contents of the tree with the new path contents, and create a new tree structure.\n\nIf you use this endpoint to add, delete, or modify the file contents in a tree, you will need to commit the tree and then update a branch to point to the commit. For more information see \"[Create a commit](https://docs.github.com/rest/reference/git#create-a-commit)\" and \"[Update a reference](https://docs.github.com/rest/reference/git#update-a-reference).\"\n\nReturns an error if you try to delete a file that does not exist.",
  input: GitCreateTreeInput,
  output: GitCreateTreeOutput,
  errors: [ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/git/trees", data) as any
  },
})
