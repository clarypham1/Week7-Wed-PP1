const ProductListing = ({ product }) => {
    return (
        <div className="product-preview">
            <h3>{product.productName}</h3>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>{product.description}</p>
        </div>
    );
};

export default ProductListing;