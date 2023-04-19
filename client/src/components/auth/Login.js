//! React 
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

//! Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { getPayloadSub } from '../helpers/Auth'


const Login = () => {

  const navigate = useNavigate()

  

  //! State
  const [ formFields, setFormFields ] = useState({
    email: '',
    password: '',
  })

  const [ error, setError ] = useState('')

  //! Executions

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post('/api/profile/login/', formFields)
      localStorage.setItem('CRATE-TOKEN', data.token)
      console.log('DATA TOKEN', data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      const sub = getPayloadSub()
      navigate(`/profile/${sub}`)

    } catch (err) {
      console.log('error', err)
      setError(err.response.data.message)
    }

  }

  return (
    <main>
      <Container>
        <Row>

          <Col xs={12} sm={12} md={6} lg={6}>
            <Row>
              <h1 className='display-4 text-center'>CRATE</h1>
              <p className='text-center'>Catalogue your collection. Find new music. Get digging.</p>
            </Row>

            <Row>
              <Col as='form' onSubmit={handleSubmit}>

                <h2>Login</h2>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder='Email' onChange={handleChange} value={formFields.email} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder='Password' onChange={handleChange} value={formFields.password} />

                <div className='btnCenter'>
                  <button className='btn mb-4'>Login</button>
                </div>

                {error && <p className='text-danger text-center'>{error}</p>}

              </Col>
              
            </Row>

          </Col>
        </Row>


      </Container>
    </main>
  )
}

export default Login