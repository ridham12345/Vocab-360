import React, {useState, useEffect} from 'react';
import './Admin.scss';

function Admin(props) {
    
    useEffect(() => {
        
    }, [props.view]);

    // returns the admin screen dom
    return ( 
        <>
            <div hidden={props.view.adminhide}>
                <label className="header-admin">Administrator</label>
                <h2 className="btn-admin" onClick={props.openwordslist}>Words List</h2>
                <h2 className="btn-admin" onClick={props.openuserslist}>Users List</h2>
            </div>
            
        </>    
     );
}

export default Admin;