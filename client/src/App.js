//! React
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'


import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Profile from './components/user/Profile'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/records/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return (

    <div className='site-wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>



  )
}

export default App
