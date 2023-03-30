import { useEffect } from 'react'
import RootLayout from '../layouts/root.layout'
import { useMusicPlayerStore } from '../store/musicPlayerStore'

const Root = () => {
  const getTopSongs = useMusicPlayerStore((state) => state.getTopSongs)

  useEffect(() => {
    getTopSongs()
  }, [])

  return (
    <main>
      <RootLayout />
    </main>
  )
}

export default Root
