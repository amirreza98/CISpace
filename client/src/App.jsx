import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import Admin from './pages/Admin';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
        <Routes >
        <Route path="*" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
