import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateWorkorder from './pages/CreateWorkorder';
import Clients from './pages/Clients';
import Workorders from './pages/Workorders'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
    <Router>
    <div className='container main'>
      <Header />
      <Routes>
        <Route path='/' exact element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/create-workorder' element={<CreateWorkorder/>}/>
        <Route path='/workorders' element={<Workorders/>}/>
        <Route path='/clients' element={<Clients/>}/>
      </Routes>
      <Footer/>
    </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
