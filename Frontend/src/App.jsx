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
import UpdateNews from "./pages/UpdateNews";

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
        {user && user.isAdmin && <Route path="/create-news" element={<CreateNews />} />}
        {user && user.isAdmin && <Route path="/updatenews" element={<UpdateNews/>} />}
        
        
        <Route path="*" element = {<NotFound/>}/>
      </Routes>
      </>

  );
};

export default App;
