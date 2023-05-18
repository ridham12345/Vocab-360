import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './Profile.scss';
import * as api from '../../API/index.js';
import { PieChart } from 'react-minimal-pie-chart';

/**
 * User Profile React Component 
 * @param {*} props data from parent component 
 * @returns JSX element 
 */
function Profile(props) {
    const [user, setUser] = useState(props.profile.user);
    const [fileName, setFileName] = useState("");
    const [unlearn, setUnlearn] = useState(0);

    useEffect(async ()=>{
        try{
            const {data} = await api.getallWords();
            const allwordslength = data.length
            const unlearnWordlength = allwordslength - user.mastered.length - user.learning.length
            setUnlearn(unlearnWordlength)
            console.log(allwordslength ,user.mastered.length ,user.learning.length)
        } catch(error){
            console.log(error);
        }
    },[])

    const handleChange = (event) =>{
        setUser({...user, [event.target.name]: event.target.value})
    }

    /**
     * Handles saving of the updated user profile details
     */
    const saveUserDetails = async () => {
        const formData = new FormData();
        formData.append("image", fileName)
        formData.append("id", user.id)
        formData.append("name", user.name)
        formData.append("userName", user.userName)
        formData.append("password", user.password)
        formData.append("email", user.email)
        formData.append("phone", user.phone)
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        try{
        const {data} = await api.updateUserDetails(formData)
        console.log(data)
        localStorage.setItem('profile', JSON.stringify(data));
        props.setProfile(JSON.parse(localStorage.getItem('profile')));
        if(data.user?.picname){
            setUser(data.user)
        }
    }catch(error){
        console.log(error)
    }
    }

    /**
     * Handles change in file for the profile pic upload
     * @param {*} event 
     */

    const onChangeFile = (event) =>{
        setFileName(event.target.files[0]);
    }

    /**
     * method to set word type to send api call
     * @param {*} event 
     * @param {*} type -type of the word
     */
    const handleLink = (event, type)=>{
        props.setWordType(type);
    }
    

    return ( 
    <div className="main-container">
        <div className="section-contaiers">
            <div className="imagecontainer">
                <div className="imagediv"><img className="rounded-circle" src={require('../../public/uploads/'+user.picname).default} alt="upload image"/></div>
                <form className="btnupload" encType= "multipart/form-data">
                    <div className="form-group">
                        <label className="img-btn" htmlFor="file">Choose Profile Image</label>
                        <input type="file" fileName="image" className="form-control-file" onChange={onChangeFile}></input>
                        <button className="btnUpload" type="button" onClick = {saveUserDetails}>Upload</button>
                    </div>
                </form>
            </div>
            <div className="profile-information">
                <div className="header">
                    <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="person-metadata">
                    <label className="labels">Name</label><input type="text" className="form-control" placeholder="Name" value={user.name} onChange={handleChange} name="name"/>
                    <label className="labels">UserName</label><input type="text" className="form-control" value={user.userName} placeholder="Username" onChange={handleChange} name="userName"/>
                    <label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" value={user.phone} onChange={handleChange} name="phone"/>
                    <label className="labels">Email ID</label><input type="text" className="form-control" placeholder="enter email id" value={user.email} onChange={handleChange} name="email"/>
                </div>
                <div><button className="btn-save-profile" type="button" onClick = {saveUserDetails}>Save Profile</button></div>
                    
            </div>
            <div className="profile-stats">
                <PieChart className="piechart"
                data={[
                    { title: 'Mastered', value: user.mastered.length, color: '#EDF5E1' },
                    { title: 'Learning', value: user.learning.length, color: '#5CDB95' },
                    { title: 'Unlearned', value: unlearn, color: '#379683' },
                ]}
                label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                labelStyle={{fontSize:12, background:'#EDF5E1', fontWeight: 'bold'}}
                labelPosition={120}
                radius={40}
                />
                <h1 className="expscore">Expected Score: {user.expectedscore}%</h1>
                <Link className="listlinks" to="/profilewords" onClick={(event) => handleLink(event, "favourite")}>Favourite</Link>
                <Link className="listlinks" to="/profilewords" onClick={(event) => handleLink(event, "mastered")}>Mastered</Link>
                <Link className="listlinks" to="/profilewords" onClick={(event) => handleLink(event, "learning")}>Learning</Link>
                <Link className="listlinks" to="/profilewords" onClick={(event) => handleLink(event, "unlearned")}>Unlearned</Link>
            </div>
        </div>
    </div> );
}

export default Profile;