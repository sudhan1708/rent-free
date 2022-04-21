import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from '../components/Loader';
import Success from '../components/Success';
import Swal from 'sweetalert2'
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration : 1000
});

function Bookingscreen() {
  const params = useParams();
  const [room, setroom] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [totalamount,settotalamount] = useState();

  const roomid = params.roomid;
  const fromdate = moment(params.fromdate,'DD-MM-YYYY');
  const todate = moment(params.todate,'DD-MM-YYYY');
  const totaldays = 1 + moment.duration(todate.diff(fromdate)).asDays();
  const name = JSON.parse(localStorage.getItem('currentUser')).data.name;
  
  useEffect(() => {
    fetch();

    async function fetch() {

      
      if(!localStorage.getItem('currentUser')){
         window.location.reload = '/login';
      }

      try {
        setloading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", { roomid: params.roomid })
        ).data;
        console.log(data);
        setroom(data);
        setloading(false);
        seterror(false);
       
     const totalAmount = totaldays * data.rentperday;
     settotalamount(totalAmount);
      
      } catch (e) {
       
        setloading(false);
        seterror(true);
  
      }
      
    }
  }, []);


 async function onToken(token){

    console.log(token);
    const bookingDetails = {
      room,
      userid : JSON.parse(localStorage.getItem('currentUser')).data._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
      }


    try{
      setloading(true);
      const res =await axios.post('/api/bookings/bookroom',bookingDetails);
      setloading(false);
      //alert('Room Booked Successfully');
      Swal.fire('Congratulations!','Room Booked Successfully','success').then(res=>{
        window.location.href = '/profile';
      })
    }catch(err){
      setloading(false);
      seterror(true);
      console.log(err);
      Swal.fire('Oooops!!!','Something went wrong','error');
    }

  }
  return (
    <div>
      {loading ? (
        <Loader/>
      ) : error ? (
         <Error message = 'something went wrong'/>
      ) : (
        <div >
          <div className="row justify-content-center " data-aos="flip-up" >
            <div className="col-md-5 bs" style = {{marginRight:'50px'}}>
              <br></br> 
              <h2> <b> {room.name} </b> </h2>
              <img src={room.imageurls[0]} className="bigimg mt-2"alt ='room-img' />
            </div>

            <div className="col-md-5 bs">
              <br></br>
              <h2><b>Booking Details </b></h2>
              <hr />

              <p>
                {" "}
                <b> Name : </b> {name}
              </p>
              <p>
                {" "}
                <b>From Date : </b> {params.fromdate}
              </p>
              <p>
                {" "}
                <b> To Date : </b> {params.todate}
              </p>
              <p>
                {" "}
                <b> Max Count : </b>
                {room.maxcount}
              </p>


              <div>
            <h2><b> Payment</b></h2>
            <hr/>
            <p> <b>Total Days : </b>{totaldays} </p>
            <p> <b>Rent Per Day : </b> {room.rentperday} </p>
            <p> <b>Total Amount : </b>{totalamount} </p>

           
              </div>

              <StripeCheckout
        token={onToken}
        amount = {totalamount * 100}
        currency = 'INR'
        stripeKey="pk_test_51KiDCCSE56aS4mGRW26ys3Kn7smZmmvDzyyDPK3YV8ej4NBCe077q5fYt74FdjIkMoItE51dNxVj3QWnyC8YNnVM00OyaigyFG">
           <button className="btn btn-primary" style={{
              float: "right",
              backgroundColor: "black",
              marginLeft: "10px",
            }}> Pay Now</button>
        </StripeCheckout>
      
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
