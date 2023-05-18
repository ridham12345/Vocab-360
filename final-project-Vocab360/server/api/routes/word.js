import express from 'express';
import * as WordController from '../controllers/word.js'

const router = express.Router();

// get url to fetch all the word objects and post url to create a new word
router.route('/words')
    .get(WordController.index)
    .post(WordController.save)

// get url to fetch all the difficultes available for the word objects
router.route('/words/difficulties')
    .get(WordController.getAllWordDifficulties)

// get url to fetch all the levels available for the word objects
router.route('/word/levels/:difficulty')
    .get(WordController.getAllLevels)

//get url to get word object based on id, put url to update word object based on id, delete url to delete wordobject based on id
router.route('/word/:id')
    .get(WordController.get)
    .put(WordController.update)
    .delete(WordController.remove);
    

export default router;