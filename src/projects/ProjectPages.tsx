import { MOCK_PROJECTS } from "./MockProjects";

function ProjectPage() {
    return <pre>{JSON.stringify(MOCK_PROJECTS)}</pre>
}

export default ProjectPage;