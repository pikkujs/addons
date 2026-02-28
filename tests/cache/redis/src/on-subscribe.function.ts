import { pikkuSessionlessFunc } from '#pikku'

export const onSubscribe = pikkuSessionlessFunc<
  { channel: string; message: any },
  void
>({
  func: async (_services, data) => {
    // Store received messages for test verification
    onSubscribeMessages.push(data)
  },
})

export const onSubscribeMessages: Array<{ channel: string; message: any }> = []
