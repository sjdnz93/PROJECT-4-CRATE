import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import humps from 'humps'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Register = () => {

  const navigate = useNavigate()

  //! STATE

  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    reviews: [],
  })

  const [error, setError] = useState('')

  //! Executions

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const vals = humps.decamelizeKeys(formFields)
      await axios.post('/api/profile/register/', vals)
      navigate('/login')
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
              <Col>
                <h1 className='display-4 text-center'>CRATE</h1>
                <p className='text-center'>Catalogue your collection. Find new music. Get digging.</p>
              </Col>
            </Row>

            <Row>
              <Col as='form' onSubmit={handleSubmit}>

                <h2>Register</h2>

                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder='Username' onChange={handleChange} value={formFields.username} />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder='Email' onChange={handleChange} value={formFields.email} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder='Password' onChange={handleChange} value={formFields.password} />

                <label htmlFor="passwordConfirmation">Password Confirmation</label>
                <input type="password" name="passwordConfirmation" placeholder='Password Confirmation' onChange={handleChange} value={formFields.passwordConfirmation} />

                <div className='btnCenter'>
                  <button className='btn mb-4'>Register</button>
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

export default Register