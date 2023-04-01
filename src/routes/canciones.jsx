/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable multiline-ternary */
import { useEffect } from 'react'

import SongCard from '../components/SongCard'
import { useMusicPlayerStore } from '../store/musicPlayerStore'

const Songs = () => {
  const songs = useMusicPlayerStore((state) => state.songs)
  const getTopSongs = useMusicPlayerStore((state) => state.getTopSongs)

  useEffect(() => {
    if (!songs.length) {
      getTopSongs()
    }
  }, [])

  return (
    <section className='mt-8 flex flex-col gap-8'>
      <p className='text-[22px] font-bold text-primary-color'>Resultados</p>
      <div className='mt-4 flex w-full justify-center'>
        <div className='flex w-[260px_+_1.25rem] flex-wrap gap-5'>
          {!songs?.length
            ? null
            : songs.map((song, index) => (
                <SongCard
                  key={`recent-${index}`}
                  title={song.title}
                  picture={song.album.cover}
                  artist={song.artist.name}
                  albumID={song.album.id}
                  songID={song.id}
                  artistID={song.artist.id}
                />
              ))}
        </div>
      </div>
    </section>
  )
}

export default Songs
