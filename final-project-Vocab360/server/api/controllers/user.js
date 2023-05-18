import User from '../models/user.js';
import * as UserService from '../services/user.js';
import * as WordService from '../services/word.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



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
 * fetches all the user objects in the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
export const index = async (request,response)=>{
    try{
        const user = await UserService.search();
        
        SetSuccessResponse(user, response);
        // userService.search().then(resolve);
    }catch(e){
        errorHandler(e.message, response);
    }
    
}

/**
 * creates new user object and saves it in the database
 * @param {*} request 
 * @param {*} response 
 */
export const save = async (request,response)=>{
    try{
        const data = {...request.body};
        const oldUser = await User.findOne({email: data.email}).exec();
        if (oldUser){
            return response.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(data.password, 12);
        data.password = hashedPassword;
        const user = await UserService.create(data);
        const allwords = await WordService.search()
        user.expectedscore = UserService.calculateexpectedscore(user, allwords.length)
        const token = jwt.sign( { email: user.email, id: user.id }, 'secret', { expiresIn: "1h" } );
        SetSuccessResponse({user,token}, response);
    }catch(e){
        errorHandler(e.message, response);
    }
    
}


/**
 * fetches the user object based on the id from the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
export const get = async (request, response)=>{
    try{
        const id = request.params.id;
        const user  = await UserService.get(id);
        SetSuccessResponse(user, response)
    }catch(e){
        errorHandler(e.message, response)
    }
}

/**
 * updates the user object based on the id in the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
export const update = async (request, response)=>{
    try{
        console.log(request)
        const id = request.params.id;
        const picname = request.file?.originalname
        const userinfo = {...request.body, id}
        if (picname){
            userinfo.picname = picname
        }
        const user = await UserService.update(userinfo);
        const token = jwt.sign( { email: user.email, id: user.id }, 'secret', { expiresIn: "1h" } );
        SetSuccessResponse({user,token}, response)
    }catch(e){
        errorHandler(e.message, response)
    }
}


/**
 * deletes the user object based on the id in the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
export const remove = async (request, response)=>{
    try{
        const id = request.params.id;
        const rmuser  = await UserService.remove(id);
        SetSuccessResponse(rmuser, response)
    }catch(e){
        errorHandler(e.message, response)
    }
}

/**
 * updates the user object based on the id in the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
 export const getUserDeck = async (request, response)=>{
    try{
        const id = request.userId;
        const userinfo = await UserService.get(id);
        const masteredwords = await WordService.getWordsbyId(userinfo.mastered)
        const wordcombos = await WordService.getAllCombinations()
        const userdeck = WordService.constructdeck(masteredwords, wordcombos)
        for(let i =0; i<userdeck.length; i++){
            let res = await WordService.search({"difficulty": userdeck[i].difficulty, "section": userdeck[i].section})
            userdeck[i].progress = (userdeck[i].progress/res.length) * 100
        }
        SetSuccessResponse(userdeck, response)
    }catch(e){
        errorHandler(e.message, response)
    }
}

/**
 * fetches the user object based on the id from the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
 export const getWords = async (request, response)=>{
    try{
        const id = request.userId;
        const data = {...request.body}
        const user  = await UserService.get(id);
        const words = await WordService.search({"difficulty": data['difficulty'], "section": data['section']});
        const randword = await UserService.getRandomWord(user, words)
        SetSuccessResponse(randword, response)
    }catch(e){
        errorHandler(e.message, response)
    }
}

/**
 * fetches the user object based on the id from the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
 export const getUserWords = async (request, response)=>{
    try{
        const id = request.userId;
        console.log(id)
        const data = {...request.body}
        const user  = await UserService.get(id);
        const allWords = await WordService.search()
        let requiredwords = null
        if (data['wordtype']=="unlearned"){
            requiredwords = UserService.getUnlearnedWord(user, allWords)
        }else{
            console.log(user[data['wordtype']])
            requiredwords = await WordService.getWordsbyId(user[data['wordtype']])
        }
        SetSuccessResponse(requiredwords, response)
    }catch(e){
        errorHandler(e.message, response)
    }
}


/**
 * updates the user object based on the id in the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
 export const updateWordslist = async (request, response)=>{
    try{
        const id = request.userId;
        const data = {...request.body, id}
        const user = await UserService.get(id)
        const upduser = await UserService.updateWordslist(user, data);
        const allwords = await WordService.search()
        upduser.expectedscore = UserService.calculateexpectedscore(upduser, allwords.length)
        SetSuccessResponse(upduser, response)
    }catch(e){
        errorHandler(e.message, response)
    }
}
/**
 * fetches the user object based on the id from the database and outputs as json 
 * @param {*} request request object
 * @param {*} response response object
 */
 export const signin = async (request, response)=>{
    try{
        const userName = request.body.userName
        const password = request.body.password
        const user  = await UserService.getbyusername(userName);
        const allwords = await WordService.search()
        user.expectedscore = UserService.calculateexpectedscore(user, allwords.length)
        if(!user){
            return response.status(404).json({ message: "** User not found **" });
        }
        if(!await bcrypt.compare(password, user.password)){
            return response.status(400).json({ message: "** Invalid credentials **" });
        }
        const token = jwt.sign( { email: user.email, id: user.id }, 'secret', { expiresIn: "1h" } );
        SetSuccessResponse({user,token}, response)
    }catch(e){
        errorHandler(e.message, response)
    }
}