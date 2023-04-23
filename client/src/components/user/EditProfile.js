import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import hero from '../../images/hero-register.jpeg'


const EditProfile = () => {

  const { id } = useParams()

  const { state } = useLocation()

  const navigate = useNavigate()

  console.log('IMPORTED STATE', state.info.username)

  const { info } = state

  console.log('INFO', info)


  const [formFields, setFormFields] = useState({
    profile_image: info.profile_image,
    favourite_album: info.favourite_album,
    favourite_genre: info.favourite_genre,
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/api/profile/${id}/`, formFields)
      navigate(`/profile/${id}`)
    } catch (err) {
      console.log('error', err)
      setError(err.response.data.message)
    }

  }


  return (
    <main>
      <Container className='primary-container'>
        <Row className='top-row'>

          <Col xs={0} sm={0} md={0} lg={6} className='d-none d-md-block left'>
            {/* <h1 className='display-4 text-center'>EDIT PROFILE</h1>
            <p className='text-center'>Edit your CRATE profile information.</p> */}
            <div className='img-container'>
              <img alt='record collection' src={hero}></img>
            </div>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} className='right-review'>
            {/* <Row>
              <Col xs={12} sm={12} className='d-md-none'>
                <h1 className='display-4 text-center'>EDIT PROFILE</h1>
                <p className='text-center'>Edit your CRATE profile information.</p>
              </Col>
            </Row> */}

            <Row className='edit-profile-container'>

              <Form onSubmit={handleSubmit} class-name='review-content'>
                <div className='form-container'>
                  <h2>EDIT PROFILE INFO</h2>
                  <Form.Group className='mb-3'>
                    <Form.Control type="text" name='profile_image' placeholder={info.profile_image} onChange={handleChange} value={formFields.profile_image} />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control type="text" name="favourite_album" placeholder={info.favourite_album} onChange={handleChange} value={formFields.favourite_album} />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control type="text" name="favourite_genre" placeholder={info.favourite_genre} onChange={handleChange} value={formFields.favourite_genre} />
                  </Form.Group>

                  <Button variant='primary' type='submit' className='mb-3'>
                    Update
                  </Button>

                  {error && <p className='text-danger text-center'>{error}</p>}

                </div>

              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default EditProfile