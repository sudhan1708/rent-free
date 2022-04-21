const { response } = require('express');
const express = require('express');
const router = express.Router();
const moment = require('moment');
const stripe = require('stripe')('sk_test_51KiDCCSE56aS4mGRCrrJKO8u6i8hnf1s7m5sqL47adMIezEFEj2mDY2XkNADUJPPNf8bWVsKuBlJbgfm9Xgz1BS700GEnvaMZK')
const Booking = require('../models/booking');
const Room = require('../models/room');


const { v4:  uuidv4 } = require('uuid');

router.get('/getallbookings',async (req,res)=>{

    try{

        const bookings = await Booking.find();
        res.send(bookings);
    }catch(err){
        return res.status(400).json({err: err});
    }
})

router.post('/cancelbooking',async(req,res)=>{
    const bookingid = req.body.bookingid;
    const roomid =req.body.roomid;

    try{
        const bookingObj = await Booking.findOne({_id : bookingid});
        bookingObj.status = 'cancelled';
       // console.log(bookingObj)
      
        await bookingObj.save();
       
        const room = await Room.findOne({_id : roomid});
        console.log(room);
        const currentBookings = room.currentbookings;

        const temp = currentBookings.filter(item =>item.booking.toString()!==bookingid);
        console.log(temp)
        room.currentbookings = temp;
       await room.save();
       res.send('Room cancelled Sucessfully');
    }catch(err){
        return res.status(400).json({err});
    }
})


router.post('/getroomsbyuserid',async (req,res)=>{
    
    const user_id = req.body.userid;
   
    console.log(user_id);
  try{
    const bookings = await Booking.find({userid : user_id});
   
    res.send(bookings);
   
  }catch(err){
    //  console.log(err);
    return res.status(400).json({err});
  }



})

router.post('/bookroom', async (req, res) => {

    const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;

    try
    {

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });


        const payment = await stripe.paymentIntents.create(
            {

            amount: totalamount * 100,
            customer: customer.id,
            currency: 'inr',
            receipt_email: token.email,
           payment_method : token.card.id,
            payment_method_types: ['card'],
            confirmation_method: 'manual',
            confirm: true,
            },
           
            );

            
            
            // console.log(payment);
            // var action = payment.next_action;
            // // console.log(action);
            // if (action.type === 'use_stripe_sdk') {
            //   console.log('redirecting....');
            //   window.location = action.use_stripe_sdk.stripe_js;

            // }

            // const paymentIntent = await stripe.paymentIntents.confirm(
            //     payment.id,
            //     {return_url: 'http://localhost:3000/home'}
            //   );
        
            
            if(payment){


                const newBooking = new Booking(
                    {
                        room: room.name,
                        roomid: room._id,
                        userid: userid,
                        fromdate: moment(fromdate).format('DD-MM-YYYY'),
                        todate: moment(todate).format('DD-MM-YYYY'),
                        totalamount: totalamount,
                        totaldays: totaldays,
                        transactionid: '1234'
                    })

                const booking = await newBooking.save();


                const roomObj = await Room.findOne({
                    _id: room._id,


                })

                roomObj.currentbookings.push({

                    booking: booking._id,
                    fromdate: moment(fromdate).format('DD-MM-YYYY'),
                    todate: moment(todate).format('DD-MM-YYYY'),
                    userid: userid,
                    status: booking.status
                })

                await roomObj.save();
                res.send('Room booked Sucessfully');
            }
            
        

        // res.send('Payment Sucessfull')
    } 
    
    catch (err)
    {
        return res.status(400).json({err});
    }


})

module.exports = router;
