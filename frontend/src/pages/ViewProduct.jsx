import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

import Update from "../components/products/Update";
import Delete from "../components/products/Delete";

const ViewProduct = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`http://127.0.0.1:3001/api/products/read?id=${id}`)
            if (res.status === "error") {
                setError(res.data.message);
                return;
            }
            setProduct(res.data.product);
        }
        fetchProduct()
    }, [id]);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-start">
            <div id="form" className="w-[80%] flex flex-col justify-between items-center mt-8">
                {error && (
                    <div role="alert" className="alert alert-error w-full mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}
                <div className="flex flex-row w-full mb-2">
                    <label htmlFor="name" className="w-1/6 text-xl">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Type here"
                        className="input w-5/6"
                        value={product ? product.name : ''}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    />
                </div>
                <div className="flex flex-row w-full mb-2">
                    <label htmlFor="price" className="w-1/6 text-xl">Price</label>
                    <input
                        type="number"
                        id="price"
                        placeholder="Type here"
                        className="input w-5/6"
                        value={product ? product.price : ''}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    />
                </div>
                <div className="flex flex-row w-full mb-2">
                    <label htmlFor="cost" className="w-1/6 text-xl">Cost</label>
                    <input
                        type="number"
                        id="cost"
                        placeholder="Type here"
                        className="input w-5/6"
                        value={product ? product.cost : ''}
                        onChange={(e) => setProduct({ ...product, cost: e.target.value })}
                    />
                </div>
            </div>
            <div className="w-[80%] mt-5 flex flex-row justify-end items-center">
                <Delete product={product} onError={(v) => setError(v)} />
                <Update product={product} onError={(v) => setError(v)} />
            </div>
        </div>
    )
}

export default ViewProduct;