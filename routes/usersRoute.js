const express = require('express');
const router = express.Router();

const User = require('../models/user');


router.post('/register',async (req,res) => {

    const newUser = new User({name : req.body.name,email : req.body.email,password : req.body.password});

    try{
        const user = await newUser.save();
        res.send('User saved successfully');
    }catch(err) {
        return res.status(404).json({err : err});
       
    }
})


router.post('/login',async (req,res)=>{

    const email = req.body.email;
    const password = req.body.password;

    try{

        const  user = await User.findOne({email: email,password:password});

        if(user){
            
            const temp = {
                name :user.name,
                email :user.email,
                isAdmin :user.isAdmin,
                _id : user._id
            }

            res.send(temp)
        }else{
            return res.status(404).json({message : 'Login Failed'});
        }
    }catch(err) {
        return res.status(404).json({err});
    }
});



router.get('/getallusers',async (req,res)=>{

    try{
        const users = await User.find();
        res.send(users);
    }catch(err){
        return res.status(400).json({err});
    }
})
module.exports =router;
