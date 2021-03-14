// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { validateProjectId, validateProject } = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get();
        res.json(projects);
    } catch(err) { next(err) }
})

router.get('/:id', validateProjectId, (req, res, next) => {
    res.json(req.projectAtId);
    next();
})

router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body);
        res.status(201).json(newProject);
    } catch(err) { next(err) }
})

router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);
        res.json(updatedProject);
    } catch(err) { next(err) }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        const deleted = await Projects.remove(req.params.id);
        res.json(deleted);
    } catch(err) { next(err) }
})

////////////////////////

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const projectActions = await Projects.getProjectActions(req.params.id);
        res.json(projectActions);
    } catch(err) { next(err) }
})

module.exports = router