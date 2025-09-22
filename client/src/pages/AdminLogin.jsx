import { useState } from 'react';
import api from '../api/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword]   = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/admin/login', { username, password });
      localStorage.setItem('token', data.token);
      window.location.href = '/admin';
    } catch {
      setErr('its not correct habibi');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-50">
      <form 
        onSubmit={handleLogin} 
        className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-sm space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-emerald-900">Admin Login</h2>
        <input 
          value={username} 
          onChange={e=>setUsername(e.target.value)} 
          placeholder="username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 outline-none"
        />
        <input 
          value={password} 
          onChange={e=>setPassword(e.target.value)} 
          placeholder="password" 
          type="password" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 outline-none"
        />
        <button 
          type="submit" 
          className="w-full py-2 bg-emerald-900 hover:bg-emerald-700 text-white rounded-lg shadow-md transition"
        >
          Login
        </button>
        {err && <p className="text-center text-red-600 text-sm">{err}</p>}
      </form>
    </div>
  );
}
