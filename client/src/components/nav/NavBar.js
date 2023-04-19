import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import { isAuthenticated, removeToken, getPayloadSub } from '../helpers/Auth'

import logo from '../../images/logos/high-res.png'





const NavBar = () => {

  const sub = getPayloadSub()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogOut = () => {
    removeToken()
    navigate('/login')
  }

  return (

    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href={isAuthenticated() ? `/profile/${sub}` : '/'}>
          <img
            alt='Crate logo'
            src={logo}
            width='100'
            className='d-inline-block align-top'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='crate-nav' />
        <Navbar.Collapse id='crate-nav' className='justify-content-end'>
          <Nav>
            {!isAuthenticated() ?
              <>
                <Nav.Link to='/login' as={Link}>Login</Nav.Link>
              </>
              :
              <>
                <Nav.Link to={`/profile/${sub}`} as={Link}>Your Crate</Nav.Link>
                <Nav.Link to='/search-music' as={Link}>Search Music</Nav.Link>
                <Nav.Link to='/add-record' as={Link}>Add Record</Nav.Link>
                <span className='nav-link' onClick={handleLogOut}>Sign Out</span>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

}

export default NavBar