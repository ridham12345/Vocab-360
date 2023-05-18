import React from 'react';
import './UsersListAdmin.scss';

function UsersListAdmin(props) {

    const back = () => {
        props.openadmin();
    }

    // updates the user variable and displays user details screen
    const viewuserdetails = (event, user) => {
        props.setUser(user);
        props.openuserdetails();
    }

    // return all the users as html elements to populate as list
    const users=props.users.map((user, id) => 
        <p key={id} onClick={(event) => viewuserdetails(event, user)}>
            <label>{user.userName}</label>
            <label> - </label>
            <label>{user.name}</label>
        </p>)

    // dom elements to return user list screen
    return (
        <>
            <div hidden={props.view.userslisthide}>
                <div className="userslist-title">
                    <button onClick={back}>&lt;&lt;</button>
                    <label>All Users</label>
                </div>
                <ol className="userstable">
                    {users}
                </ol>
            </div>
        </>
    );
}

export default UsersListAdmin;