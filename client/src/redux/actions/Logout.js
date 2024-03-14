import axios from '../../../axiosConfig';
import { useDispatch } from "react-redux";
import { setLogin, setUser } from "../slices/AuthSlice";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Logout = async () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logutActions = async () => {
    try {
      await axios.get(`${apiUrl}/api/auth/logout`);
      localStorage.clear();
      dispatch(setLogin(false));
      dispatch(setUser({}));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return logutActions;
};

export default Logout;
