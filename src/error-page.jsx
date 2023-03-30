import { useRouteError } from 'react-router-dom'
/* Assets */
import CatLogo from './assets/foxbel-music-icon@3x.png'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center gap-4'>
      <img
        className='scale-75 lg:scale-100'
        src={CatLogo}
        alt='Logo de Foxbel'
      />
      <h1 className='font-bold text-5xl'>Oops!</h1>
      <p className='text-xl text-center lg:text-2xl'>
        Lo sentimos, se ha producido un error inesperado.
      </p>
      <p className='lg:text-xl'>
        <i>{error.statusText || error.message}</i>
      </p>
    </main>
  )
}

export default ErrorPage
