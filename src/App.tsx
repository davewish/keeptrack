import React from 'react';

import './App.css';
import ProjectPage from './projects/ProjectPages';
import { MOCK_PROJECTS } from './projects/MockProjects';

function App() {
  return (
    <div className="container">
      <ProjectPage/>
      <pre>{JSON.stringify(MOCK_PROJECTS,null,'')}</pre>

    </div>
  );
}

export default App;
