import React, { useState} from "react";
import { Link } from "react-router-dom";

function Signup () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />

                <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Sign Up</button>

                <small>
                    Already have an account? <Link to="/">Login</Link>
                </small>
            </form>
        </div>
    )
}

export default Signup;