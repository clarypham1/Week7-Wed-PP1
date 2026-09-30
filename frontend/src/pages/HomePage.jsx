import { useState, useEffect } from "react";
import ProductListings from "../components/ProductListings";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product");
        if (!res.ok) {
          throw new Error("could not fetch the data for that resource");
        }
        const data = await res.json();
        setIsPending(false);
        setProducts(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {products && <ProductListings products={products} />}
    </div>
  );
};

export default HomePage;
 
