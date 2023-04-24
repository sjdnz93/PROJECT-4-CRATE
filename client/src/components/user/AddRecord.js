import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import hero from '../../images/hero-register.jpeg'

import humps from 'humps'

const AddRecord = () => {

  const navigate = useNavigate()

  //! STATE

  const [formFields, setFormFields] = useState({
    album: '',
    artist: '',
    genre: '',
    releaseYear: '',
    albumArt: '',
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
      await axios.post('/api/records/', vals)
      navigate('/search-music')
    } catch (err) {
      console.log('error', err)
      setError(err.response.data.message)
    }

  }




  return (
    <main>
      <Container className='primary-container'>
        <Row className='top-row'>

          <Col xs={0} sm={0} md={0} lg={6} className='d-none d-lg-block left'>
            <div className='img-container'>
              <img alt='record collection' src={hero}></img>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className='right-add-record'>

            <Row>

              <Form onSubmit={handleSubmit} >
                <div className='form-container'>
                  <h2>ADD RECORD</h2>
                  <p className='text-center'>Can&apos;t find the record you&apos;re looking for? Enter the album&apos;s info into the form to add it to the CRATE database.</p>
                  <Form.Group className='mb-3'>
                    <Form.Control type="text" name='album' placeholder='Album' onChange={handleChange} value={formFields.album} />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control type="text" name="artist" placeholder='Artist' onChange={handleChange} value={formFields.artist} />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control type="text" name="genre" placeholder='Genre' onChange={handleChange} value={formFields.genre} />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control type="text" name="releaseYear" placeholder='Release year' onChange={handleChange} value={formFields.releaseYear} />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control type="text" name="albumArt" placeholder='Album Art (insert image URL' onChange={handleChange} value={formFields.albumArt} />
                  </Form.Group>

                  <Button variant='primary' type='submit' className='mb-3'>
                    Add record
                  </Button>

                  {error && <p className='text-danger text-center'>{error}</p>}

                </div>

              </Form>

            </Row>


          </Col>
        </Row>


      </Container>
      {/* <Container className='primary-container'>
        <Row className='top-row'>

          <Col xs={0} sm={0} md={6} lg={6} className='d-none d-md-block'>
            <h1 className='display-4 text-center'>ADD RECORD</h1>
            <p className='text-center'>Can&apos;t find the record you&apos;re looking for? Enter the album&apos;s info into the form to add it to the CRATE database.</p>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6}>
            <Row>
              <Col xs={12} sm={12} className='d-md-none'>
                <h1 className='display-4 text-center'>ADD RECORD</h1>
                <p className='text-center'>Can&apos;t find the record you&apos;re looking for? Enter the album&apos;s info into the form to add it to the CRATE database..</p>
              </Col>
            </Row>

            <Row>
              <Col as='form' onSubmit={handleSubmit}>

                <h2>ALBUM INFO</h2>

                <label htmlFor='album'>Album</label>
                <input type='text' name='album' placeholder='Album' onChange={handleChange} value={formFields.album} />

                <label htmlFor='artist'>Artist</label>
                <input type='text' name='artist' placeholder='Artist' onChange={handleChange} value={formFields.artist} />

                <label htmlFor='genre'>Genre</label>
                <input type='text' name='genre' placeholder='Genre' onChange={handleChange} value={formFields.genre} />

                <label htmlFor='releaseYear'>Release Year</label>
                <input type='text' name='releaseYear' placeholder='Release Year' onChange={handleChange} value={formFields.releaseYear} />

                <label htmlFor='albumArt'>Album Art</label>
                <input type='text' name='albumArt' placeholder='Album Art (insert image URL)' onChange={handleChange} value={formFields.albumArt} />

                <div className='btnCenter'>
                  <button className='btn mb-4'>Submit</button>
                </div>

                {error && <p className='text-danger text-center'>{error}</p>}

              </Col>
            </Row>
          </Col>
        </Row>
      </Container> */}
    </main>
  )
}

export default AddRecord