import { Outlet } from 'react-router-dom'
import MusicPlayer from '../components/MusicPlayer'
import SearchBar from '../components/SearchBar'
import NavBar from '../components/NavBar'

const RootLayout = () => {
  return (
    <>
      <div className='flex h-screen w-screen justify-between gap-4'>
        <div className='hidden sm:block'>
          <NavBar />
        </div>
        <section className='flex-1 p-4 sm:py-8'>
          <SearchBar />
          <div className='w-full'>
            <Outlet />
          </div>
        </section>
      </div>
      <MusicPlayer />
    </>
  )
}

export default RootLayout
