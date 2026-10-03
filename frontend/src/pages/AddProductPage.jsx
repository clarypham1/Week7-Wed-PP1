import { useState } from 'react';
import { useNavigate } from "react-router-dom"

const AddProductPage = () => {
    const [productName, setProductName] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [inventoryCount, setInventoryCount] = useState("")
    const [supplier, setSupplier] = useState("")

    const [supplierName, setSupplierName] = useState("");
    const [supplierEmail, setSupplierEmail] = useState("");
    const [supplierPhone, setSupplierPhone] = useState("");
    const [isVerified, setIsVerified] = useState(false)

    const navigate = useNavigate();

    const AddProduct = async (newProduct) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user ? user.token : null;
        try {
            const res = await fetch("/api/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newProduct),
            });
            if (!res.ok) {
                throw new Error("Failed to add product");
            }
        } catch (error) {
            console.error(error);
            return false;
        }
        return true;
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const newProduct = {
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


        const success = await AddProduct(newProduct);
        // console.log("adds ", newProduct)

        if (success) {
            return navigate("/");
        }
            }

    return(
        <div className = "create" >
            <h2>Add a new Product!</h2>
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
                <button>Add Product</button>
            </form>
        </div >
    );
};


export default AddProductPage;