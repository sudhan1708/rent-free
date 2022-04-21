import React ,{useState,useEffect}from 'react'
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import { set } from 'mongoose';


function Registerscreen() {

  const [name ,setname] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [cpassword,setcpassword] = useState('');
  
  const [loading,setloading] = useState();
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();
 async function register(){

    if(password === cpassword){

      const user ={
        name : name,
        email : email,
        password : password,
        cpassword : cpassword
      }

      try{

        setloading(true);
        const res = (await axios.post('/api/users/register',user));
        setloading(false); 
        setsuccess(true);
        
        setname('');
        setemail('');
        setpassword('');
        setcpassword('');

        console.log(res);
      }catch(err){
        seterror(true);
        setloading(false);
        console.log(err);
      }

      window.location.href = '/login';

    }
    
    
    else{
      alert('Password is not Matching')
    }
  }

  return (
    <div>

      {loading && (<Loader/>)} 

      {error  && (<Error/>)}



       <div className="row justify-content-center">
          
      
            <div className="col-md-4 bs mt-5">
            {success && (<Success message = 'Registration Successfull' />)} 
            <h2 className="text-center"><b>  Register </b></h2>

                <input  style={{margin:'10px'}} type="text" className="form-control" placeholder="Name" value = {name} onChange={(e)=>{setname(e.target.value)}} />
                <input  style={{margin:'10px'}} type="email" className="form-control" placeholder="Email" value = {email} onChange={(e)=>{setemail(e.target.value)} } />
                <input  style={{margin:'10px'}} type="password" className="form-control" placeholder="Password" value = {password} onChange={(e)=>{setpassword(e.target.value)}} />
                <input  style={{margin:'10px'}} type="password" className="form-control" placeholder="Confirm Password" value = {cpassword} onChange={(e)=>{setcpassword(e.target.value)}} />

              <div className="text-center">
              <button onClick={register} className="btn btn-primary mt-3" style = {{backgroundColor: "black"}}> Register </button>

              </div>
              
            </div>
           
       </div>
    </div>
  )
}

export default Registerscreen