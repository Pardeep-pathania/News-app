import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateNews = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [imageUrl,setImageUrl] = useState(state?.image?.imageUrl)
  const [image, setImage] = useState(null)

  const [formData, setFormData] = useState({
    title: state?.title || '',
    description: state?.description || '',
  })

  const userdata = JSON.parse(localStorage.getItem("userdata"))

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }


  const handleImageChange =(e)=>{
    const file = e.target.files[0];
    if(file){
      const tempUrl = URL.createObjectURL(file);
      setImageUrl(tempUrl);
    }
    setImage(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!userdata || !userdata.token) {
      alert("You must be logged in as admin to update news.")
      return
    }
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Title and Description are required fields!")
      return
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      author: userdata.existingUser._id 
    }

    const header = {
      Authorization: `Bearer ${userdata.token}`
    }

   let formdata = new FormData();
   formdata.append("title", formData.title);
   formdata.append("description", formData.description); 
    formdata.append("image", image);

    axios.put(`http://localhost:3000/api/news/update/${state._id}`, formdata, { headers: header })
      .then((res) => {
        console.log(res)
        alert("News updated successfully!")
        navigate('/admindashboard') 
      })
      .catch((err) => {
        console.log(err.response || err.message)
        alert(err.response?.data?.message || "Failed to update news")
      })
  }


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Update Your News</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter news title"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter news description"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
            Image URL
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL (optional)"
          />
          <img
          className='h-30 mt-2 rounded-lg' src={imageUrl} alt="" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-300"
        >
          Update News
        </button>
      </form>
    </div>
  )
}

export default UpdateNews

 