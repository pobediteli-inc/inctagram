export type Avatar = {
    url: string
    width: number
    height: number
    fileSize: number
    createdAt: string
}

export type UserMetadata = {
    following: number
    followers: number
    publications: number
}

export type PublicProfileResponse = {
    id: number
    userName: string
    aboutMe: string
    avatars: Avatar[]
    userMetadata: UserMetadata
    hasPaymentSubscription: boolean
}
