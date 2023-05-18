import React,{useEffect, useState} from 'react';
import * as api from '../../API/index';
import {useNavigate} from 'react-router-dom';
import './ProfileWords.scss';

function WordsListUser(props) {
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useEffect (async () => {
        console.log(props.wordType)
        const {data} = await api.getProfileWords({wordtype:props.wordType});
        setList(data);
    }, [])

    const words = list.map((word, id) => 
        <li key={id} className="wordlistrow">
        <label>{word.title}</label>
        <label> - </label>
        <label>{word.defenition}</label></li>
    );

    return ( 
    <>
        <label className="wordlist">List of {props.wordType} words</label>
        <div className="userwordlist"> 
            <ol>
                {words}
            </ol>
        </div>
    </>
     );
}

export default WordsListUser