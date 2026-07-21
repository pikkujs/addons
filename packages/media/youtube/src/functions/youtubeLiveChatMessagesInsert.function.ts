import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeLiveChatMessagesInsertInput = z.object({
  "$.xgafv": z.enum(["1", "2"]).optional().describe("V1 error format."),
  access_token: z.string().optional().describe("OAuth access token."),
  alt: z.enum(["json", "media", "proto"]).optional().describe("Data format for response."),
  callback: z.string().optional().describe("JSONP"),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters."),
  upload_protocol: z.string().optional().describe("Upload protocol for media (e.g. \"raw\", \"multipart\")."),
  uploadType: z.string().optional().describe("Legacy upload protocol for media (e.g. \"media\", \"multipart\")."),
  part: z.array(z.string()).describe("The *part* parameter serves two purposes. It identifies the properties that the write operation will set as well as the properties that the API response will include. Set the parameter value to snippet."),
  authorDetails: z.object({
  channelId: z.string().optional().describe("The YouTube channel ID."),
  channelUrl: z.string().optional().describe("The channel's URL."),
  displayName: z.string().optional().describe("The channel's display name."),
  isChatModerator: z.boolean().optional().describe("Whether the author is a moderator of the live chat."),
  isChatOwner: z.boolean().optional().describe("Whether the author is the owner of the live chat."),
  isChatSponsor: z.boolean().optional().describe("Whether the author is a sponsor of the live chat."),
  isVerified: z.boolean().optional().describe("Whether the author's identity has been verified by YouTube."),
  profileImageUrl: z.string().optional().describe("The channels's avatar URL."),
}).optional().describe("The authorDetails object contains basic details about the user that posted this message."),
  etag: z.string().optional().describe("Etag of this resource."),
  id: z.string().optional().describe("The ID that YouTube assigns to uniquely identify the message."),
  kind: z.string().optional().default("youtube#liveChatMessage").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#liveChatMessage\"."),
  snippet: z.object({
  authorChannelId: z.string().optional().describe("The ID of the user that authored this message, this field is not always filled. textMessageEvent - the user that wrote the message fanFundingEvent - the user that funded the broadcast newSponsorEvent - the user that just became a sponsor memberMilestoneChatEvent - the member that sent the message membershipGiftingEvent - the user that made the purchase giftMembershipReceivedEvent - the user that received the gift membership messageDeletedEvent - the moderator that took the action messageRetractedEvent - the author that retracted their message userBannedEvent - the moderator that took the action superChatEvent - the user that made the purchase superStickerEvent - the user that made the purchase"),
  displayMessage: z.string().optional().describe("Contains a string that can be displayed to the user. If this field is not present the message is silent, at the moment only messages of type TOMBSTONE and CHAT_ENDED_EVENT are silent."),
  fanFundingEventDetails: z.object({
    amountDisplayString: z.string().optional().describe("A rendered string that displays the fund amount and currency to the user."),
    amountMicros: z.string().optional().describe("The amount of the fund."),
    currency: z.string().optional().describe("The currency in which the fund was made."),
    userComment: z.string().optional().describe("The comment added by the user to this fan funding event."),
  }).optional().describe("Details about the funding event, this is only set if the type is 'fanFundingEvent'."),
  giftMembershipReceivedDetails: z.object({
    associatedMembershipGiftingMessageId: z.string().optional().describe("The ID of the membership gifting message that is related to this gift membership. This ID will always refer to a message whose type is 'membershipGiftingEvent'."),
    gifterChannelId: z.string().optional().describe("The ID of the user that made the membership gifting purchase. This matches the `snippet.authorChannelId` of the associated membership gifting message."),
    memberLevelName: z.string().optional().describe("The name of the Level at which the viewer is a member. This matches the `snippet.membershipGiftingDetails.giftMembershipsLevelName` of the associated membership gifting message. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled."),
  }).optional().describe("Details about the Gift Membership Received event, this is only set if the type is 'giftMembershipReceivedEvent'."),
  hasDisplayContent: z.boolean().optional().describe("Whether the message has display content that should be displayed to users."),
  liveChatId: z.string().optional(),
  memberMilestoneChatDetails: z.object({
    memberLevelName: z.string().optional().describe("The name of the Level at which the viever is a member. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled."),
    memberMonth: z.number().int().optional().describe("The total amount of months (rounded up) the viewer has been a member that granted them this Member Milestone Chat. This is the same number of months as is being displayed to YouTube users."),
    userComment: z.string().optional().describe("The comment added by the member to this Member Milestone Chat. This field is empty for messages without a comment from the member."),
  }).optional().describe("Details about the Member Milestone Chat event, this is only set if the type is 'memberMilestoneChatEvent'."),
  membershipGiftingDetails: z.object({
    giftMembershipsCount: z.number().int().optional().describe("The number of gift memberships purchased by the user."),
    giftMembershipsLevelName: z.string().optional().describe("The name of the level of the gift memberships purchased by the user. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled."),
  }).optional().describe("Details about the Membership Gifting event, this is only set if the type is 'membershipGiftingEvent'."),
  messageDeletedDetails: z.object({
    deletedMessageId: z.string().optional(),
  }).optional(),
  messageRetractedDetails: z.object({
    retractedMessageId: z.string().optional(),
  }).optional(),
  newSponsorDetails: z.object({
    isUpgrade: z.boolean().optional().describe("If the viewer just had upgraded from a lower level. For viewers that were not members at the time of purchase, this field is false."),
    memberLevelName: z.string().optional().describe("The name of the Level that the viewer just had joined. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled."),
  }).optional().describe("Details about the New Member Announcement event, this is only set if the type is 'newSponsorEvent'. Please note that \"member\" is the new term for \"sponsor\"."),
  publishedAt: z.string().datetime().optional().describe("The date and time when the message was orignally published."),
  superChatDetails: z.object({
    amountDisplayString: z.string().optional().describe("A rendered string that displays the fund amount and currency to the user."),
    amountMicros: z.string().optional().describe("The amount purchased by the user, in micros (1,750,000 micros = 1.75)."),
    currency: z.string().optional().describe("The currency in which the purchase was made."),
    tier: z.number().int().optional().describe("The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1."),
    userComment: z.string().optional().describe("The comment added by the user to this Super Chat event."),
  }).optional().describe("Details about the Super Chat event, this is only set if the type is 'superChatEvent'."),
  superStickerDetails: z.object({
    amountDisplayString: z.string().optional().describe("A rendered string that displays the fund amount and currency to the user."),
    amountMicros: z.string().optional().describe("The amount purchased by the user, in micros (1,750,000 micros = 1.75)."),
    currency: z.string().optional().describe("The currency in which the purchase was made."),
    superStickerMetadata: z.object({
      altText: z.string().optional().describe("Internationalized alt text that describes the sticker image and any animation associated with it."),
      altTextLanguage: z.string().optional().describe("Specifies the localization language in which the alt text is returned."),
      stickerId: z.string().optional().describe("Unique identifier of the Super Sticker. This is a shorter form of the alt_text that includes pack name and a recognizable characteristic of the sticker."),
    }).optional().describe("Information about the Super Sticker."),
    tier: z.number().int().optional().describe("The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1."),
  }).optional().describe("Details about the Super Sticker event, this is only set if the type is 'superStickerEvent'."),
  textMessageDetails: z.object({
    messageText: z.string().optional().describe("The user's message."),
  }).optional().describe("Details about the text message, this is only set if the type is 'textMessageEvent'."),
  type: z.enum(["invalidType", "textMessageEvent", "tombstone", "fanFundingEvent", "chatEndedEvent", "sponsorOnlyModeStartedEvent", "sponsorOnlyModeEndedEvent", "newSponsorEvent", "memberMilestoneChatEvent", "membershipGiftingEvent", "giftMembershipReceivedEvent", "messageDeletedEvent", "messageRetractedEvent", "userBannedEvent", "superChatEvent", "superStickerEvent"]).optional().describe("The type of message, this will always be present, it determines the contents of the message as well as which fields will be present."),
  userBannedDetails: z.object({
    banDurationSeconds: z.string().optional().describe("The duration of the ban. This property is only present if the banType is temporary."),
    banType: z.enum(["permanent", "temporary"]).optional().describe("The type of ban."),
    bannedUserDetails: z.object({
      channelId: z.string().optional().describe("The YouTube channel ID."),
      channelUrl: z.string().optional().describe("The channel's URL."),
      displayName: z.string().optional().describe("The channel's display name."),
      profileImageUrl: z.string().optional().describe("The channels's avatar URL."),
    }).optional().describe("The details of the user that was banned."),
  }).optional(),
}).optional().describe("The snippet object contains basic details about the message."),
})

