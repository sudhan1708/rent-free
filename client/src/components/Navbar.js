import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import UserOutlined from '@ant-design/icons'
function Navbar() {

  const user = JSON.parse(localStorage.getItem('currentUser'));



  function Logout() {
    localStorage.removeItem('currentUser')



  }

  return <div>

    <nav class="navbar navbar-expand-lg ">
      <a class='navbar-brand' href='/home' style={{ marginLeft: '20px' }}>
        RentFree
      </a>

      <a class="nav-link" href="/home ">Home</a>
      <a class="nav-link" href="/hotel "> Hotels</a>
      <a class="nav-link" href="/pg ">PG Homes</a>

      <a class="nav-link" href="/rent ">Rent Your Home</a>
      <a class="nav-link" href="/contact ">Contact Us</a>

      

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse" id="navbarNav">


        <ul class="navbar-nav" >


          <UserOutlined />

          {user ? <> <div class="dropdown">

            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "black",marginRight :'15px' }}>
              {user.data.name}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

              <li><a class="dropdown-item" href="/profile"> Profile</a></li>
              <li><a class="dropdown-item" href="/login" onClick={Logout}>Log out</a></li>

            </ul>
          </div></> :

            <>




              <li class="nav-item active">
                <a class="nav-link" href="/register"  style ={{marginRight:'10px'}}>Register </a>
              </li>

              <li class="nav-item active">
                <a class="nav-link" href="/login" style ={{marginRight:'20px'}}>Log in</a>
              </li>



            </>

          }



        </ul>
      </div>
    </nav>
  </div>;
}

export default Navbar;
