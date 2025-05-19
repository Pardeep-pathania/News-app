import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userdata = JSON.parse(localStorage.getItem('userdata'));
        const header = { Authorization: `Bearer ${userdata.token}` };

        const response = await axios.get('http://localhost:3000/api/users', { headers: header });
        setUsers(response.data.users);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchUsers();
  }, []);

  const makeAdmin = async (userId) => {
    try {
      const userdata = JSON.parse(localStorage.getItem('userdata'));
      const header = { Authorization: `Bearer ${userdata.token}` };

      const response = await axios.put(
        `http://localhost:3000/api/users/make-admin/${userId}`,
        {},
        { headers: header }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAdmin: true } : user
        )
      );
      console.log('User promoted to admin:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg font-sans">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h1>
      <Link
        to="/create-news"
        className="block mx-auto mb-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-md transition-colors duration-300"
      >
        Create News
      </Link>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="space-y-6">
        {users.map(({ _id, name, email, isAdmin }) => (
          <div key={_id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{name}</h2>
              <p className="text-gray-600 mb-4">{email}</p>
              <p className={`text-sm ${isAdmin ? 'text-green-600' : 'text-red-600'}`}>
                {isAdmin ? 'Admin' : 'User'}
              </p>
              <div className="flex gap-4">
                {!isAdmin && (
                  <button
                    onClick={() => makeAdmin(_id)}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-md transition-colors duration-300"
                  >
                    Make Admin
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
