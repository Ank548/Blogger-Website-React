import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/Auth';
import { login, logout } from './store/authSlice';
import { toggleTheme } from './store/themeMode';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userStatus = useSelector(state => state.auth.status)
  const themeMode = useSelector(state => state.theme.theme)

  useEffect(() => {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: light)').matches;
    dispatch(toggleTheme(userPrefersDark))
    try {
      authService.getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login({ userData }))
          }
          else {
            dispatch(logout())
          }
        })
    } catch (error) {
      console.log("App.jsx::getCurrentUser", error.message)
    }
    finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const HTML = document.querySelector("html")
    HTML.classList.remove('light', "dark")
    HTML.classList.add(themeMode)
  }, [themeMode])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-50 dark:bg-dark-bg-main'>
      <div className='w-full block'>
        <Header />
        <main className='min-h-[calc(100vh-350.075px)]' style={{ marginTop: '71.675px' }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
