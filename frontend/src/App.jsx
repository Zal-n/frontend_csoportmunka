import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap komponensek importálása
import { Navbar, Nav, Container } from 'react-bootstrap';

import Home from "./pages/Home";
import Fridge from "./pages/Fridge";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isloggedin, setIsLoggedIn] = useState(false);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <BrowserRouter>
        {/* Bootstrap Navbar */}
        <Navbar collapseOnSelect expand="lg" className="custom-navbar" sticky="top">
          <Container>
            <Navbar.Brand as={NavLink} to="/" className="fw-bold text-danger fs-4">
              🍲 TechTrove CookBook
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={NavLink} to="/" className="nav-link-custom">
                  Receptek
                </Nav.Link>
                
                {isloggedin ? (
                  <>
                    <Nav.Link as={NavLink} to="/fridge" className="nav-link-custom">
                      Hűtőm tartalma
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/account" className="nav-link-custom">
                      Fiókom
                    </Nav.Link>
                  </>
                ) : (
                  <>
                     <Nav.Link as={NavLink} to="/login" className="nav-link-custom">
                      Belépés
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/register" className="nav-link-custom">
                      Regisztráció
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Oldal tartalma */}
        <Container className="mt-4">
            <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/fridge' element={<Fridge />} />
            {/* Mindkét helyre átadjuk a setIsLoggedIn-t */}
            <Route path='/account' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/register' element={<Register />} />
            </Routes>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App;