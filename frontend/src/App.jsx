import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import Home from "./pages/Home";
import Fridge from "./pages/Fridge";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

function App() {

  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Receptek</NavLink>
          <NavLink to="/fridge">Mi van a hűtődben?</NavLink>
          <NavLink to="/account">Fiók</NavLink>
        </nav>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/fridge' element={<Fridge/>}/>
          <Route path='/account' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
