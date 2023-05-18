import Word from '../models/word.js';

/**
 * finds all word objects
 * @param {*} params 
 * @returns promise of all words
 */
export const search = (params={})=>{
    const promise = Word.find(params).exec();
    return promise;
};


/**
 * creates new word
 * @param {word} word word object
 * @returns proomis of created word
 */
export const  create = (word) => {
    const newWord = new Word(word);
    return newWord.save();
}

/**
 * fetches word based on the given id
 * @param {string} id  unique reference to fetch word
 * @returns word promise
 */
export const get = (id)=>{
    const promise = Word.findById(id).exec(); 
    return promise;
}

/**
 * updates word based on the id
 * @param {word} word 
 * @returns updated word promise
 */
export const update = (word)=>{
    word._id = word.id;
    word.lastModifiedDate = Date.now();
    const promise = Word.findByIdAndUpdate(word.id,word,{new:true}).exec();
    return promise;
}


/**
 * deletes word based on the id
 * @param {string} id  
 * @returns deleted word promise
 */
export const remove = (id)=>{
    const promise = Word.findByIdAndRemove(id).exec();
    return promise;
}

/**
 * fetches all distinct difficulties for the words
 * @returns word promise
 */
 export const getDifficulties = ()=>{
    const promise = Word.distinct("difficulty").exec();
    return promise;
}

/**
 * fetches all distinct levels for the words
 * @returns word promise
 */
export const getAllLevels = (difficulty)=>{
    const promise = Word.find({"difficulty": difficulty}).distinct("section").exec();
    return promise;
}

/**
 * fetches list of word objects based on ids
 * @param {Array} idslist list of word ids
 * @returns words promise
 */
export const getWordsbyId = (idslist) => {
    const promise = Word.find().where('_id').in(idslist).sort({"difficulty":-1, "section":1}).exec();
    return promise;
}

/**
 * fetches all the unique combinations of difficulties and section
 * @returns word promise
 */
export const getAllCombinations = () =>{
    const promise = Word.aggregate([{$group: {"_id":{"difficulty": "$difficulty", "section": "$section"}}}]).exec()
    return promise
}
/**
 * constructs the user deck in the required format
 * @param {Array} masteredwords array of the user mastered words
 * @param {Array} wordcombos array of word combos
 * @returns constructed user deck
 */
export const constructdeck = (masteredwords, wordcombos) => {
    let emptydeck = createemptydeck(wordcombos)
    const keys_to_keep = ["difficulty", "section"]
    //reducing the array of objects to have only required keys 
    const redux = array => array.map(o => keys_to_keep.reduce((acc, curr) => {
        acc[curr] = o[curr];
        return acc;
      }, {}));
    const reducedobjs = redux(masteredwords)
    //removing the duplicate records from the array and incrementing the count for the found duplicates as progress
    const mastereddeck = Object.values(reducedobjs.reduce((r,e) => {
        let k = `${e.difficulty}|${e.section}`;
        if(!r[k]) r[k] = {...e, progress:1}
            else r[k].progress +=1;
        return r;

    },{}
    ))
    const deck = addprogress(emptydeck, mastereddeck)
    deck.sort(function(a,b){
        if (a.difficulty==b.difficulty){
            return a.section - b.section
        }
        return a.difficulty > b.difficulty ? -1 : 1;
    })
    return deck
}

/**
 * calculates the progress for the user deck
 * @param {*} deck Array of objects
 * @param {*} mastereddeck Array of the objects
 * @returns 
 */
export const addprogress = (deck, mastereddeck) => {
    console.log(deck)
    for(let i = 0; i<deck.length; i++){
        deck[i].progress = 0
        for(let j = 0; j <mastereddeck.length; j++){
            if((deck[i].difficulty == mastereddeck[j].difficulty) && (deck[i].section == mastereddeck[j].section)){
                deck[i].progress = mastereddeck[j].progress
            }
        }
    }
    return deck
}

/**
 * creates the empty deck from the wordcombos
 * @param {*} wordcombos Array of objects
 * @returns emptydeck
 */
export const createemptydeck = (wordcombos) => {
    let emptydeck = []
    for (let i =0; i < wordcombos.length; i++){
        wordcombos[i]._id.progress = 0
        emptydeck.push(wordcombos[i]._id)
    }
    return emptydeck
}
