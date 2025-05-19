

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [newsList, setNewsList] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userdata = JSON.parse(localStorage.getItem('userdata'));
        const header = { Authorization: `Bearer ${userdata.token}` };

        // Fetch news
        const newsResponse = await axios.get('http://localhost:3000/api/news/mynews', { headers: header });
        setNewsList(newsResponse.data);

        // Fetch users
        const usersResponse = await axios.get('http://localhost:3000/api/users', { headers: header });
        setUsers(usersResponse.data.users);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchData();
  }, []);

  function deleteNews(id) {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const header = { Authorization: `Bearer ${userdata.token}` };
    axios.delete(`http://localhost:3000/api/news/delete/${id}`, { headers: header })
      .then((res) => {
        console.log(res);
        setNewsList(newsList.filter((news) => news._id !== id));
      }
      )
      .catch((err) => { 
        console.log(err.response || err.message);
      });
  }

  const handleMakeAdmin = async (userId) => {
    try {
      const userdata = JSON.parse(localStorage.getItem('userdata'));
      const header = { Authorization: `Bearer ${userdata.token}` };

      await axios.put(
        `http://localhost:3000/api/users/make-admin/${userId}`,
        {},
        { headers: header }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAdmin: true } : user
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg font-sans">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h1>
      <Link
        to="/create-news"
        className="block mx-auto mb-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-md transition-colors duration-300"
      >
        Create News
      </Link>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="space-y-6">
        {/* News Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">News List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsList.map(({ _id, title, description, image }) => (
              <div key={_id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
                  <p className="text-gray-600 mb-4 flex-grow">{description}</p>
                  <div className="flex gap-4 mt-4">
                    <Link to={'/updatenews'} state={{_id, title, description, image }}
                      className=" text-center flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-300"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => deleteNews(_id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Users Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Management</h2>
          <div className="space-y-4">
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
                        onClick={() => handleMakeAdmin(_id)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
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
      </div>
    </div>
  );
};

export default AdminDashboard;
