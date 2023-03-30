const Track = ({ picture, name, artist, album }) => (
  <div className='flex items-center gap-2 sm:gap-4 sm:absolute left-0 top-0 truncate w-[180px] sm:w-max sm:max-w-max'>
    <img
      src={picture}
      alt='album cover'
      className='sm:w-24 sm:h-24 w-16 h-16'
    />
    <div className='text-white'>
      <marquee className='font-bold text-sm' scrollamount='3'>
        {name}
      </marquee>
      <p className='text-xs flex flex-col'>
        <span className='capitalize truncate flex-1'>
          {artist.toLowerCase()}
        </span>
        <span className='hidden'> - </span>
        <span className='capitalize truncate flex-1'>
          {album.toLowerCase()}
        </span>
      </p>
    </div>
  </div>
)

export default Track
