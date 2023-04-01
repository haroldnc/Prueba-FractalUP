import { Outlet } from 'react-router-dom'
import MusicPlayer from '../components/MusicPlayer'
import SearchBar from '../components/SearchBar'
import NavBar from '../components/NavBar'
import { useMusicPlayerStore } from '../store/musicPlayerStore'

const RootLayout = () => {
  const { isActive } = useMusicPlayerStore((state) => state)

  return (
    <>
      <div
        className={`flex h-full min-h-screen w-screen justify-between gap-4 ${
          isActive ? 'pb-[6.5rem] sm:pb-[4.5rem]' : ''
        }`}
      >
        <div className='hidden min-h-full sm:block'>
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
