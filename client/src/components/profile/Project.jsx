import { Button } from "@mui/material"
import ProjectCard from "./ProjectCard"
import './scss/project.scss'
import { useDispatch } from "react-redux"
import { setNewProjectPage } from "../../redux/slices/UiSlice"
const Project = () => {
  const dizi=[1,2,3,4,5,6,7]
  const dispatch = useDispatch()
  return (
    <div id="project-container">
      <Button variant="contained" color="primary" size="large" onClick={()=>dispatch(setNewProjectPage(true))}>Yeni Proje</Button>
      {dizi.map((item,index)=>(
        <ProjectCard key={index}/>
      ))}
    </div>
  )
}

export default Project