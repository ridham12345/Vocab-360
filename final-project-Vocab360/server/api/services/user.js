import User from '../models/user.js';

/**
 * finds all user objects
 * @param {*} params 
 * @returns promise of all users
 */
export const search = (params={})=>{
    console.log(params)
    const promise = User.find(params).exec();
    console.log(promise)
    return promise;
};


/**
 * creates new user
 * @param {user} user object
 * @returns proomis of created user
 */
export const  create = (user) => {
    const newUser = new User(user);
    return newUser.save();
}

/**
 * fetches user based on the given id
 * @param {string} id 
 * @returns user promise
 */
export const get = (id)=>{
    const promise = User.findById(id).exec(); 
    return promise;
}

/**
 * fetches all the unlearned words for the user
 * @param {user} user object 
 * @param {*} array of word objects 
 * @returns Array of unlearned words for the user
 */
 export const getUnlearnedWord = (user, words)=>{
    const seenWords = user.mastered.concat(user.learning)
    const unlearnedwords = words.filter(function(currentword){return !seenWords.includes(currentword.id)})
    if (unlearnedwords){
        return unlearnedwords;
    }
    return null;
}

/**
 * generates a random word for the user to display
 * @param {user} user object 
 * @param {*} array of word objects 
 * @returns word object
 */
 export const getRandomWord = (user, words)=>{
    let randomWord = words[Math.floor(Math.random()*words.length)]
    let wordstatus = "unlearned"
    if (user.mastered.includes(randomWord.id)){
        wordstatus = "mastered"
    }
    if(user.learning.includes(randomWord.id)){
        wordstatus = "learning"
    }
    randomWord.status = wordstatus
    if (user.favourite.includes(randomWord.id)){
        randomWord["favourite"] = true
    }else{
        randomWord["favourite"] = false
    }
    return randomWord;
}

/**
 * updates the user word lists based on the action/filter
 * @param {user} user object 
 * @param {*} payload
 * @returns user promise
 */
export const updateWordslist = (user, data)=>{
    if ('favourite' in data){
        if ((data.favourite) && !(user.favourite.includes(data['wordid']))){
            user.favourite.push(data['wordid'])
        }else if(!(data.favourite) && (user.favourite)){
            console.log("hi")
            user.favourite = user.favourite.filter(function(e) { return e !== data['wordid']});
        }
    }else{
        if (data['know']){
            if (data['oldstatus']=="unlearned"){
                user.learning.push(data['wordid'])
            }else{
                user[data['oldstatus']] = user[data['oldstatus']].filter(function(e) { return e !== data['wordid']});
                user.mastered.push(data['wordid'])
            }
        }else{
            if (!(data['oldstatus']=="unlearned")){
                user[data['oldstatus']] = user[data['oldstatus']].filter(function(e) { return e !== data['wordid']});
        }
        }
}
    const promise = User.findByIdAndUpdate(user.id,user,{new:true}).exec();
    return promise;
}

/**
 * updates user based on the id
 * @param {*} user 
 * @returns updated user promise
 */
export const update = (user)=>{
    user._id = user.id;
    const promise = User.findByIdAndUpdate(user.id,user,{new:true}).exec();
    return promise;
}

/**
 * deletes user based on the id
 * @param {*} user object
 * @returns deleted user promise
 */
export const remove = (id)=>{
    const promise = User.findByIdAndRemove(id).exec();
    return promise;
}

/**
 * fetches user based on the username
 * @param {string} username  
 * @returns user promise
 */
 export const getbyusername = (username)=>{
    const promise = User.findOne({"userName":username}).exec();
    return promise;
}

/**
 * calcuates the estimated score for the user based on his progress
 * @param {user} user object
 * @returns calculated score for the user
 */
export const calculateexpectedscore = (user, wordcount)=>{
    
    return Math.round((user.mastered.length / wordcount) * 100);

}