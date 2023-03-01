import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../state';
import { useProjects } from './projectHooks';
import ProjectList from './ProjectList';
import { loadProjects } from './state/projectActions';
import { ProjectState } from './state/projectTypes';

function ProjectsPage() {
  // const {
  //   data,
  //   isLoading,
  //   error,
  //   isError,
  //   isFetching,
  //   page,
  //   setPage,
  //   isPreviousData,
  // } = useProjects();

  const loading = useSelector(
    (appState: AppState) => appState.projectState.loading
  );

  const projects = useSelector(
    (appState: AppState) => appState.projectState.projects
  );

  const  currentPage = useSelector(
    (appState: AppState) => appState.projectState.page
  );
  const error = useSelector(
    (appState: AppState) => appState.projectState.error
  );

  const dispatch=useDispatch<ThunkDispatch<ProjectState,any,AnyAction>>()

  useEffect(()=> {
    dispatch(loadProjects(currentPage +1))

  },[dispatch])

  return (
    <>
      <h1>Projects</h1>

      {projects? (
        <>
          {loading ? <span className="toast">Refreshing...</span>:null}
          <ProjectList projects={projects} />
          <div className="row">
            <div className="col-sm-4">Current page: {currentPage}</div>
            <div className="col-sm-4">
              <div className="button-group right">
                <button
                  className="button "
                 onClick={() => dispatch(loadProjects(currentPage-1))}
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
                <button
                  className="button"
                   onClick={() => {
                    dispatch(loadProjects(currentPage+1))
                   }}
                  disabled={currentPage == 10}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : loading ? (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      ) : error ? (
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
      ) : null}
    </>
  );
}

export default ProjectsPage;