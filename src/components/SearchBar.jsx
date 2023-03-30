import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
/* Assets */
import logo from '../assets/foxbel-music@3x.png'

const SearchBar = () => {
  return (
    <nav className='flex w-full justify-center'>
      <div className='flex w-full max-w-7xl flex-col gap-2 sm:gap-4'>
        <img src={logo} alt='Logo de Foxbel Music' className='w-24 sm:hidden' />
        <div className='flex w-full items-center justify-between gap-2'>
          <button className='flex h-[36px] w-[36px] items-center justify-center rounded-md bg-primary-color p-1 text-white/75 hover:text-white sm:hidden'>
            <AiOutlineMenu className='text-2xl' />
          </button>
          <div className='flex h-[36px] max-w-[524px] flex-1 items-center justify-between gap-1 rounded-2xl border border-tertiary-color px-2'>
            <input
              type='search'
              placeholder='Buscar'
              className='flex-1 border-tertiary-color focus:border-b-[1px] focus:outline-none'
            />
            <AiOutlineSearch className='text-lg text-cuaternary-color' />
          </div>
          <div className='hidden items-center justify-between gap-2 sm:flex'>
            <BsFillPersonFill className='text-primary-color' />
            <span className='whitespace-nowrap'>Francisco M.</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default SearchBar