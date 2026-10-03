import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import ProductPage from "./pages/ProductPage";
import EditProductPage from "./pages/EditProductPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
// import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? true : false;
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="content">
          <Routes>
            {<Route path="/" element={<Home />} />}
            <Route path="/add-product" element={isAuthenticated ? <AddProductPage /> : <Navigate to="/signup" />} />
            <Route path="/products/:id" element={<ProductPage isAuthenticated={isAuthenticated} />} />
            <Route path="/edit/:id" element={isAuthenticated ? <EditProductPage /> : <Navigate to="/signup" />} />
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;