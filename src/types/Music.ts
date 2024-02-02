export interface Music {
  playlists: {
    id: string
    playItems: MusicPlayItem[]
    title: string
  }[]
  favorites: {
    id: string
    title: string
    imageURL: string
    type: string
  }[]
}

export interface MusicPlayItem {
  id?: string
  title: string
  artist?: string
  album?: string
  imageURL?: string
  duration?: number
}
