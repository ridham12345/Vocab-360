import React, { useState, useEffect } from 'react';
import * as api from '../../API/index.js';
import './WordDetailsAdmin.scss';

function WordDetailsAdmin(props) {

    const back = () => {
        props.openwordslist();
    }

    // deletes the select word from database and refreshes the words list
    const deleteword = async(event, word) => {
        const a = await api.deleteword(word.id);
        const {data} = await api.getallWords();
        props.setWords(data);
        props.openwordslist();
    }

    // opens edit word screen
    const editword = (event, word) => {
        props.openwordedit();
    }

    // return jsx elements for the word details screen
    return (
        <>
            <div hidden={props.view.worddetailshide}>
                <h1 className="worddetails-title">{props.word.title}</h1>
                <h1 className="worddetails-label">{props.word.defenition}</h1>
                <h1 className="worddetails-label">{props.word.section}</h1>
                <h1 className="worddetails-label">{props.word.difficulty}</h1>
                <button className="worddetails-btn" onClick={back}>Back</button>
                <button className="worddetails-btn" onClick={(event) => deleteword(event, props.word)}>Delete</button>
                <button className="worddetails-btn" onClick={(event) => editword(event, props.word)}>Edit</button>
            </div>
        </>
    )
    
}

export default WordDetailsAdmin;