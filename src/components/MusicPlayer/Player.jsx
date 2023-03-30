import { useRef, useEffect } from 'react'

const Player = ({ src, isPlaying, volume, onEnded }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (isPlaying) {
      ref.current.play()
    } else {
      ref.current.pause()
    }
  }, [src, isPlaying])

  useEffect(() => {
    ref.current.volume = volume
  }, [volume])

  return <audio src={src} ref={ref} onEnded={onEnded} />
}

export default Player
