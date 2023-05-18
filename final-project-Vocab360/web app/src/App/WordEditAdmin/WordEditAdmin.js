import React, { useState, useEffect } from 'react';
import * as api from '../../API/index';
import './WordEditAdmin.scss';

function WordEditAdmin(props) {

    // goes back to word details screen
    const back = () => {
        props.openworddetails();
    }

    // delete the current editing word from the database and return to words list
    const deleteword = async(event, word) => {
        const a = await api.deleteword(word.id);
        const {data} = await api.getallWords();
        props.setWords(data);
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

    // to update the section of the word when data is changed
    const updatesection = (event) => {
        props.setWord({...props.word, section: event.target.value});
    }

    // to update the difficulty of the word when data is changed
    const updatedifficulty = (event) => {
        props.setWord({...props.word, difficulty: event.target.value});
    }

    // saves the changes in the database and open word details screen
    const saveword = async(event, word) => {
        const s = await api.saveword(word);
        const {data} = await api.getallWords();
        props.setWords(data);
        props.openworddetails();
    }

    // to return the jsx elements in the word edit screen
    return (
        <>
            <div hidden={props.view.wordedithide}>
                <h1 class="wordadd-header">Edit Word</h1>
                <div className="wordadd">
                    <label>Title</label>
                    <input value={props.word.title} onChange={updatetitle}></input>
                    <label>Definition</label>
                    <input value={props.word.defenition} onChange={updatedefinition}></input>
                    <label>Section</label>
                    <input value={props.word.section} onChange={updatesection}></input>
                    <label>Difficulty</label>
                    <input value={props.word.difficulty} onChange={updatedifficulty}></input>
                </div>
                <div className="wordedit-btns">
                    <button onClick={back}>Back</button>
                    <button onClick={(event) => saveword(event, props.word)}>Save</button>
                    <button onClick={(event) => deleteword(event, props.word)}>Delete</button>
                </div>
            </div>
        </>
    )
    
}

export default WordEditAdmin;