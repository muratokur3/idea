import { useDispatch, useSelector } from "react-redux";
import { setAuthPage } from "../../redux/slices/UiSlice";
import Login from "./Login";
import Register from "./Register";
import { Button, Fade } from "@mui/material";
import "./auth.scss";
const Auth = () => {
  const dispatch = useDispatch();
  const authItem = useSelector((state) => state.ui.authItem);
  const authPage = useSelector((state) => state.ui.authPage);

  return (
    <div id="auth-container" style={{ display: authPage ? "flex" : "none" }}>
      <div
        id="modal-overlay"
        onClick={() => dispatch(setAuthPage(false))}
      ></div>
      <div
        id="auth-center-box"
        style={{
          background:
            `linear-gradient(to ${authItem=== "login"?"left":"right"},rgb(114, 112, 112),rgb(94, 92, 92),rgb(60, 58, 58),rgb(33, 32, 32))`,
        }}
      >
        {authItem == "register" && <Register />}
        <img src={"https://picsum.photos/1080/720?random=1"} />
        {authItem == "login" && <Login />}

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
