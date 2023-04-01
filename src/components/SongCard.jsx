import { BsFillPlayFill } from 'react-icons/bs'
import { useMusicPlayerStore } from '../store/musicPlayerStore'
import { NavLink } from 'react-router-dom'

const SongCard = ({ picture, title, artist, songID, artistID, albumID }) => {
  const { getAlbum, addRecentSongs, setActiveSong } = useMusicPlayerStore(
    (state) => state
  )

  const onClickSong = async () => {
    const album = await getAlbum(albumID)
    const currentSongs = !album?.tracks?.data ? [] : album?.tracks?.data

    const index = currentSongs
      .map((item, index) => (item.id === songID ? index : null))
      .find((item) => item !== null)

    setActiveSong(currentSongs[index], currentSongs, index)
    addRecentSongs(currentSongs[index])
  }

  return (
    <aside className='flex w-[130px] flex-col gap-2 sm:w-[160px]'>
      <div
        className='relative flex h-[130px] w-[130px] items-center justify-center sm:h-[160px] sm:w-[160px]'
        onClick={onClickSong}
      >
        <img
          src={picture}
          alt='Album cover'
          className='absolute left-0 top-0 h-full w-full'
        />
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center hover:bg-white/20'>
          <BsFillPlayFill className='cursor-pointer text-6xl text-white/75 hover:text-white' />
        </div>
      </div>
      <div>
        <p
          className='cursor-pointer text-sm font-bold hover:underline'
          onClick={onClickSong}
        >
          {title}
        </p>
        <NavLink
          to={`/artistas/${artistID}`}
          className='text-xs text-tertiary-color hover:underline'
        >
          {artist}
        </NavLink>
      </div>
    </aside>
  )
}

export default SongCard
