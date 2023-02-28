

import PropTypes from "prop-types"
import { useState } from "react";
import { Project } from "./Project"
import ProjectCard from "./ProjectCard"
import ProjectForm from "./ProjectForm"

interface ProjectListProps {
    projects:Project[];
   


}

function ProjectList({projects}:ProjectListProps) {
 const [projectBeingEdited ,setProjectBeingEdited]=useState({});


 const handleEdit=(project:Project)=>{
 setProjectBeingEdited(project)
 }

 const handleCancel=()=> {
    setProjectBeingEdited({})
 }

 const handleSave=(project:Project)=> {
 
 }

    return (
        <div className="row">
            {
                projects.map(project=> <div key={project.id} 
                className="col-sm">
                    {
                        project===projectBeingEdited ?
                        <ProjectForm  project={project} onCancel={handleCancel} /> :
                        <ProjectCard project={project } onEdit={handleEdit}></ProjectCard>

                    }
 </div>)
            }

        </div>
    )

}
ProjectList.propTypes={
    projects:PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired

}
export default ProjectList