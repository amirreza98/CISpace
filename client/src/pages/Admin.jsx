// Admin.jsx
import { useState } from 'react';
import axios from 'axios';

function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('token', res.data.token);
      // navigate to /admin/dashboard
    } catch (err) {
      alert('ورود ناموفق');
    }
  };

  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} className='bg-amber-400'/>
      <input value={password} type="password" onChange={e => setPassword(e.target.value)} className='bg-amber-400' />
      <button onClick={handleLogin} className='bg-amber-700'>ورود</button>
    </div>
  );
}

export default Admin;