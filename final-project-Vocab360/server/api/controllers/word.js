import { request, response } from 'express';
import Word from '../models/word.js';
import * as WordService from '../services/word.js';


/**
 * error handler method to handle any validation errors
 * @param {*} message response message
 * @param {*} response response object
 */
const errorHandler = (message, response)=>{
    response.status(500);
    response.json({error:message});
}

/**
 * Success response handler
 * @param {*} message response message
 * @param {*} response response object
 */
const SetSuccessResponse = (message, response)=>{
    response.status(200);
    response.json(message);
}

/**
 * fetches all the word objects in the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
export const index = async (request,response)=>{
    try{
        const word = await WordService.search();
        SetSuccessResponse(word, response);
        // wordService.search().then(resolve);
    }catch(e){
        errorHandler(e.message, response);
    }
    
}

/**
 * creates new word object and saves it in the database
 * @param {*} request 
 * @param {*} response 
 */
export const save = async (request,response)=>{
    try{
        const word = {...request.body};
        const newword = await WordService.create(word);
        SetSuccessResponse(newword, response);
    }catch(e){
        errorHandler(e.message, response);
    }
    
}


/**
 * fetches the word object based on the id from the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
export const get = async (request, response)=>{
    try{
        const id = request.params.id;
        const word  = await WordService.get(id);
        SetSuccessResponse(word, response)
    }catch(e){
        errorHandler(e.message, response)
    }
}

/**
 * updates the word object based on the id in the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
export const update = async (request, response)=>{
    try{
        const id = request.params.id;
        const word = {...request.body, id}
        const updword = await WordService.update(word);
        SetSuccessResponse(updword, response)
    }catch(e){
        errorHandler(e.message, response)
    }
}


/**
 * deletes the word object based on the id in the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
export const remove = async (request, response)=>{
    try{
        const id = request.params.id;
        const word = {...request.body, id};
        const rmword  = await WordService.remove(id);
        SetSuccessResponse(rmword, response)
    }catch(e){
        errorHandler(e.message, response)
    }
}

/**
 * fetches all unique difficulty for the words
 * @param {*} request request object
 * @param {*} response response object
 */
export const getAllWordDifficulties = async (request, response)=>{
    try{
        const getDifficulties = await WordService.getDifficulties();
        SetSuccessResponse(getDifficulties, response);
    }catch(e){
        errorHandler(e.message, response);
    }
}

/**
 * fetches all unique levels for the words
 * @param {*} request request object
 * @param {*} response response object
 */
export const getAllLevels = async (request, response)=>{
    try{
        const difficulty = request.params.difficulty;
        const getLevels = await WordService.getAllLevels(difficulty);
        SetSuccessResponse(getLevels, response)
    }catch(e){
        errorHandler(e.message, response);
    }
}