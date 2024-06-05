import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from './components/header/Header'
import Home from './components/home/Home'
import About from './components/about/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
