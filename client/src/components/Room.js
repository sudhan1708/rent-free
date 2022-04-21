import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import {Link} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration : 1000
});
function Room({ room ,fromdate,todate}) {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs" data-aos="flip-up" >
      <div className="col-md-5" >
        <img src={room.imageurls[0]} alt="iamge" className="smallimg" />
      </div>

      <div className="col-md-7 ">
        <h1>{room.name} </h1>
        <p>
          {" "}
          <b>Max Count : </b>
          {room.maxcount}{" "}
        </p>
        <p>
          {" "}
          <b> Phone Number : </b> {room.phonenumber}{" "}
        </p>
        <p>
          {" "}
          <b> Type : </b> {room.type}{" "}
        </p>

        
        <div>

         {fromdate && todate && (

<Link to ={`/book/${room._id}/${fromdate}/${todate}`} >

<button
    style={{
      float: "right",
      backgroundColor: "black",
      marginLeft: "10px",
    }}
    className="btn btn-primary"

  >
    {" "}
    Book Now
  </button>

</Link>
         )}

          <button
            style={{ float: "right", backgroundColor: "black" }}
            className="btn btn-primary"
            onClick={handleShow}
          >
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Carousel>
            {room.imageurls.map((imageurl) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100" src={imageurl} alt="img" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p style={{ margin: "20px" }}>
            <b> {room.description} </b>
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
