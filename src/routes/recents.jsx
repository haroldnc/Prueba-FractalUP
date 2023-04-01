/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable multiline-ternary */
import { useEffect } from 'react'

import SongCard from '../components/SongCard'
import { useMusicPlayerStore } from '../store/musicPlayerStore'

import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'

const Recents = () => {
  const recentSongs = JSON.parse(window.localStorage.getItem('recentSongs'))
  const activeSong = useMusicPlayerStore((state) => state.activeSong)
  const setActiveSong = useMusicPlayerStore((state) => state.setActiveSong)
  const addRecentSongs = useMusicPlayerStore((state) => state.addRecentSongs)
  const getTopSongs = useMusicPlayerStore((state) => state.getTopSongs)
  const getAlbum = useMusicPlayerStore((state) => state.getAlbum)
  const isPlaying = useMusicPlayerStore((state) => state.isPlaying)
  const playSong = useMusicPlayerStore((state) => state.playSong)

  useEffect(() => {
    getTopSongs()
  }, [])

  const handleStop = () => {
    playSong(false)
  }

  const onPlayAlbum = async () => {
    const song = recentSongs[0]
    const album = await getAlbum(song.album.id)
    const currentSongs = !album?.tracks?.data ? [] : album?.tracks?.data

    const index = currentSongs
      .map((item, index) => (item.id === song.id ? index : null))
      .find((item) => item !== null)

    setActiveSong(currentSongs[index], currentSongs, index)
    addRecentSongs(currentSongs[index])
  }

  return (
    <section className='mt-8 flex flex-col gap-8'>
      {activeSong && (
        <div className='flex h-[130px] w-full border sm:h-[250px]'>
          <div className='relative flex h-[130px] w-[130px] items-center justify-center sm:h-[250px] sm:w-[250px]'>
            <img
              src={activeSong.album.cover_medium}
              alt='Album cover'
              className='absolute left-0 right-0 h-full'
            />
            <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center hover:bg-white/20'>
              {isPlaying ? (
                <BsFillPauseFill
                  className='cursor-pointer text-7xl text-white/75 hover:text-white'
                  onClick={handleStop}
                />
              ) : (
                <BsFillPlayFill
                  className='cursor-pointer text-7xl text-white/75 hover:text-white'
                  onClick={onPlayAlbum}
                />
              )}
            </div>
          </div>
          <div className='relative h-full flex-1'>
            {!activeSong.artist?.picture_xl ? null : (
              <img
                src={activeSong.artist?.picture_xl}
                alt='Foto del artista'
                className='object-cove absolute left-0 top-0 -z-20 h-full w-full'
              />
            )}
            <div className='absolute left-0 top-0 -z-10 h-full w-full bg-primary-color opacity-50'>
              {' '}
            </div>
            <div className='flex h-full flex-col p-4'>
              <p className='text-base font-bold capitalize text-white'>
                {activeSong.artist.name.toLowerCase()}{' '}
                {activeSong.album.title.toLowerCase()}
              </p>
              <p className='mb-4 text-sm text-white'>
                Lo mejor de{' '}
                <span className='capitalize'>
                  {activeSong.artist.name.toLowerCase()}
                </span>
              </p>
              <div className='hidden flex-1 flex-col items-start justify-between sm:flex'>
                <p className='text-sm text-white'>
                  Ea laboris eiusmod Lorem velit ex reprehenderit proident. Et
                  nulla ut enim nulla irure cupidatat magna mollit. Ea esse
                  velit aute id deserunt commodo minim nisi tempor.
                </p>
                <button
                  className='rounded-3xl bg-primary-color px-4 py-2 text-white/90 hover:text-white'
                  onClick={onPlayAlbum}
                >
                  Reproducir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <p className='text-[22px] font-bold text-primary-color'>Resultados</p>
        <div className='mt-4 flex w-full justify-center'>
          <div className='flex w-[260px_+_1.25rem] flex-wrap gap-5'>
            {!recentSongs?.length
              ? null
              : recentSongs
                  .slice(0, 15)
                  .map((song, index) => (
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
      </div>
    </section>
  )
}

export default Recents
