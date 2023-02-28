import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/user', {
        username, password, confPassword
      });
      
      navigate("/");
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
    
  }

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
        <h1 className="text-center text-black text-4xl font-bold mt-9">Create Account</h1>
        <div className="text-center text-blue-600 mt-10"><a href='/'>Login if you already have account</a></div>
        <form onSubmit={registerUser} className="p-12">
          <div className="text-lg mb-6 md:mb-8">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="username">
              Username
            </label>
            <input required type="text" id="username" className="bg-gray-200 px-10 py-2 md:py-4 focus:outline-none w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="text-lg mb-6 md:mb-8">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="password">
              Password
            </label>
            <input required type="password" id="password" className="bg-gray-200 px-10 py-2 md:py-4 focus:outline-none w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="text-lg mb-6 md:mb-8">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="confPassword" >
              Confirm Password
            </label>
            <input required type="password" id="confPassword" className="bg-gray-200 px-10 py-2 md:py-4 focus:outline-none w-full" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
          </div>
          <button className="rounded-md bg-gradient-to-b from-gray-800 to-gray-900 font-medium p-2 md:p-4 text-white w-full">Sign Up</button>
          <p className='text-center mt-4 text-red-500'>{errMsg}</p>
        </form>
      </div>
      </div>
  );
}

export default RegisterForm;