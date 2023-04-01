import { Link, useRouteError } from 'react-router-dom'
/* Assets */
import CatLogo from './assets/foxbel-music-icon@3x.png'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <main className='flex h-screen w-screen flex-col items-center justify-center gap-4'>
      <img
        className='scale-75 lg:scale-100'
        src={CatLogo}
        alt='Logo de Foxbel'
      />
      <h1 className='text-5xl font-bold'>Oops!</h1>
      <p className='text-center text-xl lg:text-2xl'>
        Lo sentimos, se ha producido un error inesperado.
      </p>
      <p className='text-center lg:text-xl'>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link className='mt-4 text-2xl text-primary-color hover:underline' to='/'>
        Volver
      </Link>
    </main>
  )
}

export default ErrorPage
