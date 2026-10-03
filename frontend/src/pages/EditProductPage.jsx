import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"

const EditProductPage = () => {
    const { id } = useParams();

    const [productName, setProductName] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [inventoryCount, setInventoryCount] = useState("")

    const [supplierName, setSupplierName] = useState("");
    const [supplierEmail, setSupplierEmail] = useState("");
    const [supplierPhone, setSupplierPhone] = useState("");
    const [isVerified, setIsVerified] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/product/${id}`);
                if (!res.ok) {
                    throw new Error("could not fetch the data for that product");
                }
                const data = await res.json();
                setProductName(data.productName);
                setCategory(data.category);
                setDescription(data.description);
                setPrice(data.price);
                setInventoryCount(data.inventoryCount);
                setSupplierName(data.supplier.name);
                setSupplierEmail(data.supplier.contactEmail);
                setSupplierPhone(data.supplier.contactPhone);
                setIsVerified(data.supplier.isVerified);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [id]);

    const UpdateProduct = async (updatedProduct) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user ? user.token : null;
        try {
            const res = await fetch(`/api/product/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedProduct),
            });
            if (!res.ok) {
                throw new Error("Failed to update product");
            }
        } catch (error) {
            console.error(error);
            return false;
        }
        return true;
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            productName: productName,
            category: category,
            description: description, price: Number(price),
            inventoryCount: Number(inventoryCount),
            supplier: {
                name: supplierName,
                contactEmail: supplierEmail,
                contactPhone: supplierPhone,
                isVerified: isVerified,
            }
        }

        const success = await UpdateProduct(updatedProduct);

        if (success) {
            return navigate(`/products/${id}`);
        }
    }

    return(
        <div className = "create" >
            <h2>Update Product</h2>
            <form onSubmit={submitForm}>
                <label>Product Name:</label>
                <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <label>Product category:</label>
                <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <label>Product description:</label>
                <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Product price:</label>
                <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label>Product inventoryCount:</label>
                <input
                    type="number"
                    required
                    value={inventoryCount}
                    onChange={(e) => setInventoryCount(e.target.value)}
                />
                <label>Product Supplier Name:</label>
                <input
                    type="text"
                    required
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                />
                <label>Product Supplier Email:</label>
                <input
                    type="text"
                    required
                    value={supplierEmail}
                    onChange={(e) => setSupplierEmail(e.target.value)}
                />
                <label>Product Supplier Phone:</label>
                <input
                    type="text"
                    required
                    value={supplierPhone}
                    onChange={(e) => setSupplierPhone(e.target.value)}
                />
                <label>Product Supplier Verification:</label>
                <select
                    type="boolean"
                    required
                    value={isVerified}
                    onChange={(e) => setIsVerified(e.target.value)}>
                    <option value="">Select Something</option>
                    <option>true</option>
                    <option>false</option>
                </select>
                <button>Update Product</button>
            </form>
        </div >
    );
};


export default EditProductPage;