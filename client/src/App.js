//! React
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'


import Register from './components/auth/Register'

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
        </Routes>
      </BrowserRouter>
    </div>



  )
}

export default App
