import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { UserContext } from "../userContext";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    //const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const userInfo = await axios.post('/login', {email, password});
            localStorage.setItem("_id", userInfo.data._id);
            localStorage.setItem('fname', userInfo.data.fname);
            //setUser(userInfo.data);
            alert('Login Successful');
            setRedirect(true);
        } catch (e) {
            alert(`Login failed: ${e.response.data}`);
            //console.log('Login Failed');
        }

    }

    if(redirect){
        // const navigate = useNavigate();
        // const refresh = () => {
        //     navigate(0);
        //}
        return (<Navigate to={'/'} />);
    }
    

    return (
        <div>
            <h1 className="text-4xl text-center mb-4">LOGIN</h1>
            <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="Email" 
                    value={email} 
                    onChange={ev => setEmail(ev.target.value)}></input>
                <input type="password" placeholder="Password" 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}></input>
                <button className="loginb">Login</button>
                <div className="text-center py-2 gap-2 text-secondary">
                    Don't have an account yet? <Link className="underline text-black" to={'/register'}>SIGN UP</Link>
                </div>
            </form>
        </div>
    );
}