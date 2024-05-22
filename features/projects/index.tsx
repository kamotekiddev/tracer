import ProjectsNavigation from "./ProjectsNavigation";
import ProjectsTable from "./ProjectsTable";

function Projects() {
    return (
        <div className="grid grid-rows-[auto_1fr] gap-4">
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">Projects</h1>
                <div className="flex gap-4 border-b">
                    <ProjectsNavigation />
                </div>
            </div>
            <ProjectsTable />
        </div>
    );
}

export default Projects;
