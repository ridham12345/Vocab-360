import React from 'react';
import * as api from '../../API/index';
import './UserDetailsAdmin.scss';

function UserDetailsAdmin(props) {

    const back = () => {
        props.openuserslist();
    }

    // takes in a specific user and deletes the user in the database and updates the users list
    const deleteuser = async(event, user) => {
        const s = await api.deleteuser(user.id);
        const {data} = await api.getallUsers();
        props.setUsers(data);
        props.openuserslist();
    }

    // dom element showing all the details of users with delelte and back button
    return (
        <>
            <div hidden={props.view.userdetailshide}>
                <h1 className="userdetails-title">User Details</h1>
                <div className="userdetails">
                    <label>Name : </label>
                    <label>{props.user.name}</label>
                    <label>Username : </label>
                    <label>{props.user.userName}</label>
                    <label>Email : </label>
                    <label>{props.user.email}</label>
                    <label>Phone no : </label>
                    <label>{props.user.phone}</label>
                    <button onClick={back}>Back</button>
                    <button onClick={(event) => deleteuser(event, props.user)}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default UserDetailsAdmin;