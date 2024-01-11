import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            await axios.post('/login', {email, password});
            alert('Login Successful');
            //console.log('Login Successful');
        } catch (e) {
            alert(`Login failed: ${e}`);
            //console.log('Login Failed');
        }
        
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