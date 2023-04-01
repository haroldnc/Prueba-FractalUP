import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useMusicPlayerStore } from '../store/musicPlayerStore'

import { BiDownArrowAlt } from 'react-icons/bi'
import { AiFillClockCircle, AiFillStar } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiMusicalNote } from 'react-icons/hi2'

const Album = () => {
  const { id } = useParams()
  const [album, setAlbum] = useState(null)
  const [time, setTime] = useState('')
  const { getAlbum, setActiveSong } = useMusicPlayerStore((state) => state)

  const handlePlay = async (index) => {
    const songs = album.tracks?.data

    setActiveSong(songs[index], songs, index)
  }

  const getTime = (duration) => {
    const m = Math.floor(duration / 60)
    const s = duration - m * 60

    return `${m}:${s}`
  }

  useEffect(() => {
    const getData = async () => {
      const album = await getAlbum(id)

      setAlbum(album)
      setTime(getTime(+album.duration))
    }

    getData()
  }, [])

  if (!album) return null

  return (
    <section className='mt-8 flex flex-col gap-8'>
      <div className='flex w-full gap-4'>
        <div className='relative h-[150px] w-[150px]'>
          <img
            src={album.cover}
            alt='Album cover'
            className='absolute left-0 top-0 h-[150px] w-[150px]'
          />
          <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center hover:bg-white/20 sm:hidden'>
            <BsFillPlayFill
              className='cursor-pointer text-6xl text-white/75 hover:text-white'
              onClick={() => handlePlay(0)}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='flex items-center gap-2 text-[22px] font-bold capitalize'>
            {album.title.toLowerCase()}{' '}
            <button className='hidden h-[25px] w-[25px] items-center justify-center rounded-full bg-primary-color sm:flex'>
              <BsFillPlayFill
                className='cursor-pointer text-[15px] text-white/75 hover:text-white'
                onClick={() => handlePlay(0)}
              />
            </button>
          </p>
          <p>{album.artist.name}</p>
          <p>{album.release_date.split('-')[0]}</p>
          <p>{album.tracks?.data?.length}</p>
          <p>{time}</p>
        </div>
      </div>
      {/* */}
      <div>
        <p className='text-[22px] font-bold text-primary-color'>Álbums</p>
        <div className='mt-4 flex w-full justify-center'>
          <div className='w-full'>
            <div className='flex items-center border-b-[1px]'>
              <span className='hidden h-7 w-10 items-center justify-center text-secondary-color sm:flex'>
                <BiDownArrowAlt />
              </span>
              <span className='flex h-7  w-10 items-center justify-center text-secondary-color'>
                #
              </span>
              <span className='flex h-7  flex-1 items-center text-secondary-color'>
                Canción
              </span>
              <span className='flex h-7 w-10 items-center justify-center text-secondary-color'>
                <AiFillClockCircle />
              </span>
              <span className='hidden h-7 w-10 items-center justify-center text-secondary-color sm:flex'>
                <HiMusicalNote />
              </span>
              <span className='hidden h-7 w-10 items-center justify-center text-secondary-color sm:flex'>
                <AiFillStar />
              </span>
            </div>
            <div className='mt-[2px] flex w-full flex-col gap-1'>
              {album.tracks?.data?.map((song, index) => (
                <div
                  key={`songs-${index}`}
                  className='flex h-9 w-full cursor-pointer items-center text-cuaternary-color shadow-sm shadow-tertiary-color hover:shadow-md'
                  onClick={() => handlePlay(index)}
                >
                  <span className='hidden w-10 sm:block'> </span>
                  <span className='flex w-10 justify-center'>{index + 1}</span>
                  <span className='flex flex-1 text-xs capitalize sm:text-base'>
                    {song.title.toLowerCase()}
                  </span>
                  <span className='flex w-10 justify-center'>
                    {getTime(+song.duration)}
                  </span>
                  <span className='hidden w-10 justify-center sm:flex'>
                    {song.explicit_content_cover}
                  </span>
                  <span className='hidden w-10 justify-center sm:flex'> </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Album
