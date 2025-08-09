import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router"; // ถ้าใช้ react-router-dom เปลี่ยนเป็น react-router-dom

const ViewAllProduct = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(
                "http://127.0.0.1:3001/api/products/read",
                { withCredentials: true }
            );
            setProducts(data.products ?? []);
        };
        fetchProduct();
    }, []);

    // debounce 200ms
    useEffect(() => {
        const id = setTimeout(
            () => setDebouncedSearch(search.trim().toLowerCase()),
            200
        );
        return () => clearTimeout(id);
    }, [search]);

    // คำนวณผลลัพธ์จาก products + debouncedSearch (ไม่ต้องเก็บ state ซ้ำ)
    const filteredProducts = useMemo(() => {
        if (!debouncedSearch) return products;
        return products.filter((p) =>
            (p.name ?? "").toLowerCase().includes(debouncedSearch)
        );
    }, [products, debouncedSearch]);

    const handleSearch = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-center items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search Product"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                        <p className="text-gray-600 mb-4">Price: {item.price}</p>
                        <p className="text-gray-600 mb-4">Cost: {item.cost}</p>
                        <Link
                            to={`/product/${item.id}`}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewAllProduct;
