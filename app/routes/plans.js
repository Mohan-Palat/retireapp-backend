// Require necessary NPM packages
const express = require('express');

// Require Mongoose Model for Plan
const Plan = require('../models/plan');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action:        INDEX
 * Method:        GET
 * URI:           /api/plans
 * Description:   Get All Plans
 */
router.get('/api/plans', (req, res) => {
  Plan.find()
  // Return all Plans as an Array
  .then((allPlans) => {
    res.status(200).json({ plans: allPlans });
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});

/**
 * Action:        SHOW
 * Method:        GET
 * URI:           /api/plans/5d664b8b68b4f5092aba18e9
 * Description:   Get An Plan by Plan ID
 */
router.get('/api/plans/:id', (req, res) => {
  Plan.findById(req.params.id)
  .then((plan) => {
    if (plan) {
      res.status(200).json({ plan: plan });
    } else {
      // If we couldn't find a document with the matching ID
      res.status(404).json({
        error: {
          name: 'DocumentNotFoundError',
          message: 'The provided ID doesn\'t match any documents'
        }
      });
    }
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  })
});

/**
* Action:       CREATE
* Method:       POST
* URI:          /api/plans
* Description:  Create a new Plan
*/
router.post('/api/plans', (req, res) => {
  Plan.create(req.body.plan)
  // On a successful `create` action, respond with 201
  // HTTP status and the content of the new plan.
  .then((newPlan) => {
    res.status(201).json({ plan: newPlan });
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});

/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:         /api/plans/5d664b8b68b4f5092aba18e9
 * Description: Update An Plan by Plan ID
 */
router.patch('/api/plans/:id', (req, res) => {
  Plan.findById(req.params.id)
    .then((plan) => {
      if(plan) {
        // Pass the result of Mongoose's `.update` method to the next `.then`
        return plan.update(req.body.plan);
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID doesn\'t match any documents'
          }
        });
      }
    })
    .then(() => {
      // If the update succeeded, return 204 and no JSON
      res.status(204).end();
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

/**
* Action:       DESTROY
* Method:       DELETE
* URI:          /api/plans/5d664b8b68b4f5092aba18e9
* Description:  Delete An Plan by Plan ID
*/
router.delete('/api/plans/:id', (req, res) => {
  Plan.findById(req.params.id)
  .then((plan) => {
    if (plan) {
      // Pass the result of Mongoose's `.delete` method to the next `.then`
      return plan.remove();
    } else {
      // If we couldn't find a document with the matching ID
      res.status(404).json({
        error: {
          name: 'DocumentNotFoundError',
          message: 'The provided ID Doesn\'t match any documents'
        }
      });
    }
  })
  .then(() => {
    // If the deletion succeeded, return 204 and no JSON
    res.status(204).end();
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});

// Export the Router so we can use it in the server.js file
module.exports = router;
