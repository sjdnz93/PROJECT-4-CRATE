import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import Error from '../error/Error'


const SearchMusic = () => {

  const navigate = useNavigate()

  //! STATE

  const [records, setRecords] = useState([])

  const [filters, setFilters] = useState('')

  const [filteredRecords, setFilteredRecords] = useState([])

  const [error, setError] = useState('')

  //! Executions

  useEffect(() => {

    const getRecords = async () => {
      try {
        const { data } = await axios.get('/api/records/')
        console.log(data)
        setRecords(data.sort((a, b) => a.album > b.album ? 1 : -1))
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }

    getRecords()
  }, [])

  useEffect(() => {

    setFilteredRecords(records)

  }, [records])


  useEffect(() => {
    const regex = RegExp(filters, 'i')
    const newFilteredRecords = records.filter(record => {
      return regex.test(record.album)
    })
    setFilteredRecords(newFilteredRecords)
  }, [filters])

  const handleChange = (e) => {
    setFilters(e.target.value)

  }

  return (
    <main>
      <Container>
        <Row>
          <Col className='text-center'>
            <h1>CRATE DIGGING</h1>
            <h3>Use the search bar below to find music to add to your collection.</h3>
            <Link to={'/add-record'}>Can&apos;t find the album you&apos;re looking for? Click here to add it to the CRATE database.</Link>
            <div>
              <h2>SEARCH</h2>
              <input type='text' name='album' placeholder='Album title' onChange={handleChange} value={filters} />
            </div>
          </Col>
        </Row>
        <Row>
          {filteredRecords.length > 0 ?
            filteredRecords.map(record => {
              const { id, album_art, album } = record
              return (
                <Col key={id} lg={2} md={2} sm={4} xs={4} className='record'>
                  <Link to={`/record/${id}`}>
                    <Card>
                      <div className='card-image' style={{ backgroundImage: `url('${album_art}')` }}></div>
                    </Card>
                  </Link>
                </Col>
              )
            })
            :
            <>
              {error ?
                <Error error={error} />
                :
                <h1>Loading</h1>
              }
            </>
          }
        </Row>
      </Container>
    </main>
  )
}

export default SearchMusic