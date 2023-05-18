import React, {useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import Profile from '../Profile/Profile';
import ProfileWords from '../ProfileWords/ProfileWords';
import AdminMain from '../AdminMain/AdminMain';
import Word from '../Word/Word';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import './Navbar.scss';


/**
 * main navbar component with all routings
 * @returns nav bar JSX
 */
function Navbar() {
    const [profile,setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [deckDetails,setDeckDetails] = useState({});
    const [wordType, setWordType] = useState("");
    //console.log("profile");

    const navigate = useNavigate();
    const location = useLocation();

    /**
     * method that runs after component loads
     */
    useEffect(() => {
        const token = profile?.token;
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()){
                navigate('/auth');
            }
        }else{
            //console.log("not logged in");
            //console.log(location);
            navigate('/auth');
        }
      }, [location.pathname]);


    /**
     * method that handles logout, deletes profile from local storage
     */
    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth');
        setProfile(JSON.parse(localStorage.getItem('profile')));
    }

    return ( <nav className="navbar">
        <div className="spacecreater"></div>
        <label className="navtitle">V360&deg;</label>
        <Link to="/home">Home</Link>
        {!profile?.user && 
            <Link to="/auth">SignUp</Link>
        }
        {profile?.user && 
            <Link to="/profile">Profile</Link>
        }
        {profile?.user && 
            <button className="logout" onClick={handleLogout}>Logout</button>
        }
        <div className="spacecreater2"></div>
        <br/>
        <Routes>
            <Route path='/home' element={<Home profile={profile} setDeckDetails={setDeckDetails}/>} />
            <Route path='/auth' element={<Auth setProfile={setProfile}/>} />
            <Route path='/profile' element={<Profile setProfile={setProfile} profile={profile} setWordType={setWordType}/>} />
            <Route path='/word' element={<Word deckDetails={deckDetails} setProfile={setProfile} profile={profile}/>} />
            <Route path='/profilewords' element={<ProfileWords wordType={wordType}/>} />
            <Route path='/admin' element={<AdminMain/>} />
        </Routes>
    </nav> );
}

export default Navbar;