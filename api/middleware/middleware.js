const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

function logger(req, res, next) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeStamp = new Date().toLocaleTimeString('en-US', options);

  console.log(`Request Method: ${req.method}`)
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Timestamp: ${timeStamp}`);
  next();
}

async function validateActionId(req, res, next) {
  try {
    const {id} = req.params;
    const actionAtId = await Actions.get(id);
    if(!actionAtId) {
      res.status(404).json({ message: "action not found" })
    } else {
      req.actionAtId = actionAtId;
      next();
    }
  } catch(err) {
    next(err);
  }
}

async function validateProjectId(req, res, next) {
  try {
    const {id} = req.params;
    const projectAtId = await Projects.get(id);
    if(!projectAtId) {
      res.status(404).json({ message: "project not found" })
    } else {
      req.projectAtId = projectAtId;
      console.log(req.projectAtId);
      next();
    }
  } catch(err) {
    next(err);
  }
}

function validateAction(req, res, next) {
  if(!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({ message: "request body missing required fields" })
  } else {
    next();
  }
}

function validateProject(req, res, next) {
  if(!req.body.name || !req.body.description) {
    res.status(400).json({ message: "request body missing required fields" })
  } else {
    next();
  }
}

module.exports = {
    logger,
    validateActionId,
    validateProjectId,
    validateAction,
    validateProject
}