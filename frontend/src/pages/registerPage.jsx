import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage(){
    const[email, setEmail] = useState('');
    const[fname, setFName] = useState('');
    const[lname, setLName] = useState('');
    const[zip, setZip] = useState('');
    const[password, setPassword] = useState('');
    const[is18, setIs18] = useState('');

    async function registerUser(ev){
        ev.preventDefault();
        try {
            await axios.post('/client', {
                email,
                fname,
                lname,
                zip,
                password
                // is18
            });
            alert('Registration successful. Now you can log in');
        } catch (e) {
            alert(`Registration failed. ${e.message} Please try again later`);
        }


    }

    return (
        <div>
            <h1 className="text-4xl text-center mb-4">Create Account</h1>
            <form className="max-w-md mx-auto " onSubmit={registerUser}>
                <input type="email" placeholder="Email" 
                    value={email} 
                    onChange={ev => setEmail(ev.target.value)}></input>
                <input type="text" placeholder="First Name" 
                    value={fname} 
                    onChange={ev => setFName(ev.target.value)}></input>
                <input type="text" placeholder="Last Name"
                    value={lname} 
                    onChange={ev => setLName(ev.target.value)}></input>
                <input type="text" placeholder="Zip Code"
                    value={zip} 
                    onChange={ev => setZip(ev.target.value)}></input>
                <input type="password" placeholder="Password"
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}></input>
                <input type="password" placeholder="Confirm Password"></input>
                {/* <div  className="p-2">
                    <input type="checkbox" name="18check" 
                        value={is18} 
                        onChange={ev => setIs18(ev.target.value)}></input>
                    <label for="18check"> I am at least 18 years old (required)</label>
                </div> */}
                <button className="loginb">Submit</button>
                <div className="text-center py-2 gap-2 text-secondary">
                    Already have an account? <Link className="underline text-black" to={'/login'}>Login here</Link>
                </div>
            </form>
        </div>
    );
}