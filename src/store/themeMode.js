import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    theme: 'light'
}

const themeMode = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.theme = action.payload ? "light" : "dark"
        }
    }
})

export const { toggleTheme } = themeMode.actions

export default themeMode.reducer