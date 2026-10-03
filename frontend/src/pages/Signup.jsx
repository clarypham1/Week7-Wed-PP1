import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [accountType, setAccountType] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: fullName,
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber,
                    gender: gender,
                    date_of_birth: dateOfBirth,
                    accountType: accountType,
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
            <h2>Sign Up</h2>
            <form onSubmit={submitForm}>
                <label>Full Name:</label>
                <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
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
                <label>Phone Number:</label>
                <input
                    type="text"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label>Gender:</label>
                <select
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Something</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <label>Date of Birth:</label>
                <input
                    type="date"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <label>Account Type:</label>
                <input
                    type="text"
                    required
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                />
                <button>Sign Up</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default Signup;