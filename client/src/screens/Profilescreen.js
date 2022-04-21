import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Tag, Divider } from 'antd';
const { TabPane } = Tabs;

function callback(key) {
  //console.log(key);
}

function Profilescreen() {

  const user = JSON.parse(localStorage.getItem('currentUser'));
  useEffect(() => {


    if (!user)
    {
      window.location.href = '/login';
    }
  })


  return (
    <div style={{ margin: '20px' }}>
      <Tabs defaultActiveKey="1" onChange={callback}>


        <TabPane tab="My Bookings" key="1">
          <Mybooking />
        </TabPane>


        <TabPane tab="Profile" key="2">
          
          <br></br>

          <p><b>Name :  </b>{user.data.name}  </p>
          <p> <b>Email : </b>{user.data.email} </p>
          <p> <b>Admin : </b>{user.data.isAdmin ? 'Yes' : 'No'} </p>



        </TabPane>


      </Tabs>
    </div>
  )
}

export default Profilescreen;


export function Mybooking() {

  const [bookings, setBookings] = useState([]);


  const [loading, setloading] = useState();
  const [error, seterror] = useState(false);



  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(user.data._id);
    async function fetch() {
      try

      {

        
        setloading(true);
        const res = (await axios.post('api/bookings/getroomsbyuserid', { userid: user.data._id })).data;
        console.log(res);
        setloading(false);
        setBookings(res);
      } catch (err)
      {
        setloading(false);
        seterror(true);
        console.log(err);
      }

    }

    fetch();

  }, [])


  async function cancelBooking(bookingid, roomid) {

    try
    {
      setloading(true);
      const res = (await axios.post('api/bookings/cancelbooking', { bookingid, roomid })).data;
      console.log(res);
      setloading(false);
      Swal.fire('Congratulations!!!', 'Room Cancelled Sucessfully', 'success').then(res => {
        window.location.reload();
      })

    } catch (err)
    {
      setloading(false);
      seterror(true);
      console.log(err);
      Swal.fire('Ooops', 'Something went wrong', 'error');
    }

  }

  return (

    <div>


      <div className="row">
        <div className="col-md-7">


          {bookings.map(booking => {

            return (

              <div>
                {loading && <Loader />}
                <div className='bs'>

                  <h1>Room: {booking.room}</h1>

                  <p> <b>  Amount :</b> Rs {booking.totalamount} </p>
                  <p> <b>CheckIn :</b> {booking.fromdate} </p>
                  <p> <b>CheckOut : </b>{booking.todate} </p>
                  <p><b>Status :</b> {booking.status === 'booked' ? (<Tag color="green">Confirmed</Tag>) : (<Tag color="red">Cancelled</Tag>)}</p>
                  {(booking.status === 'booked') &&
                    (<button className='btn btn-primary text-right' style={{ backgroundColor: "black" }} onClick={() => { cancelBooking(booking._id, booking.roomid) }}>
                      Cancel Booking
                    </button>
                    )
                  }
                </div>
              </div>
            )
          })}

        </div>
      </div>

    </div>

  )

}