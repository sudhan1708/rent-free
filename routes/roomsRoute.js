 const express = require('express');
 const router = express.Router();

 const Room = require('../models/room');

router.get('/getallrooms',async(req,res)=>{

    try{
        const rooms = await Room.find({});
        res.send(rooms);

    }catch(err){
        return res.status(400).json({message : err});
    }
});


router.post('/getroombyid',async(req,res)=>{

    
    try{

        const room = await Room.findOne({_id: req.body.roomid});
        res.send(room);

    }catch(err){
        return res.status(400).json({message : err});
    }
})


router.post('/addroom',async(req,res)=>{

    const room = req.body.room;
    //console.log(room);
    try{
        
        const newRoom = new Room({
            name :room.roomName,
            maxcount : room.maxCount,
            phonenumber : room.phoneNumber,
            rentperday : room.rentPerDay,
            imageurls: room.imageUrls,
            description : room.description,
            type : room.type

        }) 
        
       
        await newRoom.save();

        res.send('Room Added Successfully');
    }catch(err){
        console.log(err);
        return res.status(400).json({err:err});
    }
})


module.exports = router;
