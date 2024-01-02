import { Button, TextField } from "@mui/material"
import './scss/login.scss'
import { useDispatch } from "react-redux";
import { setLoginPage } from "../../../store/UiSlice";
const Login = () => {
  const dispatch = useDispatch();
  return (
    <div id="login-container">
      <div id="login-center-box">
        <form>
          <h1>Giriş Yap</h1>
        <TextField id="standard-basic" label="Kullanıcı Adı" type="email" variant="standard" />
        <TextField sx={{color:"white"}} id="standard-basic" type="password" label="Şifre" variant="standard" />
        <Button variant="outlined" onClick={()=>dispatch(setLoginPage(true))}>Giriş Yap</Button>
        </form>
        <Button  className='close-login-page' onClick={()=>dispatch(setLoginPage(false))}>X</Button>
      </div>
    </div>
  )
}

export default Login