import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

  

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${sub}`)
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
      <Container>
        <Row>

          <Col xs={0} sm={0} md={6} lg={6} className='d-none d-md-block' >
            <div className='record-image desktop-image' style={{ backgroundImage: `url('${record.album_art}')` }}></div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6}>
            <Row>
              <Col xs={12} sm={12} className='d-md-none'>
                <div className='record-image desktop-image' style={{ backgroundImage: `url('${record.album_art}')` }}></div>
              </Col>
            </Row>

            <Row>
              <Col>
                <h1>{record.album}</h1>
                <h2>{record.artist}</h2>
                <p>Released: {record.release_year}</p>
                <p>Genre: {record.genre}</p>
                <p>Insert avg. rating</p>
                <button onClick={addToCollection}>Add record to your collection</button>
                <button onClick={addToWishlist}>Add record to your wishlist</button>
                <button>Submit album review</button>
              </Col>
            </Row>


          </Col>











        </Row>



      </Container>


    </main >
  )
}

export default RecordPage