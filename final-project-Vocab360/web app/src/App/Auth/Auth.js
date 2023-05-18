import React, {useState} from 'react';
import Input from './Input';
import * as api from '../../API/index.js';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';


/**
 * authorization react functional component
 * @param {*} props coming from parent component
 * @returns auth JSX element with signin and signup fields and buttons
 */
function Auth(props) {
    const startState = {firstName:'',lastName:'',name:''};
    const [form, setForm] = useState(startState);
    const [signUp, setSignUp] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    /**
     * method to handle change of all input fields
     * @param {*} event 
     */
    const handleChange = function(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    /**
     * method to handle signup/signin button cicck
     * @param {*} event 
     */
    const handleSubmit = function(event) {
        
        if(form.firstName && form.lastName){
            form.name = form.firstName + form.lastName;
        }
        if(signUp){
            signup(form, navigate);
        }else{
            signin(form, navigate);
        }
        event.preventDefault();
    }


    /**
     * method to handle signup functionality
     * @param {*} formData 
     * @param {*} router 
     */
    const signup = async (formData, router) => {
        try {
          const { data } = await api.signUp(formData);
          
          localStorage.setItem('profile', JSON.stringify(data));
          props.setProfile(JSON.parse(localStorage.getItem('profile')));
          router('/home');
        } catch (error) {
            console.log(error.response.data.message)
            setError(error.response.data.message)
        }
    };


    /**
     * method to handle signin functionality
     * @param {*} formData 
     * @param {*} router 
     */
    const signin = async (formData, router) => {
        try {
          const {data} = await api.signIn(formData);
          console.log(data)
          localStorage.setItem('profile', JSON.stringify(data));
          props.setProfile(JSON.parse(localStorage.getItem('profile')));
          console.log("setting profile");
          if(data.user.role==='admin'){
              router('/admin');
          }else{
            router('/home');
          }
          setError("")
        } catch (error) {
            console.log(error.response.data.message)
            setError(error.response.data.message)
        }
    };


    /**
     * method to toggle signup and signin
     * @param {*} event 
     */
    const handleSignUp = function(event){
        if (signUp){
            setSignUp(false);
        }else{
            setSignUp(true);
        }
        setError("")
        event.preventDefault();
    }

    return (
        <>
            <div>
                <label className="logo">Vocab360&deg;</label>
            </div>
            <form className="signupform">
                {signUp &&
                <>
                    <Input name="firstName" label="First Name" handleChange={handleChange}></Input>
                    <Input name="lastName" label="Last Name" handleChange={handleChange}></Input>
                </>
                }
                <Input name="userName" label="User Name" handleChange={handleChange}></Input>
                {signUp &&
                    <Input name="email" label="Email" handleChange={handleChange}></Input>
                }
                <Input name="password" type="password" label="Password" handleChange={handleChange}></Input>
                {signUp &&
                    <Input name="confirmPassword" type="password" label="Confirm Password" handleChange={handleChange}></Input>
                }
                <p className="errormsg">{error}</p>
                <button className="register" type="submit" onClick={handleSubmit}>{signUp?'Register':'Sign In'}</button>
            </form>
            {signUp && 
                <button className="alreadybtn" onClick={handleSignUp}>Already have an account? Sign In</button>
            }
            {!signUp && 
                <button className="alreadybtn" onClick={handleSignUp}>Dont have an account? SignUp</button>
            }
            
        </>
     );
}

export default Auth;