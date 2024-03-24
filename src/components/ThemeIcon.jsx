import React from 'react'
import { useSelector } from 'react-redux'

function ThemeIcon() {

    const themeMode = useSelector(state => state.theme.theme)

    if (themeMode === "light") {
        return <div style={{ fontSize: "1.2rem", padding: "2px" }}><i className="fa-regular fa-sun"></i></div>
    }
    else {
        return <div style={{ fontSize: "1.2rem", padding: "2px" }}><i className="fa-solid fa-moon"></i></div>
    }
}

export default ThemeIcon
