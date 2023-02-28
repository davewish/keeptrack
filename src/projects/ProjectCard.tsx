
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Project } from "./Project"


interface ProjectCardProps {
    project:Project,
    onEdit:(project:Project)=>void
}

function ProjectCard({project ,onEdit}:ProjectCardProps) {


    function getDescription(description:string) {
        return description.substring(0,60) + "..."
 }

 

return (
    <div className="card">
    <img src={project.imageUrl
    } alt={project.name
    }
    />
    <section className="section dark">
    <Link to={'/projects/' + project.id}>
        <h5 className="strong">
            {project.name}
        </h5>
        <p>{getDescription(project.description)}</p>
        <p> Budget: {project.budget.toLocaleString()}</p>
        </Link>

        <button className="bordered" onClick={()=>onEdit(project)
        }>
            <span className="icon-edit"></span>
            Edit
        </button>

    </section>
        
         </div>
)
    
}



export default ProjectCard