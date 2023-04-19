import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import humps from 'humps'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


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
        const { data } = await axios.get(`/api/records/${recordId}`)
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
      <Container>
        <Row>

          <Col xs={0} sm={0} md={6} lg={6} className='d-none d-md-block' >
            <h1>ADD ALBUM REVIEW</h1>
            <div className='record-image desktop-image' style={{ backgroundImage: `url('${record.album_art}')` }}></div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6}>
            <Row>
              <Col xs={12} sm={12} className='d-md-none'>
                <h1>ADD ALBUM REVIEW</h1>
                <div className='record-image desktop-image' style={{ backgroundImage: `url('${record.album_art}')` }}></div>
              </Col>
            </Row>

            <Row>
              <Col as='form' onSubmit={handleSubmit}>

                <h2>REVIEW INFO</h2>

                <label htmlFor='reviewText'>Review</label>
                <input type='textarea' name='reviewText' placeholder='Enter your review' onChange={handleChange} value={formFields.reviewText} />

                <label htmlFor='rating'>Artist</label>
                <input type='number' name='rating' placeholder='Score' onChange={handleChange} value={formFields.rating} />

                <div className='btnCenter'>
                  <button className='btn mb-4'>Submit</button>
                </div>

                {error && <p className='text-danger text-center'>{error}</p>}

              </Col>
            </Row>


          </Col>











        </Row>



      </Container>


    </main >
  )


}

export default AddReview