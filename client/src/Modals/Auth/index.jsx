import { useDispatch, useSelector } from "react-redux";
import { setAuthPage } from "../../redux/slices/UiSlice";
import Login from "./Login";
import Register from "./Register";
import { Button,Fade } from "@mui/material";
import image from "../../assets/backgroundimage.jpg";
import "./auth.scss";
const Auth = () => {
  const dispatch = useDispatch();
  const authItem = useSelector((state) => state.ui.authItem);
  const authPage = useSelector((state) => state.ui.authPage);
  return (
    <div id="auth-container" style={{display:authPage?"flex":"none"}}>
      <div id="modal-overlay" onClick={() => dispatch(setAuthPage(false))}></div>
      <div id="auth-center-box">
      {authItem=="register" && <Register /> }
      <img src={image}/>
      {authItem=="login" && <Login /> }

       <Button
          className="close-login-page"
          onClick={() => dispatch(setAuthPage(false))}
          transitioncomponent={Fade}
        >
          X
        </Button>
      </div>
     
    </div>
  );
  
};

export default Auth;