export const YoutubeLiveChatMessagesInsertOutput = z.object({
  authorDetails: z.object({
    channelId: z.string().optional().describe("The YouTube channel ID."),
    channelUrl: z.string().optional().describe("The channel's URL."),
    displayName: z.string().optional().describe("The channel's display name."),
    isChatModerator: z.boolean().optional().describe("Whether the author is a moderator of the live chat."),
    isChatOwner: z.boolean().optional().describe("Whether the author is the owner of the live chat."),
    isChatSponsor: z.boolean().optional().describe("Whether the author is a sponsor of the live chat."),
    isVerified: z.boolean().optional().describe("Whether the author's identity has been verified by YouTube."),
    profileImageUrl: z.string().optional().describe("The channels's avatar URL."),
  }).optional().describe("The authorDetails object contains basic details about the user that posted this message."),
  etag: z.string().optional().describe("Etag of this resource."),
  id: z.string().optional().describe("The ID that YouTube assigns to uniquely identify the message."),
  kind: z.string().optional().default("youtube#liveChatMessage").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#liveChatMessage\"."),
  snippet: z.object({
    authorChannelId: z.string().optional().describe("The ID of the user that authored this message, this field is not always filled. textMessageEvent - the user that wrote the message fanFundingEvent - the user that funded the broadcast newSponsorEvent - the user that just became a sponsor memberMilestoneChatEvent - the member that sent the message membershipGiftingEvent - the user that made the purchase giftMembershipReceivedEvent - the user that received the gift membership messageDeletedEvent - the moderator that took the action messageRetractedEvent - the author that retracted their message userBannedEvent - the moderator that took the action superChatEvent - the user that made the purchase superStickerEvent - the user that made the purchase"),
    displayMessage: z.string().optional().describe("Contains a string that can be displayed to the user. If this field is not present the message is silent, at the moment only messages of type TOMBSTONE and CHAT_ENDED_EVENT are silent."),
    fanFundingEventDetails: z.object({
      amountDisplayString: z.string().optional().describe("A rendered string that displays the fund amount and currency to the user."),
      amountMicros: z.string().optional().describe("The amount of the fund."),
      currency: z.string().optional().describe("The currency in which the fund was made."),
      userComment: z.string().optional().describe("The comment added by the user to this fan funding event."),
    }).optional().describe("Details about the funding event, this is only set if the type is 'fanFundingEvent'."),
    giftMembershipReceivedDetails: z.object({
      associatedMembershipGiftingMessageId: z.string().optional().describe("The ID of the membership gifting message that is related to this gift membership. This ID will always refer to a message whose type is 'membershipGiftingEvent'."),
      gifterChannelId: z.string().optional().describe("The ID of the user that made the membership gifting purchase. This matches the `snippet.authorChannelId` of the associated membership gifting message."),
      memberLevelName: z.string().optional().describe("The name of the Level at which the viewer is a member. This matches the `snippet.membershipGiftingDetails.giftMembershipsLevelName` of the associated membership gifting message. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled."),
    }).optional().describe("Details about the Gift Membership Received event, this is only set if the type is 'giftMembershipReceivedEvent'."),
    hasDisplayContent: z.boolean().optional().describe("Whether the message has display content that should be displayed to users."),
    liveChatId: z.string().optional(),
    memberMilestoneChatDetails: z.object({
      memberLevelName: z.string().optional().describe("The name of the Level at which the viever is a member. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled."),
      memberMonth: z.number().int().optional().describe("The total amount of months (rounded up) the viewer has been a member that granted them this Member Milestone Chat. This is the same number of months as is being displayed to YouTube users."),
      userComment: z.string().optional().describe("The comment added by the member to this Member Milestone Chat. This field is empty for messages without a comment from the member."),
    }).optional().describe("Details about the Member Milestone Chat event, this is only set if the type is 'memberMilestoneChatEvent'."),
    membershipGiftingDetails: z.object({
      giftMembershipsCount: z.number().int().optional().describe("The number of gift memberships purchased by the user."),
      giftMembershipsLevelName: z.string().optional().describe("The name of the level of the gift memberships purchased by the user. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled."),
    }).optional().describe("Details about the Membership Gifting event, this is only set if the type is 'membershipGiftingEvent'."),
    messageDeletedDetails: z.object({
      deletedMessageId: z.string().optional(),
    }).optional(),
    messageRetractedDetails: z.object({
      retractedMessageId: z.string().optional(),
    }).optional(),
    newSponsorDetails: z.object({
      isUpgrade: z.boolean().optional().describe("If the viewer just had upgraded from a lower level. For viewers that were not members at the time of purchase, this field is false."),
      memberLevelName: z.string().optional().describe("The name of the Level that the viewer just had joined. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled."),
    }).optional().describe("Details about the New Member Announcement event, this is only set if the type is 'newSponsorEvent'. Please note that \"member\" is the new term for \"sponsor\"."),
    publishedAt: z.string().datetime().optional().describe("The date and time when the message was orignally published."),
    superChatDetails: z.object({
      amountDisplayString: z.string().optional().describe("A rendered string that displays the fund amount and currency to the user."),
      amountMicros: z.string().optional().describe("The amount purchased by the user, in micros (1,750,000 micros = 1.75)."),
      currency: z.string().optional().describe("The currency in which the purchase was made."),
      tier: z.number().int().optional().describe("The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1."),
      userComment: z.string().optional().describe("The comment added by the user to this Super Chat event."),
    }).optional().describe("Details about the Super Chat event, this is only set if the type is 'superChatEvent'."),
    superStickerDetails: z.object({
      amountDisplayString: z.string().optional().describe("A rendered string that displays the fund amount and currency to the user."),
      amountMicros: z.string().optional().describe("The amount purchased by the user, in micros (1,750,000 micros = 1.75)."),
      currency: z.string().optional().describe("The currency in which the purchase was made."),
      superStickerMetadata: z.object({
        altText: z.string().optional().describe("Internationalized alt text that describes the sticker image and any animation associated with it."),
        altTextLanguage: z.string().optional().describe("Specifies the localization language in which the alt text is returned."),
        stickerId: z.string().optional().describe("Unique identifier of the Super Sticker. This is a shorter form of the alt_text that includes pack name and a recognizable characteristic of the sticker."),
      }).optional().describe("Information about the Super Sticker."),
      tier: z.number().int().optional().describe("The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1."),
    }).optional().describe("Details about the Super Sticker event, this is only set if the type is 'superStickerEvent'."),
    textMessageDetails: z.object({
      messageText: z.string().optional().describe("The user's message."),
    }).optional().describe("Details about the text message, this is only set if the type is 'textMessageEvent'."),
    type: z.enum(["invalidType", "textMessageEvent", "tombstone", "fanFundingEvent", "chatEndedEvent", "sponsorOnlyModeStartedEvent", "sponsorOnlyModeEndedEvent", "newSponsorEvent", "memberMilestoneChatEvent", "membershipGiftingEvent", "giftMembershipReceivedEvent", "messageDeletedEvent", "messageRetractedEvent", "userBannedEvent", "superChatEvent", "superStickerEvent"]).optional().describe("The type of message, this will always be present, it determines the contents of the message as well as which fields will be present."),
    userBannedDetails: z.object({
      banDurationSeconds: z.string().optional().describe("The duration of the ban. This property is only present if the banType is temporary."),
      banType: z.enum(["permanent", "temporary"]).optional().describe("The type of ban."),
      bannedUserDetails: z.object({
        channelId: z.string().optional().describe("The YouTube channel ID."),
        channelUrl: z.string().optional().describe("The channel's URL."),
        displayName: z.string().optional().describe("The channel's display name."),
        profileImageUrl: z.string().optional().describe("The channels's avatar URL."),
      }).optional().describe("The details of the user that was banned."),
    }).optional(),
  }).optional().describe("The snippet object contains basic details about the message."),
}).describe("A *liveChatMessage* resource represents a chat message in a YouTube Live Chat.")

export const youtubeLiveChatMessagesInsert = pikkuSessionlessFunc({
  description: "Inserts a new resource into this collection.",
  input: YoutubeLiveChatMessagesInsertInput,
  output: YoutubeLiveChatMessagesInsertOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("POST", "/youtube/v3/liveChat/messages", data) as any
  },
})
