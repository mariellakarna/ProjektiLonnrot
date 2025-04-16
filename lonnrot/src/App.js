import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Authors from './pages/Authors';
// import Published from './pages/Published';
import AuthorDetails from './pages/AuthorDetails';
import BookReader from './pages/BookReader';
import { BrowserRouter as Router, Routes, Route, /* Switch */ } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Navbar />
    <div className='main-content'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/kirjailijat' element={<Authors />} />
        {/* <Route path='/valmistuminen' element={Published} /> */}
        <Route path='/author/:authorName' element={<AuthorDetails />} />
        <Route path='/book/:bookId' element={<BookReader />} />
      </Routes>
    </div>
    <Footer />
    </Router>
  )
}
export default App;


