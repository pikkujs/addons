import { pikkuSessionlessFunc } from '#pikku'

export const onUpdate = pikkuSessionlessFunc<
  { update_id: number; message?: any; callback_query?: any },
  void
>({
  func: async (_services, data) => {
    // Store received updates for test verification
    onUpdateMessages.push(data)
  },
})

export const onUpdateMessages: Array<{ update_id: number; message?: any }> = []
