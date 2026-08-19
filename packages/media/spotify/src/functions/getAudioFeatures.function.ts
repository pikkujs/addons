import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetAudioFeaturesInput = z.object({
  id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) for the track.\n"),
})

export const GetAudioFeaturesOutput = z.object({
  acousticness: z.number().min(0).max(1).optional().describe("A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.\n"),
  analysis_url: z.string().optional().describe("A URL to access the full audio analysis of this track. An access token is required to access this data.\n"),
  danceability: z.number().optional().describe("Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.\n"),
  duration_ms: z.number().int().optional().describe("The duration of the track in milliseconds.\n"),
  energy: z.number().optional().describe("Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.\n"),
  id: z.string().optional().describe("The Spotify ID for the track.\n"),
  instrumentalness: z.number().optional().describe("Predicts whether a track contains no vocals. \"Ooh\" and \"aah\" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly \"vocal\". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.\n"),
  key: z.number().int().min(-1).max(11).optional().describe("The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.\n"),
  liveness: z.number().optional().describe("Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.\n"),
  loudness: z.number().optional().describe("The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.\n"),
  mode: z.number().int().optional().describe("Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.\n"),
  speechiness: z.number().optional().describe("Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.\n"),
  tempo: z.number().optional().describe("The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.\n"),
  time_signature: z.number().int().min(3).max(7).optional().describe("An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of \"3/4\", to \"7/4\"."),
  track_href: z.string().optional().describe("A link to the Web API endpoint providing full details of the track.\n"),
  type: z.literal("audio_features").optional().describe("The object type.\n"),
  uri: z.string().optional().describe("The Spotify URI for the track.\n"),
  valence: z.number().min(0).max(1).optional().describe("A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).\n"),
})

export const getAudioFeatures = pikkuSessionlessFunc({
  description: "Get audio feature information for a single track identified by its unique\nSpotify ID.",
  input: GetAudioFeaturesInput,
  output: GetAudioFeaturesOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/audio-features/{id}", data) as any
  },
})
