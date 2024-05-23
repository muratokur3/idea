const express = require("express");
const router = express.Router();
const ProjectChema = require("../models/Project");

//create a new project
router.post("/createProject", async (req, res) => {
  try {
    const data = await { ...req.body };
    const newProject = await new ProjectChema(data);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

//ubdateing a project
router.put("/ubdateProject", async (req, res) => {
  try {
    const projectId = req.body._id;
    const updates = req.body;
    const ubdadetProject = await ProjectChema.findByIdAndUpdate(
      projectId,
      updates,
      {
        new: true,
      }
    );
    res.status(200).json(ubdadetProject);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//get single project by id
router.get("/:id", async (req, res) => {
  if (!(await ProjectChema.findById(req.params.id))) {
    return res.status(404).json("Project not found");
  }
  try {
    const projectId = req.params.id;
    const project = await ProjectChema.findById(projectId);
    res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});


//delete single project by id
router.delete("/:id", async (req, res) => {
  if (!(await ProjectChema.findById(req.params.id))) {
    return res.status(404).json("project not found");
  }
  try {
    const projectId = req.params.id;
    const project = await ProjectChema.findByIdAndUpdate(projectId, { isDeleted: true }, { new: true });
    res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
