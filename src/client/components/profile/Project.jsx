import ProjectCard from "./ProjectCard"
import './scss/project.scss'
const Project = () => {
  const dizi=[1,2,3,4,5,6,7]
  return (
    <div id="project-container">
      {dizi.map((item,index)=>(
        <ProjectCard key={index}/>
      ))}
    </div>
  )
}

export default Project