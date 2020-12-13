// Require necessary NPM packages
const express = require('express');

// Require Mongoose Model for Participant
const Participant = require('../models/participant');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action:        INDEX
 * Method:        GET
 * URI:           /api/participants
 * Description:   Get All Participants
 */
router.get('/api/participants', (req, res) => {
  Participant.find()
  // Return all Participants as an Array
  .then((allParticipants) => {
    res.status(200).json({ participants: allParticipants });
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});

/**
 * Action:        SHOW
 * Method:        GET
 * URI:           /api/participants/5d664b8b68b4f5092aba18e9
 * Description:   Get An Participant by Participant ID
 */
router.get('/api/participants/:id', (req, res) => {
  Participant.findById(req.params.id)
  .then((participant) => {
    if (participant) {
      res.status(200).json({ participant: participant });
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
* URI:          /api/participants
* Description:  Create a new Participant
*/
router.post('/api/participants', (req, res) => {
  Participant.create(req.body.participant)
  // On a successful `create` action, respond with 201
  // HTTP status and the content of the new participant.
  .then((newParticipant) => {
    res.status(201).json({ participant: newParticipant });
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});

/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:         /api/participants/5d664b8b68b4f5092aba18e9
 * Description: Update An Participant by Participant ID
 */
router.patch('/api/participants/:id', (req, res) => {
  Participant.findById(req.params.id)
    .then((participant) => {
      if(participant) {
        // Pass the result of Mongoose's `.update` method to the next `.then`
        return participant.update(req.body.participant);
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
* URI:          /api/articles/5d664b8b68b4f5092aba18e9
* Description:  Delete An Participant by Participant ID
*/
router.delete('/api/articles/:id', (req, res) => {
  Participant.findById(req.params.id)
  .then((article) => {
    if (article) {
      // Pass the result of Mongoose's `.delete` method to the next `.then`
      return article.remove();
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
