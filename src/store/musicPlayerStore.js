import { create } from 'zustand'

export const useMusicPlayerStore = create((set) => ({
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: null,

  getTopSongs: async () => {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': import.meta.env.VITE_HOST,
        'x-rapidapi-key': import.meta.env.VITE_API_KEY_DEEZER
      }
    }).then((res) => res.json())

    set((state) => ({
      ...state,
      currentSongs: [...response?.tracks?.data],
      currentIndex: 0,
      isActive: true,
      activeSong: response?.tracks?.data[0]
    }))
  },

  setActiveSong: (activeSong, currentSongs, currentIndex) => {
    set((state) => ({
      ...state,
      activeSong,
      currentSongs,
      currentIndex,
      isActive: true
    }))
  },

  nextSong: (offset = 1) => {
    set((state) => {
      const numSongs = state.currentSongs.length
      const nextIndex = (state.currentIndex + offset) % numSongs

      return {
        ...state,
        activeSong: state.currentSongs[nextIndex],
        currentIndex: nextIndex
      }
    })
  },

  prevSong: (offset = 1) => {
    set((state) => {
      const numSongs = state.currentSongs.length
      const prevIndex = (state.currentIndex + numSongs - offset) % numSongs

      return {
        ...state,
        activeSong: state.currentSongs[prevIndex],
        currentIndex: prevIndex
      }
    })
  },

  playSong: (action) => {
    set((state) => ({
      ...state,
      isPlaying: action
    }))
  },

  selectGenreListId: (id) => {
    set((state) => ({
      ...state,
      genreListId: id
    }))
  }
}))
