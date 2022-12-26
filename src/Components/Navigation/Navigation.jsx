import React, {useEffect, useState} from 'react'
import './Navigation.css'

// Navigation
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form';

import {Link} from 'react-router-dom';

 
// NAVIGATIOn MODAL
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
// NAVIGATIOn MODAL

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // NAVIGATIOn MODAL
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  // NAVIGATIOn MODAL

  // LOG OUT USER
  const handelLogOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    Cookies.remove('user');
  } // LOG OUT USER
  
  // LOG IN USER
  const handelLogIn = async (e) => {
    e.preventDefault();
    
    const rawResponse = await fetch('https://backend-klosko.onrender.com/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: e.target.email.value, password: e.target.password.value})
    });

 
      const content = await rawResponse.json();
      // Ovdje treba dodati error handleing za No User Found && Wrong Password ; iskoristiti content i vidjeti sta sa tim

      if(content.e === 'No User Found'){
        console.log('HELLO WORLD NEMA NJEGA!!');
      }else if(content.e === 'Wrong Password'){
        console.log('WRONG PASSWORD PAŠA!');
      }else {
        const data = {
          token: content.token,
          username: content.user.username,
          email: content.user.email,
          city: content.user.city,
          id: content.user._id
        }
    
        Cookies.set('user', JSON.stringify(data));
        setIsLoggedIn(true);
        setUser(data);
        
        setShow(false);
      }
  }

  useEffect(() => {
    if(Cookies.get('user') !== undefined){
      const data = JSON.parse(Cookies.get('user'));
      setIsLoggedIn(true);
      setUser(data);
    }
  }, []);

  return (
    <>
    <Navbar expand="lg" className='uppwer-Navigation'>
      <Container>
  
      
          <Nav className="me-auto">
            {isLoggedIn && <Nav.Link href="#home">Poruke <Badge pill bg="danger" style={{position: 'relative', top: '-12px', left: '-4px'}}>1</Badge></Nav.Link>}
            <Nav.Link href="#link">Sve Kategorije</Nav.Link>
          </Nav>


            
          

         {isLoggedIn ? 
            <NavDropdown title={user.username} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Profil</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Postavke</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Moji Artikli</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handelLogOut}>Odjavite se</NavDropdown.Item>
            </NavDropdown>

            :
          
                <Button variant="success" onClick={handleShow} >Prijavi se</Button>

        }

     



      </Container>
    </Navbar>


    <Navbar expand="lg" className='lower-navigation' >
      <Container>
          <Navbar.Brand href="#home" style={{fontSize: '35px'}}>Kloško.ba</Navbar.Brand> 
      

          
        

          <div>
          <Form className="d-flex" style={{width: '900px', height: '50px'}}>
            <Form.Control
              type="search"
              placeholder="Probajte: Stan u Beogradu do 120.000 Eura"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="success" style={{marginRight: '120px', width:'320px', fontSize: '25px'}}>Pretražuj</Button>
            <Button variant="warning" style={{width:'500px',fontSize: '25px', color: 'black'}}>OBJAVI ARTIKL</Button>
          </Form>
             
             
          </div>



      </Container>
    </Navbar>





        


    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Prijavi se u svoj profil</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handelLogIn}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email adresa</Form.Label>
              <Form.Control
                type="email"
                placeholder="adis@primjer.ba"
                autoFocus
                name="email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ovdje unesite vašu lozinku"
                autoFocus
                name="password"
              />
            </Form.Group>
            <Button type="submit" variant="primary" size="lg">
              PRIJAVI SE
            </Button>
          </Form>
        </Modal.Body>

      </Modal>

    </>
  )
}

export default Navigation