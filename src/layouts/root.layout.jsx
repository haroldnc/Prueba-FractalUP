import { Outlet } from 'react-router-dom'
import MusicPlayer from '../components/MusicPlayer'
import SearchBar from '../components/SearchBar'

const RootLayout = () => {
  return (
    <>
      <div className='flex w-screen justify-between gap-4'>
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
