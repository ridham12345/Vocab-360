import React, { useState, useEffect } from 'react';
import * as api from '../../API/index';
import './WordAddAdmin.scss';

function WordAddAdmin(props) {

    // to refresh the container everytime you open the word edit sedit screen
    useEffect (() => {
        props.setWord({
            title: "",
            defenition: "",
            section: "",
            difficulty: ""
        })
    }, [props.view.wordaddhide])

    // to go back to words list screen
    const back = () => {
        props.openwordslist();
    }

    // to update the title of the word when data is changed
    const updatetitle = (event) => {
        props.setWord({...props.word, title: event.target.value});
    }

    // to update the definition of the word when data is changed
    const updatedefinition = (event) => {
        props.setWord({...props.word, defenition: event.target.value});
    }

    // to update the seciton of the word when data is changed
    const updatesection = (event) => {
        props.setWord({...props.word, section: event.target.value});
    }

    // to update the difficulty of the word when data is changed
    const updatedifficulty = (event) => {
        props.setWord({...props.word, difficulty: event.target.value});
    }

    // to add the changed word to database and make it permanent, also updates the word list
    const addword = async(event, word) => {
        const c = await api.addword(word);
        const {data} = await api.getallWords();
        props.setWords(data);
        props.openwordslist();
    }

    // return jsx elements for word add screen
    return (
        <>
        <div hidden={props.view.wordaddhide}>
            <h1 class="wordadd-header">Add Word</h1>
            <div className="wordadd">
                <label>Title</label>
                <input value={props.word.title} onChange={updatetitle}></input>
                <label>Definition</label>
                <input value={props.word.defenition} onChange={updatedefinition}></input>
                <label>Section</label>
                <input value={props.word.section} onChange={updatesection}></input>
                <label>Difficulty</label>
                <input value={props.word.difficulty} onChange={updatedifficulty}></input>
                <button onClick={(event) => addword(event, props.word)}>Add</button>
                <button onClick={back}>Back</button>
            </div>
        </div>
        </>
    )
    
}

export default WordAddAdmin;