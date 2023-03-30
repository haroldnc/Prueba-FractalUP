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
    <div className='rounded-full bg-quinary-color hover:bg-secondary-color flex justify-center items-center sm:w-[60px] sm:h-[60px] w-[36px] h-[36px]'>
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
