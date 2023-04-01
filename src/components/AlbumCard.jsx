import { BsFillPlayFill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

const AlbumCard = ({ picture, title, artist, artistID, albumID }) => {
  return (
    <aside className='flex w-[130px] flex-col gap-2 sm:w-[160px]'>
      <NavLink
        to={`/albums/${albumID}`}
        className='relative flex h-[130px] w-[130px] items-center justify-center sm:h-[160px] sm:w-[160px]'
      >
        <img
          src={picture}
          alt='Album cover'
          className='absolute left-0 top-0 h-full w-full'
        />
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center hover:bg-white/20'>
          <BsFillPlayFill className='cursor-pointer text-6xl text-white/75 hover:text-white' />
        </div>
      </NavLink>
      <div className='flex flex-col'>
        <NavLink
          to={`/albums/${albumID}`}
          className='cursor-pointer text-sm font-bold hover:underline'
        >
          {title}
        </NavLink>
        <p className='text-xs text-tertiary-color'>{artist}</p>
      </div>
    </aside>
  )
}

export default AlbumCard
