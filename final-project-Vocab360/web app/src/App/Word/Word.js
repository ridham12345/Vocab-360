import React,{useEffect, useState} from 'react';
import * as api from '../../API/index';
import {useNavigate} from 'react-router-dom';
import './Word.scss'
import Profile from '../Profile/Profile';

function Word(props) {
    const [word, setWord] = useState(JSON.parse(localStorage.getItem('word')))
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState("");
    const [defhide, setDefhide] = useState(true);

    useEffect(async ()=>{
        console.log("deck dets in word")
        console.log(word)
        try{
            const {data} = await api.getWords(word)
            setWord(data)
            localStorage.setItem('word',JSON.stringify(data));
        }catch(error){
            console.log(error)
        }
    },[refresh]);

    const learnWord = async()=>{
        try{
            const {data} = await api.updateWords({wordid:word.id,oldstatus:word.status,know:true});
            console.log("logging learn word data")
            console.log(data)
            localStorage.setItem('profile', JSON.stringify({user:data,token:props.profile.token}));
            props.setProfile(JSON.parse(localStorage.getItem('profile')));
            setDefhide(true);
            console.log("learnword");
            // navigate('/word');
            if(refresh===""){
                setRefresh("refresh")
            }else{
                setRefresh("")
            }
            
        }catch(error){
            console.log(error);
        }
    }

    const unlearnWord = async()=>{
        try{
            const {data} = await api.updateWords({wordid:word.id,oldstatus:word.status,know:false});
            localStorage.setItem('profile', JSON.stringify({user:data,token:props.profile.token}));
            props.setProfile(JSON.parse(localStorage.getItem('profile')));
            setDefhide(true);
            // navigate('/word');
            if(refresh===""){
                setRefresh("refresh")
            }else{
                setRefresh("")
            }
        }catch(error){
            console.log(error);
        }
    }

    const favouriteWord = async()=>{
        console.log("inside favourite")
        try{
            const {data} = await api.updateWords({wordid:word.id,favourite:!word.favourite});
            localStorage.setItem('profile', JSON.stringify({user:data,token:props.profile.token}));
            props.setProfile(JSON.parse(localStorage.getItem('profile')));
            // navigate('/word');
            setWord({...word, favourite:!word.favourite})
        }catch(error){
            console.log(error);
        }
    }

    // function to hide/unhide the definition 
    const flipcard = () => {
        if (defhide===true) {
            setDefhide(false);
        } else {
            setDefhide(true);
        }
    }

    return ( 
    <>
        <div className="word"> 
            <div className="title">
                <label onClick={flipcard} className="word-title">{word.title}</label>
                <div onClick={favouriteWord} className={word?.favourite?"favourite-star":"star"}></div>
            </div>
            <div hidden={defhide}>
                <p className="word-def">{word.defenition}</p>
            </div>
            <div className="btns">
                <button className="button-knew" onClick={learnWord}>Know</button>
                <button className="button-didnt-know" onClick={unlearnWord}>Don't Know</button>
            </div>
        </div>
    </>
     );
}

export default Word