import axios from "axios";

const Delete = ({product, onError})=>{

    const handleDelete = async () => {
        const res = await axios.post("http://127.0.0.1:3001/api/products/delete", {
            withCredentials: true,
            id: product.id
        })

        if(res.data.status === "error") {
            onError(res.data.message);
            return;
        }
        onError(null);
        alert("Product deleted successfully!");
        window.location.href = `/products`;
    }

    return (
        <>
            <button className="btn btn-error mr-5" onClick={handleDelete}>Delete</button>
        </>
    )
}

export default Delete;