import "./scss/home.scss"
import ListPost from './ListPost'
import NewPost from './NewPost'
const Home = () => {
  return (
    <div id="home-container">
       <div id="filter">
        <h3>Tümü</h3>
        <h3>Bana Özel</h3>
        </div>
      <NewPost/>
      <ListPost/>
    </div>
  )
}

export default Home