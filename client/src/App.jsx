import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';


function App() {
  return (
    <BrowserRouter>
        <Routes >
        <Route path="*" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
              <AdminDashboard />
          </ProtectedRoute>
        } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
