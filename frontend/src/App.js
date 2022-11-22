import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import './index.css'

const App = () => {
  return (
    //This template to create as many webpages as you want
    //Each Route is a specific webpage and they call 
    //The respective file that has all webpage info
    <BrowserRouter>
      <Routes>
        {/* Home is for landing page of unauth users */}
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;