import { pikkuSessionlessFunc } from '#pikku'

export const utilsErrorReport = pikkuSessionlessFunc({
  description: "Error Reporting",
  func: async ({ nocodb }) => {
    return nocodb.call("POST", "/api/v1/error-reporting")
  },
})
