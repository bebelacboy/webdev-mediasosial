import { useNavigate } from "react-router-dom";
import axios from "axios";


const Navbar = ({username}) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.delete("http://localhost:5000/auth/logout");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (<nav
    className="flex-no-wrap relative flex w-full items-center justify-between bg-blue-900 py-4 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start"
    data-te-navbar-ref>
    <div className="flex w-full flex-wrap items-center justify-between px-6">
      <h1 className="font-bold text-xl text-white">RISTEK Medsos</h1>
      <div className="flex">
        <a
            className="text-gray-100 font-semibold text-lg"
            href="#"
            aria-expanded="false">
          {username}
        </a>
        <button onClick={logout} className="ml-3 text-sm font-semibold text-gray-200 bg-black p-2 rounded-lg">Logout</button>
      </div>
          
    </div>
  </nav>);
}

export default Navbar;