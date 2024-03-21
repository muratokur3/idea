const express = require("express");
const router = express.Router();
const ProjectChema = require("../models/Project");
const UserChema = require("../models/User");

//yeni proje oluşturur
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

//projeyi günceller
router.put("/ubdateProject", async (req, res) => {
  try {
    const projectId = req.body.projectId;
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

//id ye göre projeyı getirir
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

//id ye göre projeyı günceller
router.put("/:id", async (req, res) => {
  if (!(await ProjectChema.findById(req.params.id))) {
    return res.status(404).send("project not found");
  }
  const projectId = req.params.id;
  const updates = req.body;
  try {
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

//id ye göre projeyı siler
router.delete("/:id", async (req, res) => {
  if (!(await ProjectChema.findById(req.params.id))) {
    return res.status(404).json("project not found");
  }
  try {
    const projectId = req.params.id;
    const project = await ProjectChema.findByIdAndDelete(projectId);
    res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
