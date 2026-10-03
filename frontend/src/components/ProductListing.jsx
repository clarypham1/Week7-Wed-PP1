import { Link } from "react-router-dom";

const ProductListing = ({ product }) => {
    return (
        <div className="product-preview">
            <Link to={`/products/${product._id}`}>
                <h3>{product.productName}</h3>
            </Link>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>{product.description}</p>
        </div>
    );
};

export default ProductListing;