import React, { SyntheticEvent, useState } from 'react';
import { Project } from './Project';

import PropTypes from 'prop-types';
import { useSaveProject } from './projectHooks';

interface ProjectFormProps {
  project: Project;
  
  onCancel: () => void;
}

interface Error {
  name: string;
  description: string;
  budget: string;
}
function ProjectForm({
  project: initialProject,
  onCancel,
  
}: ProjectFormProps) {
  const [project, setProject] = useState(initialProject);
  const [error, setError] = useState<Error>({
    name: '',
    description: '',
    budget: ''
  });

  const { mutate: saveProject, isLoading } = useSaveProject();

  const validate = (project: Project) :Error=> {
    
    const { name, description, budget } = project;
    let err:Error={name:'',description:'',budget:
  ""}
  
    if ( name.length === 0) {
      err.name = 'name is required';
    }
    if ( name.length > 0 && name.length < 3) {
      error.name = 'name must greater than 3 characters';
    }

    if (  description.length === 0) {
      err.description = 'description is required';
    }
    if (budget === 0) {
      err.budget = 'budget must be greater than 0$';
    }
    return err
  };
  const isValid = () => {
    return (
      error.name.length == 0 &&
      error.description.length === 0 &&
      error.budget.length == 0
    );
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    console.log("error", error)
     if(!isValid()) return ;
     saveProject(project)
   
  };

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;

    let updatedValue;

    updatedValue = type === 'checkbox' ? checked : value;

    if (type === 'number') {
      updatedValue = Number(value);
    }

    let changed = {
      [name]: updatedValue
    };

    let  updatedProject:Project; ;

    setProject((previoousProject) => {
       updatedProject = new Project({ ...previoousProject, ...changed });

      return updatedProject;
    });
  
    setError(()=>validate(updatedProject))
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      {isLoading && <span className="toast">Saving...</span>}
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={project.name}
        onChange={handleChange}
      />
      {
        error.name.length > 0 && 
        <div className="card error">
          <p>{error.name}</p>
        </div>
      }

      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
      />
       {
        error.description.length > 0 && 
        <div className="card error">
          <p>{error.description}</p>
        </div>
      }

      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
      />
       {
        error.budget.length > 0 && 
        <div className="card error">
          <p>{error.budget}</p>
        </div>
      }

      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange}
      />

      <div className="input-group">
        <button className="primary bordered medium" type="submit">
          Save
        </button>
        <span />
        <button
          type="button"
          className="bordered medium"
          onClick={() => {
            onCancel();
          }}
        >
          cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
