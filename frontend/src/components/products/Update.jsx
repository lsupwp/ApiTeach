import axios from "axios"

const Update = ({ product, onError }) => {

    const handleUpdate = async () => {
        const res = await axios.post("http://127.0.0.1:3001/api/products/update", {
            withCredentials: true,
            ...product
        })
        if(res.data.status === "error") {
            onError(res.data.message);
            return;
        }
        onError(null);
        alert("Product updated successfully!");
        window.location.href = `/product/${product.id}`;
    }

    return (
        <>
            <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
        </>
    )
}

export default Update;