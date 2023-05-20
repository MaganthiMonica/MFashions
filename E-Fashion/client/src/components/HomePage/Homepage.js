import React from 'react'
import Navbar from '../NavBar'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate=useNavigate()
  const handleSHOP = () => {
    navigate('/shop')
  }
  return (
    <>
    <div className='HomePage'>
      <div class="container">
  <h1 class="heading">Welcome to our online store!</h1>
  <p class="description">Check out our latest  products:</p>
  <button class="product-btn" onClick={handleSHOP}>View Product</button>
</div>

    </div>
    </>  
  )
}

export default HomePage