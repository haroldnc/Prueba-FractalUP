import { useState } from 'react'
import { useMusicPlayerStore } from '../../store/musicPlayerStore'

import Track from './Track'
import VolumeBar from './VolumeBar'
import Controls from './Controls'
import Player from './Player'

const MusicPlayer = () => {
  const currentSongs = useMusicPlayerStore((state) => state.currentSongs)
  const currentIndex = useMusicPlayerStore((state) => state.currentIndex)
  const activeSong = useMusicPlayerStore((state) => state.activeSong)
  const isPlaying = useMusicPlayerStore((state) => state.isPlaying)
  const isActive = useMusicPlayerStore((state) => state.isActive)
  const prevSong = useMusicPlayerStore((state) => state.prevSong)
  const nextSong = useMusicPlayerStore((state) => state.nextSong)
  const playSong = useMusicPlayerStore((state) => state.playSong)

  const [volume, setVolume] = useState(0.3)

  const handlePlayPause = () => {
    if (!isActive) return

    playSong(!isPlaying)
  }

  if (!activeSong) return null

  return (
    <aside className='fixed bottom-0 left-0 flex h-16 w-screen justify-center bg-primary-color sm:h-24'>
      <div className='relative flex h-full w-full max-w-7xl items-center justify-between pr-2 sm:justify-center'>
        <Track
          picture={activeSong.album.cover}
          name={activeSong.title}
          artist={activeSong.artist.name}
          album={activeSong.album.title}
        />
        <div className='flex items-center justify-center'>
          <Controls
            isPlaying={isPlaying}
            isActive={isActive}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={() => prevSong()}
            handleNextSong={() => nextSong()}
          />
          <Player
            src={activeSong.preview}
            volume={volume}
            isPlaying={isPlaying}
            currentIndex={currentIndex}
            onEnded={() => nextSong()}
          />
        </div>
        <VolumeBar
          value={volume}
          min='0'
          max='1'
          onChange={(event) => setVolume(event.target.value)}
          setVolume={setVolume}
        />
      </div>
    </aside>
  )
}

export default MusicPlayer
