/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import AlbumCard from '../components/AlbumCard'
import { useMusicPlayerStore } from '../store/musicPlayerStore'

import { FaShareAlt } from 'react-icons/fa'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'

const Artist = () => {
  const { id } = useParams()
  const [artist, setArtist] = useState(null)
  const { getArtist, getAlbumsOfArtist, albums, setActiveSong, getAlbum } =
    useMusicPlayerStore((state) => state)

  const handlePlay = async () => {
    const songs = await Promise.all(albums.map((album) => getAlbum(album.id)))
      .then((res) => res.map((album) => album?.tracks?.data))
      .then((res) => res.reduce((acc, songs) => acc.concat(songs), []))

    setActiveSong(songs[0], songs, 0)
  }

  useEffect(() => {
    const getData = async () => {
      const artist = await getArtist(id)
      await getAlbumsOfArtist(artist.name, id)

      setArtist(artist)
    }

    getData()
  }, [])

  if (!artist) return null

  return (
    <section className='mt-8 flex flex-col gap-8'>
      <div className='flex w-full gap-4'>
        <div className='relative h-[150px] w-[150px]'>
          <img
            src={artist.picture_medium}
            alt='Fonto del Artista'
            className='absolute left-0 top-0 h-[150px] w-[150px]'
          />
          <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center hover:bg-white/20 sm:hidden'>
            <BsFillPlayFill
              className='cursor-pointer text-6xl text-white/75 hover:text-white'
              onClick={handlePlay}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-[22px] font-bold'>{artist.name}</p>
          <p>{albums.length} Álbums</p>
          <p className='flex items-center gap-2 text-primary-color'>
            <span className='cursor-pointer text-2xl'>
              <FaShareAlt />
            </span>
            <span className='cursor-pointer text-3xl'>
              <MdPersonAddAlt1 />
            </span>
          </p>
          <div className='flex gap-4'>
            <button
              className='hidden w-[117px] rounded-3xl bg-primary-color py-2 text-white/75 hover:text-white sm:block'
              onClick={handlePlay}
            >
              Reproducir
            </button>
            <button className='w-[117px] rounded-3xl border border-primary-color py-2'>
              Seguir
            </button>
          </div>
        </div>
      </div>
      {/* */}
      <div>
        <p className='text-[22px] font-bold text-primary-color'>Álbums</p>
        <div className='mt-4 flex w-full justify-center'>
          <div className='flex w-[260px_+_1.25rem] flex-wrap gap-5'>
            {!albums?.length
              ? null
              : albums.map((album, index) => (
                  <AlbumCard
                    key={`recent-${index}`}
                    title={album.title}
                    picture={album.cover}
                    artist={artist.name}
                    albumID={album.id}
                    artistID={artist.id}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Artist
