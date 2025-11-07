import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function SignUp() {
    const [user_info, setUser_info] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [submit, setSubmit] = useState(false);


    function validate() {
        const newErrors = {};

        if (!user_info.name.trim()) {
            newErrors.name = "Name is required";
        } else if (user_info.name.length < 3) {
            newErrors.name = "Name must have at least three(3) characters";
        }

        if (!user_info.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(user_info.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!user_info.password) {
            newErrors.password = 'Password is required';
        } else if (user_info.password.length < 6) {
            newErrors.password = "Password must have at least 6 characters";
        }
        
        return newErrors;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setUser_info({
            ...user_info,
            [name]: value
        });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
        setApiError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);
            setErrors({});
            setSuccess("");

            const response = await fetch("http://localhost:8000/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user_info),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Signup failed. Please try again!");
            }

            setSubmit(true);
            setSuccess("Registration successful!");
            setUser_info({ name: "", email: "", password: "" });

        } catch (error) {
            setApiError(error.message);
        } finally {
            setLoading(false);
        }
        
    }

    return (
        <div className="cont">
            <form onSubmit={handleSubmit} className="input_cont">
                <h1>SignUp</h1>

                <div className="name_cont">
                    <label>Name</label>
                    <input 
                        type="text"
                        name="name"
                        value={user_info.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                    {errors.name && <p style={{ color: 'red', margin: 0, marginTop: 6, fontSize: 14, textAlign: 'left'}}>{errors.name}</p>}
                </div>

                <div className="email_cont">
                    <label>Email address</label>
                    <input 
                        type="email"
                        name="email"
                        value={user_info.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p style={{ color: 'red', margin: 0, marginTop: 6, fontSize: 14, textAlign: 'left'}}>{errors.email}</p>}
                </div>

                <div className="password_cont">
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        value={user_info.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p style={{ color: 'red', margin: 0, marginTop: 6, fontSize: 14, textAlign: 'left'}}>{errors.password}</p>}
                </div>

                <button className="sign-in" type="submit" disabled={loading}>
                    <Link to="/" className="nav">
                        {loading ? "Signing up..." : "Sign up"}
                    </Link>
                </button>

                {apiError && <p style={{ color: 'green', margin: 0, marginTop: 6, fontSize: 14, textAlign: 'center'}}>{apiError}</p>}
                {success && <p style={{ color: 'green', margin: 0, marginTop: 6, fontSize: 14, textAlign: 'center'}}>{success}</p>}

                <p>Already have an account? <span><NavLink to="/" className="navigate">Sign in</NavLink></span></p>
            </form>
        </div>
    )
}

export default SignUp;