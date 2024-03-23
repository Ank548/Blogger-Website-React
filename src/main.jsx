import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { AddPost, AllPosts, EditPost, Home, Login, Post, SignUp } from './pages';
import { Authlayout } from './components';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={(
        <Authlayout authentication={false}>
          <Login />
        </Authlayout>
      )} />
      <Route path='sign-up' element={(
        <Authlayout authentication={false}>
          <SignUp />
        </Authlayout>
      )} />
      <Route path='edit-post/:slug' element={(
        <Authlayout authentication>
          <EditPost />
        </Authlayout>
      )} />
      <Route path='all-posts' element={(
        <Authlayout authentication>
          <AllPosts />
        </Authlayout>
      )} />
      <Route path='post/:slug' element={(
        <Authlayout authentication>
          <Post />
        </Authlayout>
      )} />
      <Route path='create-post' element={(
        <Authlayout authentication>
          <AddPost />
        </Authlayout>
      )} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
