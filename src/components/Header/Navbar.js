import { Space } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header>
      


<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="#">Easy Notes</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact</a>
        </li>
        
       
      </ul>
      <Space>

<Link to='/auth/login' className='text-decoration-none border border-dark px-3 py-2 text-white bg-dark rounded'>Login</Link>
<Link to='/auth/register' className='text-decoration-none border border-success px-3 py-2 text-white bg-success rounded'>Register</Link>
</Space >
    </div>
  </div>
</nav>
    </header>
  )
}