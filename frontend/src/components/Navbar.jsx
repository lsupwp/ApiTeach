import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav className="bg-blue-50 px-8 py-4 shadow-lg border-b border-blue-200">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
                <div className="text-2xl font-semibold text-blue-800 tracking-wide">
                    Product Manager
                </div>
                <div className="flex gap-8 items-center">
                    <Link 
                        to="/" 
                        className="text-blue-600 font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 text-sm"
                    >
                        Home
                    </Link>
                    <Link 
                        to="/products" 
                        className="text-blue-600 font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 text-sm"
                    >
                        View All Products
                    </Link>
                    <Link 
                        to="/products/create" 
                        className="text-blue-600 font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 text-sm"
                    >
                        Create Product
                    </Link>
                    <Link 
                        to="/products/update" 
                        className="text-blue-600 font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 text-sm"
                    >
                        Update Product
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;