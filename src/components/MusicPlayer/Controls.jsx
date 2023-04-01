import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'

const Controls = ({
  isPlaying,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong
}) => (
  <div className='flex items-center gap-2 sm:gap-4'>
    {currentSongs?.length && (
      <MdSkipPrevious
        color='#FFFFFF'
        className='cursor-pointer text-[24px] sm:text-[36px]'
        onClick={handlePrevSong}
      />
    )}
    <div className='flex h-[36px] w-[36px] items-center justify-center rounded-full bg-quinary-color hover:bg-secondary-color sm:h-[60px] sm:w-[60px]'>
      {isPlaying ? (
        <BsFillPauseFill
          color='#FFFFFF'
          onClick={handlePlayPause}
          className='cursor-pointer text-[24px] sm:text-[36px]'
        />
      ) : (
        <BsFillPlayFill
          color='#FFFFFF'
          onClick={handlePlayPause}
          className='cursor-pointer text-[24px] sm:text-[36px]'
        />
      )}
    </div>
    {currentSongs?.length && (
      <MdSkipNext
        color='#FFFF'
        className='cursor-pointer text-[24px] sm:text-[36px]'
        onClick={handleNextSong}
      />
    )}
  </div>
)

export default Controls
