import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Card } from 'react-bootstrap'
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

  }, [id])

  return (
    <main>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Row>
              <>
                {profile.profile_image ? <img src={profile.profile_image} alt="profile picture" className='profile-pic'></img> : <img src='https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg' alt="profile picture" className='profile-pic'></img>}
                <h2>{profile.username}</h2>
                {profile.collection ? <p>Records in crate: {profile.collection.length}</p> : <p>Records in crate: 0</p>}
                {profile.favourite_album ? <p>Favourite album: {profile.favourite_album}</p> : <p>Favourite album: not selected yet</p>}
                {profile.favourite_genre ? <p>Favourite genre: {profile.favourite_genre}</p> : <p>Favourite genre: not selected yet</p>}
                <Link to={`/profile/${id}/edit`} state={{ info: profile }}>Edit profile</Link>
              </>
            </Row>
            <h4>Following:</h4>
            <Row className='content-slider'>
              {profile.following && profile.following.length > 0 ? (
                profile.following.map(item => {
                  const { profile_image, username, id } = item
                  return (
                    <Col key={id}>
                      <img src={profile_image} height='100'></img>
                      <h4><Link to={`/profile/${id}`}>{username}</Link></h4>

                    </Col>
                  )
                })
              ) : (
                <p>This user isn&apos;t following anyone</p>
              )}
            </Row>
            <h4 className='d-md-none'>Your record collection:</h4>
            <Row className='content-slider d-md-none' xs={12} sm={12}>

              {profile.collection && profile.collection.length > 0 ?
                profile.collection.map(record => {
                  const { id, album_art, album } = record
                  return (
                    <Col key={id}>
                      <Link to={`/record/${id}`}><img src={album_art} height='100'></img></Link>
                    </Col>
                  )
                })
                :
                <>
                  <p>No records in collection</p>
                </>
              }
            </Row>
          </Col>
          <Col xs={0} sm={0} md={6} lg={6} className='d-none d-md-block'>
            <h4>Your record collection:</h4>
            <Row className='content-slider-vert'>

              {profile.collection && profile.collection.length > 0 ?
                profile.collection.map(record => {
                  const { id, album_art, album } = record
                  return (
                    <Col key={id}>
                      <Link to={`/record/${id}`}><img src={album_art} height='180px' width='180px'></img></Link>
                    </Col>
                  )
                })
                :
                <>
                  <p>No records in collection</p>
                </>
              }
            </Row>

          </Col>
        </Row>
      </Container>
    </main >
  )
}

export default Profile