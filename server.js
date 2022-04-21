const express = require('express');
const db = require('./db')
const app = express();
const path = require('path');
//routes
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())

app.use('/api/rooms',roomsRoute);
app.use('/api/users',usersRoute);
app.use('/api/bookings',bookingsRoute);

app.use(express.json());

if(process.env.NODE_ENV === 'production'){

    app.use('/',express.static('client/build'));
    app.get('*',(req,res) => {

        res.sendFile(path.resolve(__dirname,'client/build/index.html'));
    })

}

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('server started successfully');
}) 