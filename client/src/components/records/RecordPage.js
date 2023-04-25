import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Error from '../error/Error'

import { getPayloadSub } from '../helpers/Auth'

const RecordPage = () => {

  const { recordId } = useParams()

  const [record, setRecord] = useState([])

  const [error, setError] = useState('')

  const [user, setUser] = useState([])

  const sub = getPayloadSub()

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



  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${sub}/`)
        console.log('USER DATA', data)
        setUser(data)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getUser()
  }, [])

  const addToCollection = async () => {
    try {
      await axios.put(`/api/profile/${sub}/collection/${recordId}/`)
      //! ADD IN RESPONSE TO LET USER KNOW IF RECORD SUCCESSFULLY ADDED
    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }

  const addToWishlist = async () => {
    try {
      await axios.put(`/api/profile/${sub}/wishlist/${recordId}/`)
      //! ADD IN RESPONSE TO LET USER KNOW IF RECORD SUCCESSFULLY ADDED
    } catch (err) {
      console.log(err)
      setError(err.message)
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

          <Col xs={12} sm={12} md={6} lg={6} className='right'>
            <Row >
              <>
                <Col className='record-info'>
                  <img className='d-md-none mobile-album' src={record.album_art} alt='album cover'></img>
                  <h1>{record.album}</h1>
                  <h2>{record.artist}</h2>
                  <p>Released: {record.release_year}</p>
                  <p>Genre: {record.genre}</p>
                  <p>Insert avg. rating</p>
                  <button className='toggle-button' onClick={addToCollection}>Add record to your collection</button>
                  <button className='toggle-button' onClick={addToWishlist}>Add record to your wishlist</button>
                  <Link className='toggle-button' to={`/add-review/${recordId}/${sub}`}>Submit album review</Link>
                </Col>
              </>
            </Row>

            <Row>
              <>
                <Col className='review-info slider'>
                  <h2>REVIEWS</h2>
                  {record.reviews && record.reviews.length > 0 ?
                    record.reviews.map(review => {
                      const { id, review_text, rating, owner } = review
                      if (review) {
                        return (
                          <div key={id} className='review-container'>
                            <p className='review-content'><Link to={`/profile/${owner.id}`}>{owner.username}</Link></p>
                            <p className='review-content'>{review_text}</p>
                            <p className='review-content'>Rating: {rating}/5</p>
                          </div>
                        )
                      } 
                    })
                    :
                    <>
                      <p>No reviews for this album. Click the link to add one.</p>
                    </>
                  }
                </Col>
              </>
              <div className='buffer'></div>
            </Row>
          </Col>
        </Row>
      </Container>
    </main >
  )
}

export default RecordPage