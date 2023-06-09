import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import NavBar from './NavBar'
import { useMusicPlayerStore } from '../store/musicPlayerStore'
/* Assets */
import logo from '../assets/foxbel-music@3x.png'

const SearchBar = () => {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const { searchSongsByNameOrAlbum } = useMusicPlayerStore((state) => state)
  const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handlePlay = async () => {
    if (pathname !== '/canciones') {
      navigate(`/canciones?q=${searchText}`)
    } else {
      await searchSongsByNameOrAlbum(searchText)
    }
  }

  useEffect(() => {
    const getSearch = async () => {
      const s = search.slice(1).split('=')[1]

      if (s) {
        await searchSongsByNameOrAlbum(s)
      }
    }

    getSearch()
  }, [])

  return (
    <>
      <aside className='flex w-full flex-col gap-2 sm:gap-4'>
        <Link to='/'>
          <img
            src={logo}
            alt='Logo de Foxbel Music'
            className='w-24 sm:hidden'
          />
        </Link>
        <div className='flex w-full items-center justify-between gap-2'>
          <button
            className='flex h-[36px] w-[36px] items-center justify-center rounded-md bg-primary-color p-1 text-white/75 hover:text-white sm:hidden'
            onClick={handleOpen}
          >
            <AiOutlineMenu className='text-2xl' />
          </button>
          <div className='flex h-[36px] max-w-[524px] flex-1 items-center justify-between gap-1 rounded-2xl border border-tertiary-color px-2'>
            <input
              type='search'
              placeholder='Buscar'
              className='flex-1 border-tertiary-color focus:border-b-[1px] focus:outline-none'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePlay()
                }
              }}
            />
            <AiOutlineSearch
              className='text-lg text-cuaternary-color'
              onClick={(e) => {
                if (e.key === 'Enter') {
                  handlePlay()
                }
              }}
            />
          </div>
          <div className='hidden items-center justify-between gap-2 sm:flex'>
            <BsFillPersonFill className='text-primary-color' />
            <span className='whitespace-nowrap'>Francisco M.</span>
          </div>
        </div>
      </aside>

      <div
        className={`absolute left-0 top-0  ${
          open ? 'h-screen w-screen bg-black bg-opacity-5' : ''
        }`}
        onClick={handleClose}
      >
        {' '}
      </div>

      <div
        className={`absolute top-0 flex h-screen w-max flex-col bg-secondary-color transition-all duration-700 ${
          open ? 'left-0' : '-left-full'
        }`}
      >
        <button
          onClick={handleClose}
          className='ml-auto mr-4 pt-4 text-white/75 hover:text-white'
        >
          <AiOutlineClose />
        </button>
        <NavBar />
      </div>
    </>
  )
}

export default SearchBar
