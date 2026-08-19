import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const onChange = pikkuSessionlessFunc<
  { event: string; data: any },
  void
>({
  func: async (_services, { event, data }) => {
    onChangedMessages.push({ event, data })
  },
})

export const onChangedMessages: Array<{ event: string; data: any }> = []
