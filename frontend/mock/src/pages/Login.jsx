import React, { useState } from "react";
import {Link} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlelogin = (e) => {
        e.preventDefault();
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handlelogin}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>

                <small>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </small>
            </form>
        </div>
    )
}

export default Login;