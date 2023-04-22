import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import humps from 'humps'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import hero from '../../images/hero-register.jpeg'

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
      <Container className='register-login-cont'>
        <Row className='top-row'>

          <Col xs={0} sm={0} md={0} lg={6} className='d-none d-lg-block left'>
            <div className='img-container'>
              <img alt='record collection' src={hero}></img>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6}>
            <Row>
              <Col className='title-container'>
                <h1 className='display-4 text-center'>CRATE</h1>
                <p className='text-center'>Catalogue your collection. Find new music. Get digging.</p>
              </Col>
            </Row>

            <Row>

              <Form onSubmit={handleSubmit} >
                <div className='form-container'>
                  <h2>Register</h2>
                  <Form.Group className='mb-3'>
                    <Form.Control type="text" name='username' placeholder='Username' onChange={handleChange} value={formFields.username} />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control type="email" name="email" placeholder='Email' onChange={handleChange} value={formFields.email} />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control type="password" name="password" placeholder='Password' onChange={handleChange} value={formFields.password} />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control type="password" name="passwordConfirmation" placeholder='Password Confirmation' onChange={handleChange} value={formFields.passwordConfirmation} />
                  </Form.Group>

                  <Button variant='primary' type='submit' className='mb-3'>
                    Register
                  </Button>
                </div>

              </Form>

            </Row>


          </Col>
        </Row>


      </Container>
    </main>
  )


}

export default Register

// {/* <Col as='form' onSubmit={handleSubmit}>

// <h2>Register</h2>

// {/* <label htmlFor="username">Username</label> */}
// <input type="text" name="username" placeholder='Username' onChange={handleChange} value={formFields.username} />

// {/* <label htmlFor="email">Email</label> */}
// <input type="email" name="email" placeholder='Email' onChange={handleChange} value={formFields.email} />

// {/* <label htmlFor="password">Password</label> */}
// <input type="password" name="password" placeholder='Password' onChange={handleChange} value={formFields.password} />

// {/* <label htmlFor="passwordConfirmation">Password Confirmation</label> */}
// <input type="password" name="passwordConfirmation" placeholder='Password Confirmation' onChange={handleChange} value={formFields.passwordConfirmation} />

// <div className='btnCenter'>
//   <button className='btn mb-4'>Register</button>
// </div>

// {error && <p className='text-danger text-center'>{error}</p>}

// </Col> */}
