import './App.css';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
    return (<div className="App" >

        <Navbar />
        <BrowserRouter>

            <Routes>


              

                <Route path="/home" exact element={< Homescreen />} />

                <Route path='/book/:roomid/:fromdate/:todate' exact element={< Bookingscreen />} />

                <Route path='/login' exact element={< Loginscreen />} />

                <Route path='/register' exact element={< Registerscreen />} />

                <Route path='/profile' exact element = {<Profilescreen/>} />

                <Route path='/admin' exact element = {<Adminscreen/>} />

                <Route path = '/' exact element = {<Landingscreen/>} />
            </Routes>

        </BrowserRouter>
    </div>
    );
}

export default App;