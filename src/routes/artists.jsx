import { useEffect } from 'react'
import ArtistCard from '../components/ArtistCard'
import { useMusicPlayerStore } from '../store/musicPlayerStore'

const Artists = () => {
  const { artists, getTopSongs } = useMusicPlayerStore((state) => state)

  useEffect(() => {
    if (!artists.length) {
      getTopSongs()
    }
  }, [])

  return (
    <section className='mt-8 flex min-w-full flex-wrap gap-5'>
      {artists.map((artist, i) => (
        <ArtistCard
          key={`artist-${i}`}
          artistID={artist.id}
          name={artist.name}
          picture={artist.picture_medium}
        />
      ))}
    </section>
  )
}

export default Artists
