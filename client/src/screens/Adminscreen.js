import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Tag, Divider } from 'antd';
const { TabPane } = Tabs;
function Adminscreen() {
  return (
    <div className=" bs" style={{ margin: '30px' }}>
      <Tabs defaultActiveKey="1">


        <TabPane tab="Bookings" key="1">

          <Booking />

        </TabPane>

        <TabPane tab="Rooms" key="2">
          <Room />
        </TabPane>

        <TabPane tab="Users" key="3">
          <User />
        </TabPane>

        <TabPane tab="Add Rooms" key="4">
          <Addroom/>
        </TabPane>



      </Tabs>
    </div>
  )
}

export default Adminscreen


export function Booking() {

  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {

    fetch();
    async function fetch() {

      try
      {


        const res = (await axios.get('/api/bookings/getallbookings')).data;
        setbookings(res);
        setloading(false);
        console.log(res);

      } catch (err)
      {
        seterror(true);
        setloading(false);
        console.log(err);
      }
    }
  }, [])


  return (

    <div className="row">
      {loading && <Loader />}

      {bookings.map(booking => {

        return (

          <div className="row">
            <div className="col-md-10">
              {loading && <Loader />}
              <div className='bs'>



                <div>
                  <h1>Room: {booking.room}</h1>
                  <p> <b>User ID : </b>{booking.userid} </p>

                  <p> <b>  Amount :</b> Rs {booking.totalamount} </p>
                  <p> <b>CheckIn :</b> {booking.fromdate} </p>
                  <p> <b>CheckOut : </b>{booking.todate} </p>
                  <p> <b>Total Days : </b>{booking.totaldays} </p>
                  <p> <b>Status : </b> {booking.status === 'cancelled' ? <Tag color="red"> {booking.status}  </Tag> : <Tag color="green"> {booking.status}  </Tag>} </p>

                </div>




              </div>
            </div>
          </div>
        )
      })}


    </div>
  )
}



export function Room() {

  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {

    fetch();
    async function fetch() {

      try
      {


        const res = (await axios.get('/api/rooms/getallrooms')).data;
        setrooms(res);
        setloading(false);
        console.log(res);

      } catch (err)
      {
        seterror(true);
        setloading(false);
        console.log(err);
      }
    }
  }, [])


  return (

    <div >
      {loading && <Loader />}

      {rooms.map(room => {

        return (

          <div className="row">
            <div className="col-md-10">
              {loading && <Loader />}
              <div className='bs'>



                <div>
                  <h1>Room: {room.name}</h1>
                  <p> <b>Max Count : </b>{room.maxcount} </p>

                  <p> <b> Phone Number :</b> Rs {room.phonenumber} </p>
                  <p> <b>Type :</b> {room.type} </p>
                  <p> <b>Rent/Day : </b>{room.rentperday} </p>

                </div>




              </div>
            </div>
          </div>
        )
      })}


    </div>
  )
}


export function User() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(() => {

    fetch();

    async function fetch() {

      try
      {
        const res = (await axios.get('/api/users/getallusers')).data;
        setusers(res);
        setloading(false);
      } catch (err)
      {
        setloading(false);
        seterror(err);
        console.log(err);
      }
    }
  }, [])


  return (<div>
    {loading && <Loader />}
    <table>
      <tr>
       
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
      </tr>

      {users &&
        users.map(user => {
          return (
          <tr>
            <td> {user.name}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? <b> Yes  </b>: <b> No</b>}</td>
          </tr>)
        })
      }
    </table>
  </div>)
}


export function Addroom(){

  const [roomName,setRoomName] = useState('');
  const [description,setDescription] = useState();
  const [type,setType] = useState();
  const [rentPerDay,setRentPerDay] = useState();
  const [phoneNumber,setPhoneNumber] = useState();
  const [maxCount,setMaxCount] = useState();
  const [imageUrl1,setImageUrl1] = useState();
  const [imageUrl2,setImageUrl2] = useState();
  const [imageUrl3,setImageUrl3] = useState();

  async function addRoom(){

    const room = {
      roomName,
      rentPerDay,
      description,
      type,
      phoneNumber,
      maxCount,
      imageUrls : [imageUrl1,
        imageUrl2,
        imageUrl3]
    }
    console.log(room);

    try{
      const res =await axios.post('/api/rooms/addroom',{room: room});
      console.log(res);
      Swal.fire('Congratulations!!!', 'Room Added Sucessfully', 'success').then(res => {
        window.location.reload();
      })

    }catch(err){
      console.log(err);
    }
  }


  return (<div className = "row">

    <div className = "col-md-5">

      
<form>
  <div class="form-group">
    <label>Room Name</label>
    <input value ={roomName} onChange = {(e)=>{setRoomName(e.target.value)}} type="text" style = {{margin : '20px'}} class="form-control" placeholder="Enter Room Name"/>
    
  </div>
  <div class="form-group">
    <label >Description</label>
    <textarea value = {description} onChange = {(e)=>{setDescription(e.target.value)}}className ="form-control" style = {{margin : '20px'}} rows="4"  placeholder="Description"/>
  </div>
  
  <div class="form-group">
    <label >Rent Per Day</label>
    <input value = {rentPerDay} onChange = {(e)=>{setRentPerDay(e.target.value)}} type="text" class="form-control" style = {{margin : '20px'}} placeholder="Rent Per Day"/>
  </div>
  <div class="form-group">
    <label >Max Count</label>
    <input value = {maxCount} onChange={(e)=>{setMaxCount(e.target.value)}} type="text" class="form-control" style = {{margin : '20px'}}  placeholder="Max Count"/>
  </div>
  <div class="form-group">
    <label > Room Type</label>
    <input value = {type} onChange={(e)=>{setType(e.target.value)}} class="form-control" style = {{margin : '20px'}} placeholder="Room Type"/>
  </div>

  <div class="form-group">
    <label >Phone Number</label>
    <input value = {phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}} type="text" class="form-control" style = {{margin : '20px'}} placeholder="Phone Number"/>
  </div>

  <div class="form-group">
    <label >Image URL 1</label>
    <input value = {imageUrl1} onChange={(e)=>{setImageUrl1(e.target.value)}} type="text" class="form-control" style = {{margin : '20px'}} placeholder="Image URL 1"/>
  </div>

  <div class="form-group">
    <label >Image URL 2</label>
    <input value = {imageUrl2} onChange={(e)=>{setImageUrl2(e.target.value)}} type="text" class="form-control" style = {{margin : '20px'}} placeholder="Image URL 2"/>
  </div>

  <div class="form-group">
    <label >Image URL 3</label>
    <input value = {imageUrl3} onChange={(e)=>{setImageUrl3(e.target.value)}} type="text" class="form-control" style = {{margin : '20px'}}  placeholder="Image URL 3"/>
  </div>


  
</form>

<button class="btn btn-primary" style = {{margin : '20px',backgroundColor: "black"}} onClick={addRoom}>Add Room</button>


    </div>

  </div>
    )
}