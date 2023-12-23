import Sidebar from "./Sidebar"
import "./scss/layout.scss"
const Layout = () => {
  return (
    <div id="layout-container">
        <Sidebar/>
        <div id="layout-content">
        <div id="filter">
        <h3>Tümü</h3>
        <h3>Bana Özel</h3>
        </div>
        </div>
    </div>
  )
}

export default Layout