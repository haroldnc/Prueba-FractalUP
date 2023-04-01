import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
/* Routes */
import Root from './routes/root'
import Recents from './routes/recents'
import Artists from './routes/artists'
import Artist from './routes/artist'
import Albums from './routes/albums'
import Album from './routes/album'
import Songs from './routes/canciones'
/* Styles */
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Recents /> },
      { path: '/artistas', element: <Artists /> },
      { path: '/artistas/:id', element: <Artist /> },
      { path: '/albums', element: <Albums /> },
      { path: '/albums/:id', element: <Album /> },
      { path: '/canciones', element: <Songs /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
