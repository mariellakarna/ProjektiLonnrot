import React from 'react'
import Logo from "../assets/lonnrotLogo.jpg";
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
      <div className='leftSide'>
      <img src={Logo} />
      <div>
        <h1>PROJEKTI LÖNNROT</h1>
        <h4>VAPAITA E-KIRJOJA KAIKILLE</h4>
        </div>
      </div>
      <div className='rightSide'>
        <Link to="/"> Kotisivu </Link>
        <Link to="/kirjailijat"> Kirjailijoiden mukaan ryhmiteltynä </Link>
        <Link to="/valmistuminen"> Valmistumisjärjestyksessä </Link>
      </div>
    </div>
  )
}

export default Navbar