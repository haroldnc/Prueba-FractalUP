import { useState } from 'react'
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill
} from 'react-icons/bs'
import './css/VolumeBar.css'

const VolumeBar = ({ value, min, max, onChange, setVolume }) => {
  const [openVolume, setOpenVolume] = useState(false)

  const handleOpen = () => {
    setOpenVolume(!openVolume)
  }

  return (
    <>
      {/* Mobile */}
      <div className='right-0 flex h-full items-center gap-4 sm:hidden'>
        <input
          type='range'
          step='any'
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          className={`slider-vertical h-[6px] w-[100px] appearance-none rounded accent-primary-color ${
            openVolume ? '' : 'hidden'
          }`}
        />
        {value <= 1 && value > 0.5 && (
          <BsFillVolumeUpFill
            color='#FFFFFF'
            onClick={handleOpen}
            className='text-[24px]'
          />
        )}
        {value <= 0.5 && value > 0 && (
          <BsVolumeDownFill
            color='#FFFFFF'
            onClick={handleOpen}
            className='text-[24px]'
          />
        )}
        {value <= 0 && (
          <BsFillVolumeMuteFill
            color='#FFF'
            onClick={handleOpen}
            className='text-[24px]'
          />
        )}
      </div>

      {/* Desktop */}
      <div className='absolute right-0 hidden h-full items-center gap-4 sm:flex'>
        <input
          type='range'
          step='any'
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          className='h-[6px] w-[100px] appearance-none rounded accent-white'
        />
        {value <= 1 && value > 0.5 && (
          <BsFillVolumeUpFill
            color='#FFFFFF'
            onClick={() => setVolume(0)}
            className='text-[36px]'
          />
        )}
        {value <= 0.5 && value > 0 && (
          <BsVolumeDownFill
            color='#FFFFFF'
            onClick={() => setVolume(0)}
            className='text-[36px]'
          />
        )}
        {value <= 0 && (
          <BsFillVolumeMuteFill
            color='#FFF'
            onClick={() => setVolume(1)}
            className='text-[36px]'
          />
        )}
      </div>
    </>
  )
}

export default VolumeBar
