import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewProduct = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/api/products/read?id=${id}`)
            .then(response => {
                console.log(response.data);
                setProduct(response.data.product);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    return (
        <div>
            <h1>View Product : {id}</h1>
            <p>Name: {product?.name}</p>
            <p>Price: {product?.price}</p>
            <p>Cost: {product?.cost}</p>
        </div>
    )
}

export default ViewProduct;