
import React, {useEffect,useState} from 'react'
import axios from 'axios';
import Room from '../components/Room'
import Loader from '../components/Loader'
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css'; 
import Error from '../components/Error';

;
const { RangePicker } = DatePicker;

function Homescreen() {
    const [rooms,setrooms] = useState([]);
    const [loading,setloading] = useState();
    const [error, seterror] = useState();
    const [fromdate,setfromdate] = useState();
    const [todate, settodate] = useState();
    const [duplicaterooms,setduplicaterooms] = useState([]);
    const [searchKey,setSearchKey] = useState('');
    const [type,setType] = useState('All');

    function filterByDate(date) {

        console.log(date[0].format('DD-MM-YYYY'));

        setfromdate(date[0].format('DD-MM-YYYY'));
        settodate(date[1].format('DD-MM-YYYY'));

        var available = false;
        var temp = [];
        for(const room of duplicaterooms){

            if(room.currentbookings.length > 0){
                
                for(const booking of room.currentbookings){
                    

                    if(!(moment(moment(date[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate)) && 
                    
                    !(moment(moment(date[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate))) 
                    {


                        if(
                            moment(date[0]).format('DD-MM-YYYY')!==booking.fromdate &&
                            moment(date[0]).format('DD-MM-YYYY')!==booking.todate &&
                            moment(date[1]).format('DD-MM-YYYY')!==booking.fromdate &&
                            moment(date[1]).format('DD-MM-YYYY')!==booking.todate
                            
                            )
                            
                            {
                                available = true;
                            }
                    }
                    
                    
                    
                }
            }

            if(available || room.currentbookings.length===0){
                temp.push(room);
            }
        }

        setrooms(temp);

    }


    function filterBySearch(){
        
        const temp = duplicaterooms.filter( (item) =>
        {
           return item.name.toLowerCase().includes(searchKey.toLowerCase());
        })

        setrooms(temp);
    }


    function filterByType(e){
        setType(e);
        if(e!=='All'){

            const temp = duplicaterooms.filter( (item) =>{
                return item.type.toLowerCase()===e.toLowerCase();
            })

            setrooms(temp);
        }else{
            setrooms(duplicaterooms);
        }

       
    }

    useEffect(()=>{

            
            const user = JSON.parse(localStorage.getItem('currentUser'));
            
            fetch();

            async function fetch(){
                try{
                    if(!user){
                        window.location.href = '/login';
                    }
                    setloading(true);
                    const data =  (await axios.get('/api/rooms/getallrooms')).data;
                    setrooms(data);
                    setduplicaterooms(data);
                    setloading(false);
                    seterror(false);
        
                }catch(e){
                    seterror(true);
                    console.log(e);
                    setloading(false);
                }
            }
    
        
    },[])


  return (
    <div className='container'> 
        
        <div className='row justify-content-center mt-5'>

            <div className='col-md-3 bs' style= {{margin:'10px'}}>

            <RangePicker format = 'DD-MM-YYYY' onChange = {filterByDate}/>

            </div>

            
            <div className='col-md-3 bs' style= {{margin:'10px'}}>
                <input type='text' className='form-control' placeholder ='Search here'
                value = {searchKey} onChange = {(e)=>{setSearchKey(e.target.value)}} onKeyUp = {filterBySearch} 
                ></input>               
               
            </div>


            <div className='col-md-3 bs' style= {{margin:'10px'}}>
            <select className='form-control'value={type} onChange={(e)=>{filterByType(e.target.value)}} >
                    <option value='All' >All</option>
                    <option value='Delux'>Delux</option>
                    
                    <option value='Non-Delux'>Non-Delux</option>
                </select>

            </div>
            
          
        </div>
        
        
        <div className='row justify-content-center mt-5'>
            {loading ? <Loader/> : (error ? <Error/> : rooms.map(room =>{
                return <div className = 'col-md-9 mt-5'> 
                    <Room room = {room} fromdate= {fromdate} todate= {todate}/>  
                </div>
            }))}  

            </div>  

    </div>
  )
}

export default Homescreen;