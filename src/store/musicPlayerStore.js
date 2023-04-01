/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import { create } from 'zustand'
import axios from 'axios'

export const useMusicPlayerStore = create((set) => ({
  songs: [],
  artists: [],
  albums: [],
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: null,

  setActiveSong: (activeSong, currentSongs, currentIndex) => {
    set((state) => ({
      ...state,
      activeSong,
      currentSongs,
      currentIndex,
      isActive: true,
      isPlaying: true
    }))
  },

  nextSong: (offset = 1) => {
    set((state) => {
      const numSongs = state.currentSongs.length
      const nextIndex = (state.currentIndex + offset) % numSongs
      const curSong = state.currentSongs[nextIndex]

      if (state.isPlaying) {
        let recentSongs = JSON.parse(window.localStorage.getItem('recentSongs'))

        if (!recentSongs) recentSongs = []

        const index = recentSongs
          .map((item, i) => (item.id === curSong.id ? i : null))
          .find((item) => item !== null)

        if (index !== null && index !== undefined) recentSongs.splice(index, 1)

        recentSongs.unshift(curSong)

        window.localStorage.setItem('recentSongs', JSON.stringify(recentSongs))
      }

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

  addRecentSongs: (recentSong) => {
    let recentSongs = JSON.parse(window.localStorage.getItem('recentSongs'))

    if (!recentSongs) recentSongs = []

    const index = recentSongs
      .map((item, i) => (item.id === recentSong.id ? i : null))
      .find((item) => item !== null)

    if (index !== null) recentSongs.splice(index, 1)

    recentSongs.unshift(recentSong)

    window.localStorage.setItem('recentSongs', JSON.stringify(recentSongs))
  },

  getTopSongs: async () => {
    const response = await axios
      .request({
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: { q: 'a' },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
        }
      })
      .then((res) => res.data?.data)

    const recentSongs = JSON.parse(window.localStorage.getItem('recentSongs'))
    const data = [...response.map((song) => song.artist)]
    const artists = []
    const albums = []

    for (const x of data) {
      if (!artists.find((artist) => artist.id === x.id)) {
        artists.push(x)
      }
    }

    for (const x of recentSongs) {
      if (!albums.find((album) => album.id === x.album.id)) {
        albums.push(x.album)
      }
    }

    set((state) => {
      const newState = {
        ...state,
        songs: [...response],
        artists,
        albums
      }

      if (!recentSongs) {
        window.localStorage.setItem(
          'recentSongs',
          JSON.stringify([...response])
        )
      } else {
        newState.currentSongs = recentSongs
        newState.currentIndex = 0
        newState.isActive = true
        newState.isPlaying = false
        newState.activeSong = recentSongs[0]
      }

      return newState
    })
  },

  getAlbum: async (id) => {
    const response = await axios
      .request({
        method: 'GET',
        url: `https://deezerdevs-deezer.p.rapidapi.com/album/${id}`,
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
        }
      })
      .then((res) => res.data)

    return response
  },

  getArtist: async (artistID) => {
    const artist = await axios
      .request({
        method: 'GET',
        url: `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistID}`,
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
        }
      })
      .then((res) => res.data)

    return artist
  },

  getAlbumsOfArtist: async (name, artistID) => {
    const response = await axios
      .request({
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: { q: name },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
        }
      })
      .then((res) => res.data?.data)

    const albums = response
      .filter((song) => song.artist.id === +artistID)
      .map((song) => song.album)

    set((state) => ({
      ...state,
      albums
    }))
  },

  searchSongs: async (text) => {
    const response = await axios
      .request({
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: { q: text },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
        }
      })
      .then((r) => r.data?.data)

    set((state) => ({
      ...state,
      songs: response
    }))
  },

  searchSongsByNameOrAlbum: async (text) => {
    const response = await axios
      .request({
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: { q: text },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
        }
      })
      .then((r) => {
        return r.data?.data
      })

    const regExp = new RegExp(text.toLowerCase(), 'i')

    set((state) => ({
      ...state,
      songs: !response
        ? []
        : response.filter(
            (song) => regExp.test(song.title) || regExp.test(song.album.title)
          )
    }))
  }
}))
