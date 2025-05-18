import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const [newsList, setNewsList] = useState([ ])

  useEffect(()=>{
    const userdata = JSON.parse(localStorage.getItem("userdata"))
    const header = {
      Authorization: `Bearer ${userdata.token}`
    };

    axios.get("http://localhost:3000/api/news/mynews",{headers:header})
      .then((res) => {
        console.log(res)
        setNewsList(res.data)
      })
      .catch((err) => {
        console.log(err.response || err.message)
      })
  },[])


  function deleteNews(id){
    const userdata = JSON.parse(localStorage.getItem("userdata"))
    const header = {
      Authorization: `Bearer ${userdata.token}`
    };

    axios.delete(`http://localhost:3000/api/news/delete/${id}`, {headers:header})
      .then((res) => {
        console.log(res)
        setNewsList(newsList.filter((news) => news.id !== id))
      })
      .catch((err) => {
        console.log(err.response || err.message)
      })
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg font-sans">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h1>
      <Link to={'/create-news'}
        className="block mx-auto mb-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-md transition-colors duration-300"
      >
        Create News
      </Link>
      <div className="space-y-6">
        {newsList.map(({ _id, title, description, image }) => (
          <div key={_id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
              <p className="text-gray-600 mb-4">{description}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleUpdate(_id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-300"
                >
                  Update
                </button>
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
  )
}

export default AdminDashboard

