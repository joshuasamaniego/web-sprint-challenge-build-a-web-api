// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { validateActionId, validateAction } = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get();
        res.json(actions);
    } catch(err) { next(err) }
})

router.get('/:id', validateActionId, (req, res, next) => {
  res.json(req.actionAtId);
  next();
})

router.post('/', validateAction, async (req, res, next) => {
    try {
      const newAction = await Actions.insert(req.body)
      res.status(201).json(newAction);
    } catch(err) { next(err) }
})

router.put('/:id', validateActionId, validateAction, async (req, res, next) => {
    try { 
        const updatedAction = await Actions.update(req.params.id, req.body);
        if(updatedAction) {
          res.json(updatedAction);
        } else {
          res.status(500).json({ message: "Update Failed" })
        }
      } catch(err) { next(err) }
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        const deletedAction = await Actions.remove(req.params.id);
        req.json(deletedAction);
    } catch(err) { next(err) }
})

module.exports = router;
