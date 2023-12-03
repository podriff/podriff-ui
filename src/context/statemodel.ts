import { PodcastMetadata } from "@/interface/PodcastMetadata"

export default interface State {
    user: {
        email: string,
        freeCreditsUsed: boolean,
        userVideos: PodcastMetadata[]
    } | null
}
