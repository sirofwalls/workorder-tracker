import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Workorder from './pages/Workorder';
import Clients from './pages/Clients';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
    <Router>
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/workorder' element={<Workorder/>}/>
        <Route path='/clients' element={<Clients/>}/>
      </Routes>
    </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
