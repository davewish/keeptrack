import React from 'react';

import './App.css';
import ProjectPage from './projects/ProjectPages';
import { MOCK_PROJECTS } from './projects/MockProjects';
import Hello from './Hello';
import Button from './Button';
import ProjectList from './projects/ProjectList';

function App() {
  return (
    <div className="container">
      <ProjectPage/>
      <ProjectList projects={MOCK_PROJECTS}/>
      

    </div>
  );
}

export default App;
