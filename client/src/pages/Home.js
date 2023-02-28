import Post from "../components/Post";
import PostList from "../components/PostList";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "../components/Navbar";

const Home = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [expireToken, setExpireToken] = useState('');
  const [postList, setPostList] = useState([]);
  const [newPost, setNewPost] = useState('');

  const navigate = useNavigate();

  const axiosJwt = axios.create();

  axiosJwt.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expireToken * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:5000/auth/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUsername(decoded.name);
      setExpireToken(decoded.exp);
    }
    return config;
  });

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUsername(decoded.username);
      setExpireToken(decoded.exp);
    } catch (err) {
      if (err.response) navigate("/");
    }
  }

  const getPostList = async () => {
    const response = await axiosJwt.get("http://localhost:5000/post", {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    setPostList(response.data);
  }
 
  useEffect(() => {
    refreshToken();
  }, []);

  const addPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosJwt.post('http://localhost:5000/post', {
        headers: {
          authorization: `Bearer ${token}`
        },
        user: username,
        content: newPost
      });
      console.log(response.data);
      setPostList(response.data);
    } catch (err) {
      console.log(err)
    }
    }

  return (
  <>
      <Navbar username={username} />
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white m-4 w-full lg:w-3/4 xs:w-4/5">
          <div className="mb-4">
              <h1 className="text-blue-600 text-3xl font-bold">Welcome! @{username}</h1>
              <div className="mt-4">
                <form className="flex" onSubmit={addPost}>
                  <input required value={newPost} onChange={(e) => setNewPost(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker h-40" placeholder="Share your thoughts.."/>
                  <button type="submit" className="p-1 border-2 rounded font-bold bg-sky-500 text-white text-xl border-teal hover:text-black hover:bg-white w-28 h-14">Add</button>
                </form>
              </div>
          </div>
          <button className="flex mx-auto font-semibold text-lg mb-3 hover:text-gray-600" onClick={getPostList}>Load Posts</button>
          <PostList postList={postList}/>
        </div>
      </div>
</>);
};

export default Home;