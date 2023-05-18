import React,{useEffect, useState} from 'react';
import * as api from '../../API/index.js';
import './Home.scss';
import { useNavigate } from 'react-router-dom';

/**
 * react functional component for home page
 * @param {*} props coming from parent component
 * @returns home JSX element
 */
function Home(props) {

    const user = props?.profile?.user
    const navigate = useNavigate();
    const [decks, setDecks] = useState([]);
    
    
    /**
     * hook that runs after component loads
     */
    useEffect(async () => {
        try {
            const {data} = await api.getDecksProgress();
            console.log("data from home")
            console.log(data)
            //const data = [{difficulty: "common", section:1,progress: "35"},{difficulty: "basic",section: 2, progress:"69"}];
            setDecks(data)
          } catch (error) {
            console.log(error)
          }
    }, []);

    /**
     * navigates to word component after calling get word details api
     * @param {*} event 
     * @param {*} deckDetails - which deck details to fetch(with section and difficutly)
     */
    const gotoDeck = (event, deckDetails) => {
        props.setDeckDetails(deckDetails);
        localStorage.setItem('word',JSON.stringify(deckDetails));
        console.log("dets in home")
        console.log(deckDetails)
        navigate('/word');
        
    };

    const decksProgress = decks.map((c,i)=> 
        < >
            <div className="container" key={i}>
                <div className="decks">
                    <article className="day-forecast">
                        <h1 className="centered">{c.difficulty} {c.section}</h1>
                        <progress className="progress-bar" value={c.progress} max="100"> {c.progress} </progress>
                        <p className="percent">{c.progress}%</p>
                        <button className="runbtn" onClick={(event) => gotoDeck(event, c)}>Open Deck</button>
                    </article>
                </div>
            </div>
        </>)
    
    return(
        <>
            <article className="forecast">
                { decksProgress }
            </article>
            {/* test */}
        </>)
}

export default Home;