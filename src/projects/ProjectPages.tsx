import { useState } from 'react';
import { MOCK_PROJECTS } from './MockProjects';
import { Project } from './Project';
import ProjectList from './ProjectList';

function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const saveProject = (project: Project) => {
    const updatedProjects = projects.map((currentProject: Project) => {
      const updatedProject =
        currentProject.id === project.id ? project : currentProject;
      return updatedProject;
    });
    setProjects(updatedProjects);
  };

  return (
    <div>
      <ProjectList projects={projects} saveProject={saveProject} />
    </div>
  );
}

export default ProjectPage;
