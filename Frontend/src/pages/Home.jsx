import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import Navbar from "../components/Navbar";



export default function NewsApp() {

  const [newsData, setNewsData] = useState([]);

  const{user} = useContext(UserContext)

  useEffect(()=>{

    axios.get("http://localhost:3000/api/news")
    .then((res)=>{
      setNewsData(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })

  },[])

  return (
   <div>
     <div className="bg-gray-100 text-gray-900 font-sans min-h-screen flex flex-col">
     

      {/* Main content */}
      <main className="flex-grow max-w-5xl mx-auto px-4 py-6 w-full">
        {user && <h1 className="text-center text-2xl font-bold text-slate-800">Welcome {user.name}</h1>}
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
          Top Headlines
        </h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map(({ id, title, description, image, url }) => (
            <article
              key={id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >

              <img
                src={image}
                alt={`News ${id}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
                <p className="text-gray-600 flex-grow line-clamp-3">{description}</p>
                <a
                  href={url}
                  className="mt-4 text-blue-600 hover:underline font-semibold"
                >
                  Read more
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner p-4 text-center text-gray-600 text-sm">
        &copy; 2024 NewsApp. All rights reserved.
      </footer>
    </div>
   </div>
  );
}

