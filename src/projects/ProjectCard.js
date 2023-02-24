
import PropTypes from "prop-types"
import { Project } from "./Project"
function ProjectCard({project ,onEdit}) {


    function getDescription(description) {
        return description.substring(0,60) + "..."
 }

 

return (
    <div className="card">
    <img src={project.imageUrl
    } alt={project.name
    }
    />
    <section className="section dark">
        <h5 className="strong">
            {project.name}
        </h5>
        <p>{getDescription(project.description)}</p>
        <p> Budget: {project.budget.toLocaleString()}</p>

        <button className="bordered" onClick={()=>onEdit(project)
        }>
            <span className="icon-edit"></span>
            Edit
        </button>

    </section>
        
         </div>
)
    
}

ProjectCard.propTypes={
    project:PropTypes.instanceOf(Project).isRequired
}

export default ProjectCard