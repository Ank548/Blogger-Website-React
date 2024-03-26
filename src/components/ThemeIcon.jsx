import React from 'react'
import { useSelector } from 'react-redux'

function ThemeIcon() {

    const themeMode = useSelector(state => state.theme.theme)

    if (themeMode === "light") {
        return <div className='text-xl absolute -left-4'><i className="fa-regular fa-sun"></i></div>
    }
    else {
        return <div className='text-xl absolute -left-4'><i className="fa-solid fa-moon"></i></div>
    }
}

export default ThemeIcon
