//! React
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'


import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Profile from './components/user/Profile'
import NavBar from './components/nav/NavBar'
import SearchMusic from './components/user/SearchMusic'
import AddRecord from './components/user/AddRecord'
import RecordPage from './components/records/RecordPage'
import AddReview from './components/user/AddReview'
import EditProfile from './components/user/EditProfile'

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
        <NavBar />
        <Routes>
          <Route path='/' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/profile/:id' element={<Profile />}></Route>
          <Route path='/profile/:id/edit' element={<EditProfile />}></Route>
          <Route path='/search-music' element={<SearchMusic />}></Route>
          <Route path='/add-record' element={<AddRecord />}></Route>
          <Route path='/record/:recordId' element={<RecordPage />}></Route>
          <Route path='/add-review/:recordId/:sub' element={<AddReview />}></Route>
        </Routes>
        <footer className='text-center'><small>Crate was created by <a href='https://github.com/sjdnz93' target='_blank' rel='noreferrer'>Simon Davis</a></small></footer>
      </BrowserRouter>
    </div>



  )
}

export default App
