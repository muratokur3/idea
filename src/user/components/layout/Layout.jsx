import Home from "../home/Home"
import Sidebar from "./Sidebar"
import "./scss/layout.scss"
const Layout = () => {
  return (
    <div id="layout-container">
        <Sidebar/>
        <div id="layout-content">
          <Home/>
       
        </div>
    </div>
  )
}

export default Layout