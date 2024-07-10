import { redirect, json } from "react-router-dom";
import { Projects, Tasks } from "../../data/projectdata";

export const projectActions = async ({ request }) => {
  try {
    const formData = await request.formData();
    Projects.push({
      ProjectId: Math.floor(Math.random() * 10000) + 20,
      ProjectName: formData.get("projectName"),
    });
    return redirect(`/project/${Projects[Projects.length - 1].ProjectId}`);
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const taskActions = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    console.log("formdata.method", request.method);
    console.log("formData", formData);
    console.log("formdata", request);
    console.log("TaskName", formData.get("taskName"));

    // const projectId = parseInt(params.projectId);
    // const task = {
    //   TaskId: Math.floor(Math.random() * 10000) + 20,
    //   ProjectId: projectId,
    //   TaskName: formData.get("taskName"),
    //   Status: "Pending",
    // };
    // // add task to tasks array
    // Tasks.push(task);
    return json({ success: true });
  } catch (error) {
    console.error("Error creating task:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
};
