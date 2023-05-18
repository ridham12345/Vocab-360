import React, {useEffect, useState} from 'react';
import './WordsListAdmin.scss';

function WordsListAdmin(props) {

    const view = props.view;
    const setView = props.setView;
    const setWord = props.setWord;

    useEffect(() => {

    }, [view])

    // updates word with the selected word and open word details
    const viewworddetails = (event, word) => {
        setWord(word);
        props.openworddetails();
    };

    // put the elements of words into a list of elements in jsx 
    const words=props.words.map((word, id) => 
        <p key={id} onClick={(event) => viewworddetails(event, word)}>
            {word.title}
        </p>)

//return jsx elemenets of the word list screen
    return (
        <>
            <div className="wordslist" hidden={props.view.wordslisthide}>
                <div className="title-wordslist">
                    <button onClick={props.openadmin}>&lt;&lt;</button>
                    <label>All Words</label>
                    <button onClick={props.openwordadd}>+</button>
                </div>
                <div className="body-wordslist">
                    {words}
                </div>
            </div>
        </>
    )
}

export default WordsListAdmin;