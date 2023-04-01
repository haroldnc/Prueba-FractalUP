import { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/foxbel-music@3x.png'
import './css/NavBar.css'

const NavBar = () => {
  const { pathname } = useLocation()
  const route = useMemo(() => {
    if (pathname === '/') return null

    return pathname.split('/')[1]
  }, [pathname])

  return (
    <nav className='max-w-screen relative z-50 flex h-full min-h-screen w-[320px] flex-col items-center gap-8 bg-secondary-color py-6 sm:py-12'>
      <NavLink to='/'>
        <img src={logo} alt='Logo de Foxbel Music' className='w-3/4' />
      </NavLink>
      <div className='flex w-full flex-col gap-8 px-10'>
        <aside>
          <p className='text-[22px] font-bold text-white'>Mi Librería</p>
          <ul className='text-white/75'>
            <li className='relative'>
              <NavLink to='/' className={!route ? 'route-active' : ''}>
                Recientes
              </NavLink>
            </li>
            <li className='relative'>
              <NavLink
                to='/artistas'
                className={route === 'artistas' ? 'route-active' : ''}
              >
                Artistas
              </NavLink>
            </li>
            <li className='relative'>
              <NavLink
                to='/albums'
                className={route === 'albums' ? 'route-active' : ''}
              >
                Álbums
              </NavLink>
            </li>
            <li className='relative'>
              <NavLink
                to='/canciones'
                className={route === 'canciones' ? 'route-active' : ''}
              >
                Canciones
              </NavLink>
            </li>
            <li className='relative'>
              <NavLink
                to='/estaciones'
                className={route === 'estaciones' ? 'route-active' : ''}
              >
                Estaciones
              </NavLink>
            </li>
          </ul>
        </aside>

        <aside>
          <p className='text-[22px] font-bold text-white'>Playlist</p>
          <ul className='text-white/75'>
            <li>
              <NavLink to='/playlist/21321'>Metal</NavLink>
            </li>
            <li>
              <NavLink to='/playlist/21321'>Para bailar</NavLink>
            </li>
            <li>
              <NavLink to='/playlist/21321'>Rock 90s</NavLink>
            </li>
            <li>
              <NavLink to='/playlist/21321'>Baladas</NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </nav>
  )
}

export default NavBar
