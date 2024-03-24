import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Logo, ThemeIcon, LogoutBtn } from '../index'
import { toggleTheme } from '../../store/themeMode'


function Header() {
  const authStatus = useSelector(state => state.auth.status);
  const themeMode = useSelector(state => state.theme.theme);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "SignUp",
      slug: "/sign-up",
      active: !authStatus
    },
    {
      name: "Create Post",
      slug: "/create-post",
      active: authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    }
  ]

  const handleChange = (e) => {
    if (e.currentTarget.checked) {
      dispatch(toggleTheme(false))
    }
    else {
      dispatch(toggleTheme(true))
    }
  }

  return (
    <header className='py-3 shadow bg-white text-black fixed w-full z-10 dark:bg-slate-950 dark:text-white'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='130px' />

            </Link>
          </div>
          <ul className='flex ml-auto items-center'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full'
                  >{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            <li className='ml-2'>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={handleChange}
                  checked={themeMode === "dark"}
                />
                <ThemeIcon />
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Toggle Theme</span>
              </label>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header;
