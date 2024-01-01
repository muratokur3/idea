import { Button, TextField } from "@mui/material"
import './scss/login.scss'
const Login = () => {
  return (
    <div id="login-container">
      <div id="login-center-box">
        <form>
        <TextField id="standard-basic" label="Kullanıcı Adı" variant="standard" />
        <TextField id="standard-basic" type="password" label="Şifre" variant="standard" />
        <Button variant="outlined">Giriş Yap</Button>
        </form>
      </div>
    </div>
  )
}

export default Login