import { NavLink } from 'react-router-dom'

const ArtistCard = ({ picture, name, artistID }) => {
  return (
    <aside className='flex w-[130px] flex-col gap-2 border sm:w-[160px]'>
      <NavLink
        className='relative flex h-[130px] w-[130px] items-center justify-center sm:h-[160px] sm:w-[160px]'
        to={`/artistas/${artistID}`}
      >
        <img
          src={picture}
          alt='Foto del Artista'
          className='absolute left-0 top-0 h-full w-full'
        />
      </NavLink>
      <NavLink
        className='cursor-pointer px-1 py-2 text-sm font-bold hover:underline'
        to={`/artistas/${artistID}`}
      >
        {name}
      </NavLink>
    </aside>
  )
}

export default ArtistCard
