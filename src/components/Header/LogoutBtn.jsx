import React from 'react'
import authService from '../../appwrite/Auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    authService.logout()
      .then(() => {
        dispatch(logout())
        navigate('/')
      })
  }

  return (
    <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full'
      onClick={logoutHandler}>
      Logout
    </button>
  )
}

export default LogoutBtn;
