export interface Music {
  playlists: {
    id: string
    playItems: MusicPlayItem[]
    title: string
  }[]
  favorites: {
    id: string
    title: string
    imageUrl: string
    type: string
  }[]
}

export interface MusicPlayItem {
  id: string
  title: string
  artist: string
  album: string
  imageUrl: string
  duration: number
}
