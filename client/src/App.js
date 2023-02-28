import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home";
// import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";


export default function App() {
  const [username, setUsername] = useState('');
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="profile" element={<Profile />} /> */}
        <Route exact path="" element={<LoginForm />} />
        <Route exact path="register" element={<RegisterForm />} />
        <Route exact path="home" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

