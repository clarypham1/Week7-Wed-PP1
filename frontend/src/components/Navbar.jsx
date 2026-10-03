import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
    };

    return (
        <nav className="navbar">
            <Link to="/">
                <h1>Product Store</h1>
            </Link>
            <div className="links">
                {isAuthenticated ? (
                    <div>
                        <Link to="/add-product">Add Product</Link>
                        <span>{user && user.email}</span>
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                ) : (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;