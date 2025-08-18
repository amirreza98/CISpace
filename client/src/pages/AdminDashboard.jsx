import { useEffect, useState } from 'react';
import api from '../api/api';

export default function AdminDashboard() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get('/admin/reservations');
    setList(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const approve = async (id) => {
    await api.put(`/admin/reservations/${id}/approve`);
    load();
  };
  const reject = async (id) => {
    await api.put(`/admin/reservations/${id}/reject`);
    load();
  };
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">loading ... </p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-emerald-900">Reservation List</h2>
        <button 
          onClick={logout} 
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Log Out
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-emerald-900 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Seats</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map(r => (
              <tr key={r._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{r.seat}</td>
                <td className="px-4 py-2">{r.email}</td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-lg text-sm ${
                    r.status === 'approved' ? 'bg-green-100 text-green-700' :
                    r.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button 
                    onClick={()=>approve(r._id)} 
                    disabled={r.status==='approved'}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-lg disabled:opacity-40"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={()=>reject(r._id)} 
                    disabled={r.status==='rejected'}
                    className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg disabled:opacity-40"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
