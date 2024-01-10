import { Link } from "react-router-dom";

export default function LoginPage(){
    return (
        <div>
            <h1 className="text-4xl text-center mb-4">LOGIN</h1>
            <form className="max-w-md mx-auto ">
                <input type="email" placeholder="Email"></input>
                <input type="password" placeholder="Password"></input>
                <button className="loginb">Login</button>
                <div className="text-center py-2 gap-2 text-secondary">
                    Don't have an account yet? <Link className="underline text-black" to={'/register'}>SIGN UP</Link>
                </div>
            </form>
        </div>
    );
}