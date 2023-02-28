import { useEffect, useState } from 'react';
import { MOCK_PROJECTS } from './MockProjects';
import { Project } from './Project';
import ProjectList from './ProjectList';

import { ProjectAPI } from './ProjectAPI';

function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  async function loadProjects() {
    setLoading(true);
    try {
      const data = await ProjectAPI.get(currentPage);
      setError('');
      if (currentPage == 1) {
        setProjects(data);
      } else {
        setProjects((previousProject) => [...previousProject, ...data]);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, [currentPage]);

  const saveProject = async (project: Project) => {
   
   try {
    const updatedProject=await ProjectAPI.put(project);
    const updatedProjects=projects.map((pr:Project)=> {
      return pr.id===updatedProject.id ? updatedProject:pr

    })

    setProjects(updatedProjects)

   }
   catch(error:any){
    if(error instanceof Error) {
      setError(error.message)
    }

   }

  };

  const handleMoreClick = () => {
      setCurrentPage((currentPage) => currentPage + 1);
    };

  return (
    <>
      <h1>Projects</h1>

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <ProjectList projects={projects} saveProject={saveProject} />

      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loadig ....</p>
        </div>
      )}
    </>
  );
}

export default ProjectPage;
