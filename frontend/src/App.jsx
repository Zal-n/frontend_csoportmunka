import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap komponensek importálása
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload_recipes from './pages/Upload_recipes';
import { fetchWithAuth, logout } from './util/auth';
import SpecificRecipe from './pages/SpecificRecipe';

function App() {
  const [recipeId, setRecipeId] = useState('');
  const [isloggedin, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') ? true : false;

  });

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
                    <Nav.Link as={NavLink} to="/upload" className="nav-link-custom">
                      Recept feltöltés
                    </Nav.Link>
                    <Button to="/" className="btn-danger" onClick={() => { setIsLoggedIn(false); logout() }}>
                      Kijelentkezés
                    </Button>
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
            <Route path='/' element={<Home setRecipeId={setRecipeId}/>} />
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/upload' element={<Upload_recipes />} />
            <Route path='/specific_recipe' element={<SpecificRecipe recipeId={recipeId}/>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App;