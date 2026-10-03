import ProductListing from "./ProductListing";

const ProductListings = ({ products }) => {
    return (
    <div className="product-list">
        {products.map((product) => (
            <ProductListing key={product._id} product={product} />
        ))}
    </div>
    );
};

export default ProductListings; 