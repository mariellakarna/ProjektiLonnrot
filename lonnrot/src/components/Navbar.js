import React from 'react'
// import Logo from "../assets/lonnrotLogo.jpg";
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className='navbar'>
      <div className='leftSide'>
      <div>
        <Link to="/">
        <h1 className='title'>PROJEKTI LÖNNROT</h1>
        </Link>
        <h4 className='subtitle'>Vapaita e-kirjoja kaikille</h4>
        </div>
      </div>
      <div className='rightSide'>
        <div className='dropdown'>
          <button onClick={() => setIsOpen(!isOpen)} className='dropbtn'>Kirjat</button>
          {isOpen && (
            <div className='dropdown-content'>
              <Link to="/kirjailijat"> Kirjailijan mukaan </Link>
            </div>
          )}
        </div>
        <Link to="/contact">
          <button className='contactBtn'>Ota yhteyttä</button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar