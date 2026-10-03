import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductPage = ({ isAuthenticated }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/product/${id}`);
                if (!res.ok) {
                    throw new Error("could not fetch the data for that product");
                }
                const data = await res.json();
                setIsPending(false);
                setProduct(data);
                setError(null);
            } catch (err) {
                setIsPending(false);
                setError(err.message);
            }
        };
        fetchProduct();
    }, [id]);

    const DeleteProduct = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user ? user.token : null;
        try {
            const res = await fetch(`/api/product/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error("Failed to delete product");
            }
        } catch (error) {
            console.error(error);
            return false;
        }
        return true;
    };

    const onDeleteClick = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        const success = await DeleteProduct();
        if (success) {
            return navigate("/");
        }
    };

    return (
        <div className="product-details">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {product && (
                <article>
                    <h2>{product.productName}</h2>
                    <p>Category: {product.category}</p>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    <p>Inventory Count: {product.inventoryCount}</p>

                    <h3>Supplier</h3>
                    <p>Name: {product.supplier.name}</p>
                    <p>Email: {product.supplier.contactEmail}</p>
                    <p>Phone: {product.supplier.contactPhone}</p>
                    <p>Verified: {product.supplier.isVerified ? "Yes" : "No"}</p>

                    {isAuthenticated && (
                        <div>
                            <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
                            <button onClick={onDeleteClick}>Delete</button>
                        </div>
                    )}
                </article>
            )}
            <button onClick={() => navigate("/")}>Back</button>
        </div>
    );
};

export default ProductPage;