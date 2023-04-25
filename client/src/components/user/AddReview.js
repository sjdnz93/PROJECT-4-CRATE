import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import humps from 'humps'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const AddReview = () => {

  const { recordId, sub } = useParams()

  console.log('RECORD ID', recordId)
  console.log('SUB', sub)

  const navigate = useNavigate()

  //! STATE

  const [formFields, setFormFields] = useState({
    record: recordId,
    owner: sub,
    reviewText: '',
    rating: '',
  })

  const [record, setRecord] = useState([])

  const [error, setError] = useState('')

  //! Executions

  useEffect(() => {
    const getRecord = async () => {
      try {
        const { data } = await axios.get(`/api/records/${recordId}/`)
        console.log('RECORD DATA', data)
        setRecord(data)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getRecord()
  }, [])

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const vals = humps.decamelizeKeys(formFields)
      await axios.post('/api/reviews/', vals)
      navigate(`/record/${recordId}`)
    } catch (err) {
      console.log('error', err)
      setError(err.response.data.message)
    }

  }

  return (
    <main>
      <Container className='primary-container'>
        <Row className='top-row'>

          <Col xs={0} sm={0} md={0} lg={6} className='d-none d-md-block left' >
            <div className='desktop-img'>
              <img src={record.album_art}></img>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className='right-review'>
            <Row className='mobile-review-container'>
              <Col xs={12} sm={12} className='d-md-none mobile-album-review'>
                <h1>ADD ALBUM REVIEW</h1>
                <img className='d-md-none mobile-album-pic' src={record.album_art} alt='album cover'></img>
              </Col>
            </Row>

            <Row className='review-content'>

              <Form onSubmit={handleSubmit} className='review' >
                <div className='form-container '>
                  <h2>Review Info</h2>
                  <Form.Group className='mb-3'>
                    <Form.Control type="text" name='reviewText' placeholder='Review text' onChange={handleChange} value={formFields.reviewText} />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Control type="number" name="rating" placeholder='Rating out of 5' onChange={handleChange} value={formFields.rating} />
                  </Form.Group>

                  <Button variant='primary' type='submit' className='mb-3'>
                    Submit review
                  </Button>

                  {error && <p className='text-danger text-center'>{error}</p>}

                </div>

              </Form>

            </Row>
            <div className='buffer'></div>

          </Col>

        </Row>



      </Container>


    </main >
  )


}

export default AddReview