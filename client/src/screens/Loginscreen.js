import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Link from 'react-router-dom';

function Registerscreen() {

 
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [loading,setloading] = useState();
  const [error, seterror] = useState();


  async function  login(){
      
    const user ={
    
        email : email,
        password : password
        
      }
      try{
        
        setloading(true);
        const res = (await axios.post('/api/users/login',user));
        setloading(false);
        seterror(false);
        
        localStorage.setItem('currentUser',JSON.stringify(res));
        window.location.href = '/home';

   
      }catch(err){
        setloading(false);
        seterror(true);
        console.log(err);
      }
  }

  return (
    <div>
       {loading && <Loader/>}
       {error && <Error message = 'Username/Password is Wrong'/>}
      
       <div className="row justify-content-center mt-5">

      

            <div className="col-md-4 bs">
            {error && <Error message = 'Username/Password is Wrong'/>}
            <h2 className="text-center"><b>  Login </b></h2>

              
                <input style={{margin:'10px'}} type="email" className="form-control" placeholder="Email" value = {email} onChange={(e)=>{setemail(e.target.value)} } />
                <input style={{margin:'10px'}} type="password" className="form-control" placeholder="Password" value = {password} onChange={(e)=>{setpassword(e.target.value)}} />
               

                <div style = {{float : 'right',marginTop : '42px'}}>
                <button onClick={login} className="btn btn-primary mt-3 " style = {{backgroundColor: "black"}}> Login  </button>
                  </div>
                
                
            <div  style = {{margin:'20px'}}>
                 <h1>Not Registered Yet?</h1>

                 <Link to = '/regiter'>
                 <button className="btn btn-primary mt-3 " style = {{backgroundColor: "black"}}> Register</button>
                 </Link>
                 
                 </div>
          
            </div>

        
            
       </div>
    </div>
  )
}

export default Registerscreen