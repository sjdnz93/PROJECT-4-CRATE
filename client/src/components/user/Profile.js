import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Error from '../error/Error'

import { getPayloadSub } from '../helpers/Auth'

const Profile = () => {

  const { id } = useParams()

  const sub = getPayloadSub()

  const [profile, setProfile] = useState({})

  const [loggedUser, setLoggedUser] = useState({})

  const [error, setError] = useState('')

  const [recordView, setRecordView] = useState(true)

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

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${sub}`)
        console.log('LOGGED USER DATA', data)
        setLoggedUser(data)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getLoggedUser()
  }, [])



  const toggleRecordView = (e) => {
    if (recordView) {
      setRecordView(false)
      e.target.innerText = 'Show collection'
    } else {
      setRecordView(true)
      e.target.innerText = 'Show wishlist'
    }
    console.log('RECORD VIEW', recordView)
    console.log(e.target)
  }

  const followUnfollow = async (e) => {
    console.log(profile.id)
    console.log(sub)
    console.log('Logged user', loggedUser.following)
    console.log('condition', Object.values(profile)[0])
    const otherId = Object.values(profile)[0]

    const master = []

    loggedUser.following.forEach(item => {
      console.log('vals', Object.values(item)[0]) 
      master.push(Object.values(item)[0]) 
    })

    console.log('FILTERED', master)



    if (master.includes(otherId) === true) {
      try {
        await axios.put(`/api/profile/${sub}/unfollow/${profile.id}/`)
        e.target.innerText = 'Follow'
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    } else  {
      try {
        await axios.put(`/api/profile/${sub}/follow/${profile.id}/`)
        e.target.innerText = 'Unfollow'
        console.log('FOLLLWOING')
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
  }


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
                <button onClick={toggleRecordView}>Show wishlist</button>
                <button onClick={followUnfollow} className={sub === profile.id ? 'd-none' : ''}>Follow this user</button>
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
                <p>Find users to follow <Link to={'/search-users'}>here</Link></p>
              )}
            </Row>

            {recordView ? <h4 className='d-md-none'>Your record collection:</h4> : <h4 className='d-md-none'>Your record wishlist:</h4>}
            <Row className='content-slider d-md-none' xs={12} sm={12}>
              {recordView ?
                profile.collection && profile.collection.length > 0 ?
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

                :
                profile.wishlist && profile.wishlist.length > 0 ?
                  profile.wishlist.map(record => {
                    const { id, album_art, album } = record
                    return (
                      <Col key={id}>
                        <Link to={`/record/${id}`}><img src={album_art} height='100'></img></Link>
                      </Col>
                    )
                  })
                  :
                  <>
                    <p>No records in wishlist</p>
                  </>
              }
            </Row>
          </Col>
          <Col xs={0} sm={0} md={6} lg={6} className='d-none d-md-block'>
            {recordView ? <h4>Your record collection:</h4> : <h4>Your record wishlist:</h4>}
            <Row className='content-slider-vert'>
              {recordView ?
                profile.collection && profile.collection.length > 0 ?
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

                :
                profile.wishlist && profile.wishlist.length > 0 ?
                  profile.wishlist.map(record => {
                    const { id, album_art, album } = record
                    return (
                      <Col key={id}>
                        <Link to={`/record/${id}`}><img src={album_art} height='100'></img></Link>
                      </Col>
                    )
                  })
                  :
                  <>
                    <p>No records in wishlist</p>
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