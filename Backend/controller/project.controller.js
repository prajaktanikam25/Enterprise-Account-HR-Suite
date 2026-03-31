const Project = require('../model/project.model');

async function getProjectData(queryParams) {
  try {
    if (queryParams.name) {
      var ProjectData = await Project.find({ projectHandleBy: queryParams.name }).sort({ createdAt: -1 })
    }
    else if (queryParams.search) {
      var ProjectData = await Project.find({
        $or: [{ projectTitle: new RegExp(queryParams.search) },
        { projectHandleBy: new RegExp(queryParams.search) },
        { status: new RegExp(queryParams.search) }]
      }).sort({ createdAt: -1 })
    }
    else {
      var ProjectData = await Project.find({}).sort({ createdAt: -1 })
    }
    return ProjectData
  } catch (error) {
    console.log(error)
  }
}

async function addProject(data) {
  try {
    let ProjectModel = new Project(data)
    let ProjectData = await ProjectModel.save(data)
    return ProjectData
  } catch (error) {
    console.log(error)
  }
}

async function updateProject(id, data) {
  try {
    let response = await Project.updateOne({ _id: id }, data)
    return response
  } catch (error) {
    console.log(error)
  }
}

async function findProjectById(id) {
  try {
    var response = await Project.findById(id)
    return response
  }
  catch (error) {
    console.log(error)
  }
}

async function addMilStone(id, expense) {
  try {
    var result = await findProjectById(id);
    if (Object.keys(result).length > 0) {
      result.milestone.push(expense.milestone[0]);
      let response = await Project.updateOne({ _id: id }, result);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateMileStone(milestone) {
  try {
    var result = await findProjectById(milestone.prId);
    if (Object.keys(result).length > 0) {
      var index = result.milestone.findIndex((x) => x.id == milestone.id);
      result.milestone[index] = milestone;
      let response = await Project.updateOne({ _id: milestone.prId }, result);
      return response;
    }
  } catch (err) {
    throw err;
  }
}

async function addTask(id, expense) {
  try {
    var result = await findProjectById(id);
    if (Object.keys(result).length > 0) {
      result.task.push(expense.task[0]);
      let response = await Project.updateOne({ _id: id }, result);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateTask(task) {
  try {
    var result = await findProjectById(task.prId);
    if (Object.keys(result).length > 0) {
      var index = result.task.findIndex((x) => x.id == task.id);
      result.task[index] = task;
      let response = await Project.updateOne({ _id: task.prId }, result);
      return response;
    }
  } catch (err) {
    throw err;
  }
}

async function addIssue(id, expense) {
  try {
    var result = await findProjectById(id);
    if (Object.keys(result).length > 0) {
      result.issue.push(expense.issue[0]);
      let response = await Project.updateOne({ _id: id }, result);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateIssue(issue) {
  try {
    var result = await findProjectById(issue.prId);
    if (Object.keys(result).length > 0) {
      var index = result.issue.findIndex((x) => x.id == issue.id);
      result.issue[index] = issue;
      let response = await Project.updateOne({ _id: issue.prId }, result);
      return response;
    }
  } catch (err) {
    throw err;
  }
}

async function addDependency(id, expense) {
  try {
    var result = await findProjectById(id);
    if (Object.keys(result).length > 0) {
      result.dependency.push(expense.dependency[0]);
      let response = await Project.updateOne({ _id: id }, result);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateDependency(dependency) {
  try {
    var result = await findProjectById(dependency.prId);
    if (Object.keys(result).length > 0) {
      var index = result.dependency.findIndex((x) => x.id == dependency.id);
      result.dependency[index] = dependency;
      let response = await Project.updateOne({ _id: dependency.prId }, result);
      return response;
    }
  } catch (err) {
    throw err;
  }
}

async function deleteProject(ProjectId) {
  try {
    let res = await Project.remove({ _id: ProjectId })
    return res
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProjectData,
  addProject,
  updateProject,
  addMilStone,
  updateMileStone,
  addTask,
  updateTask,
  addDependency,
  updateDependency,
  addIssue,
  updateIssue,
  deleteProject,
}