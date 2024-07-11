import { redirect } from "react-router-dom";
import { Projects, Tasks } from "../../data/projectdata";

export const projectActions = async ({ request }) => {
  try {
    const formData = await request.formData();
    console.log("Form data:", formData.get("projectName"));
    console.log("Type", formData.get("type"));
    const { type, projectName, projectId } = Object.fromEntries(formData);

    console.log("ProjectId", projectId);
    console.log("ProjectName", projectName);
    console.log("method:", request.method);
    switch (type) {
      case "create-project": {
        Projects.push({
          ProjectId: Math.floor(Math.random() * 10000) + 20,
          ProjectName: projectName,
        });
        return redirect(`/project/${Projects[Projects.length - 1].ProjectId}`);
      }

      case "update-project": {
        const project = Projects.find(
          (project) => project.ProjectId === parseInt(projectId)
        );
        project.ProjectName = projectName;
        console.log("Updated project:", project);
        return redirect(`/project/${projectId}`);
      }

      case "delete-project": {
        const index = Projects.findIndex(
          (project) => project.ProjectId === parseInt(projectId)
        );
        // and remove all tasks associated with the project
        Tasks.filter((task) => task.ProjectId === parseInt(projectId));
        Projects.splice(index, 1);
        return redirect("/");
      }

      default:
        break;
    }
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
