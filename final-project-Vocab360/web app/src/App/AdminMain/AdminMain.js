import React, {useState, useEffect} from 'react';
import UsersListAdmin from '../UsersListAdmin/UsersListAdmin';
import WordsListAdmin from '../WordsListAdmin/WordsListAdmin';
import Admin from '../Admin/Admin';
import * as api from '../../API/index.js';
import WordDetailsAdmin from '../WordDetailsAdmin/WordDetailsAdmin';
import UserDetailsAdmin from '../UserDetailsAdmin/UserDetailsAdmin';
import WordEditAdmin from '../WordEditAdmin/WordEditAdmin';
import WordAddAdmin from '../WordAddAdmin/WordAddAdmin';


function AdminMain(props) {

    // this variable controls what is shown
    const[view, setView] =useState({
        adminhide: false,
        userslisthide: true,
        wordslisthide: true,
        userdetailshide: true,
        worddetailshide: true,
        wordedithide: true,
        wordaddhide: true
    })

    //these variables are used to select current user, word
    const[words, setWords] = useState([]);
    const[users, setUsers] = useState([]);
    const[word, setWord] = useState({});
    const[user, setUser] = useState({});

    // getting all words and storing it in words
    useEffect(async() => {
        try {
            const {data} = await api.getallWords();
            setWords(data);
        } catch (error) {
            console.log(error);
        }
    }, [view]);

    // getting all users and storing it in users
    useEffect(async() => {
        try {
            const {data} = await api.getallUsers();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }, [view]);

    // to view admin page
    const openadmin = () => {
        setView({
            adminhide: false,
            userslisthide: true,
            wordslisthide: true,
            userdetailshide: true,
            worddetailshide: true,
            wordedithide: true,
            wordaddhide: true
        })
    }

    // to view words list
    const openwordslist = () => {
        setView({
            adminhide: true,
            userslisthide: true,
            wordslisthide: false,
            userdetailshide: true,
            worddetailshide: true,
            wordedithide: true,
            wordaddhide: true
        })
    }

    // to view users list
    const openuserslist = () => {
        setView({
            adminhide: true,
            userslisthide: false,
            wordslisthide: true,
            userdetailshide: true,
            worddetailshide: true,
            wordedithide: true,
            wordaddhide: true
        })
    }

    // to view word detials
    const openworddetails = () => {
        setView({
            adminhide: true,
            userslisthide: true,
            wordslisthide: true,
            userdetailshide: true,
            worddetailshide: false,
            wordedithide: true,
            wordaddhide: true
        })
    }

    // to view user details
    const openuserdetails = () => {
        setView({
            adminhide: true,
            userslisthide: true,
            wordslisthide: true,
            userdetailshide: false,
            worddetailshide: true,
            wordedithide: true,
            wordaddhide: true
        })
    }

    // to view word edit screen
    const openwordedit = () => {
        setView({
            adminhide: true,
            userslisthide: true,
            wordslisthide: true,
            userdetailshide: true,
            worddetailshide: true,
            wordedithide: false,
            wordaddhide: true
        })
    }

    // to view word add screen
    const openwordadd = () => {
        setView({
            adminhide: true,
            userslisthide: true,
            wordslisthide: true,
            userdetailshide: true,
            worddetailshide: true,
            wordedithide: true,
            wordaddhide: false
        })
    }

    //main dom element with all screens
    return ( 
        <>
            <Admin view={view} setView={setView} openwordslist={openwordslist} openuserslist={openuserslist} ></Admin>
            <WordsListAdmin words={words} setWord={setWord} setWords={setWords} view={view} openworddetails={openworddetails} openadmin={openadmin} openwordadd={openwordadd}></WordsListAdmin>
            <UsersListAdmin users={users} setUser={setUser} view={view} openuserdetails={openuserdetails} openadmin={openadmin}></UsersListAdmin>
            <WordDetailsAdmin word={word} setWord={setWord} setWords={setWords} view={view} openwordslist={openwordslist} openwordedit={openwordedit}></WordDetailsAdmin>
            <UserDetailsAdmin user={user} setUser={setUser} setUsers={setUsers} view={view} openuserslist={openuserslist}></UserDetailsAdmin>
            <WordEditAdmin word={word} view={view} setWord={setWord} setWords={setWords} openworddetails={openworddetails}></WordEditAdmin>
            <WordAddAdmin word={word} view={view} setWord={setWord} setWords={setWords} openwordslist={openwordslist}></WordAddAdmin>
        </>    
     );
}

export default AdminMain;