import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Carousel } from 'react-bootstrap'


import Error from '../error/Error'
import CarouselItem from 'react-bootstrap/esm/CarouselItem'

const Profile = () => {

  const { id } = useParams()

  const [profile, setProfile] = useState({})

  const [error, setError] = useState('')

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${id}`)
        console.log('USER DATA', data)
        setProfile(data)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getProfile()

  }, [])

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${id}`)
        console.log('USER DATA', data)
        setProfile(data)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getProfile()

  }, [id])

  // console.log('profile', profile)
  // console.log(profile.username)
  // console.log(profile.collection.length)
  // console.log(profile.following[1].username)

  return (
    <main>
      <Container>
        <Row>
          <Col>
            <Row>
              <>
                <img src={profile.profile_image} alt="profile picture"></img>
                <h2>{profile.username}</h2>
                {profile.collection ? <p>Records in crate: {profile.collection.length}</p> : <p>Records in crate: 0</p>}
              </>
            </Row>

            <Row>
              <h3>Following:</h3>
              {profile.following && profile.following.length > 0 ? (
                <Carousel variant="dark">
                  {profile.following.map((item) => (
                    <Carousel.Item key={item.id}>
                      <div className="card-image" style={{ backgroundColor: 'white' }}></div>
                      <Carousel.Caption>
                        <img src={item.profile_image} height="50px"></img>
                        <h2>
                          <Link to={`/profile/${item.id}`}>{item.username}</Link>
                        </h2>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <h2>No followers</h2>
              )}
            </Row>


          </Col>
        </Row>
      </Container>
    </main >
  )
}

export default Profile