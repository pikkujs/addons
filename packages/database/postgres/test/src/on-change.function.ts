import { pikkuSessionlessFunc } from '#pikku'

export const onChange = pikkuSessionlessFunc<
  { event: string; data: any },
  void
>({
  func: async (_services, { event, data }) => {
    onChangedMessages.push({ event, data })
  },
})

export const onChangedMessages: Array<{ event: string; data: any }> = []
