import { useEffect } from 'react'
import AlbumCard from '../components/AlbumCard'
import { useMusicPlayerStore } from '../store/musicPlayerStore'

const Albums = () => {
  const { albums, getTopSongs } = useMusicPlayerStore((state) => state)

  useEffect(() => {
    getTopSongs()
  }, [])

  return (
    <section className='mt-8 flex flex-wrap gap-8'>
      {albums.map((album, i) => (
        <AlbumCard
          key={`album-${i}`}
          albumID={album.id}
          title={album.title}
          picture={album.cover}
        />
      ))}
    </section>
  )
}

export default Albums
