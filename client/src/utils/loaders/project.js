import { Projects, Tasks } from "../../data/projectdata";

// utils/loaders/project.js
export const loader = async () => {
  try {
    // convert to json
    const projects = Projects;

    return projects;
  } catch (error) {
    console.error("Error loading projects:", error);
    throw error;
  }
};

export const loadProjectDetails = async (id) => {
  const projectId = parseInt(id, 10);
  try {
    const projects = Projects;
    const project = projects.find((project) => project.ProjectId === projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    const tasks = Tasks.filter((task) => task.ProjectId === projectId);
    return { project, tasks };
  } catch (error) {
    console.error("Error loading project:", error);
    throw error;
  }
};
