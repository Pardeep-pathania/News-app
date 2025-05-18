import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import CreateNews from "./pages/CreateNews";
import UserContext from "./UserContext";
import NotFound from "./pages/NotFound";

const App = () => {
  const { user, login } = useContext(UserContext);

  let userdata = JSON.parse(localStorage.getItem("userdata"))

  useEffect(()=>{

    login(userdata?.existingUser)

  },[])

  return (
   
      <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {user && user.isAdmin && <Route path="/admindashboard" element={<AdminDashboard/>} />}
        
        <Route path="/create-news" element={<CreateNews />} />
        <Route path="*" element = {<NotFound/>}/>
      </Routes>
      </>

  );
};

export default App;
