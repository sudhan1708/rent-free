import React from 'react'
import {Link} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

function Landingscreen() {
  return (
    <div className="row  text-center">

        <div  className="col-md-12 landing ">

        <h2 data-aos="fade-right" style ={{color: 'white',fontSize:'100px',marginTop :'90px'}}>Rent Free</h2>
        <h1  data-aos="fade-left" style ={{color : 'white',margin: '50px'}}>"There Is Only One Boss. The Guest."</h1>
        <Link to='/home'>
        
        <button data-aos="fade-up" className="btn btn-primary" style = {{backgroundColor: "black"}}>Get Started</button>    
        </Link>
        
        
        </div>    
    </div>
  )
}

export default Landingscreen