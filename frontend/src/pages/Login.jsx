import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error);
                return;
            }

            localStorage.setItem("user", JSON.stringify(data));
            setIsAuthenticated(true);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="create">
            <h2>Log In</h2>
            <form onSubmit={submitForm}>
                <label>Email:</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Log In</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default Login;