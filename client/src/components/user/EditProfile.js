import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


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
      <Container>
        <Row>

          <Col xs={0} sm={0} md={6} lg={6} className='d-none d-md-block'>
            <h1 className='display-4 text-center'>EDIT PROFILE</h1>
            <p className='text-center'>Edit your CRATE profile information.</p>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6}>
            <Row>
              <Col xs={12} sm={12} className='d-md-none'>
                <h1 className='display-4 text-center'>EDIT PROFILE</h1>
                <p className='text-center'>Edit your CRATE profile information.</p>
              </Col>
            </Row>

            <Row>
              <Col as='form' onSubmit={handleSubmit}>

                <h2>PROFILE INFO</h2>

                <label htmlFor='profile_image'>Profile Image</label>
                <input type='text' name='profile_image' placeholder={info.profile_image} onChange={handleChange} value={formFields.album} />

                <label htmlFor='favourite_album'>Favourite Album</label>
                <input type='text' name='favourite_album' placeholder={info.favourite_album} onChange={handleChange} value={formFields.favourite_album} />

                <label htmlFor='favourite_genre'>Favourite Genre</label>
                <input type='text' name='favourite_genre' placeholder={info.favourite_genre} onChange={handleChange} value={formFields.favourite_genre} />

                <div className='btnCenter'>
                  <button className='btn mb-4'>Submit</button>
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

export default EditProfile