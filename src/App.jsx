import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/Auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userStatus = useSelector(state => state.auth.status)

  useEffect(() => {
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

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-50'>
      <div className='w-full block'>
        <Header />
        <main className={userStatus ? `min-h-[calc(100vh-350.075px)]` : `min-h-[calc(100vh-370.075px)]`} style={{ marginTop: '71.675px' }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
