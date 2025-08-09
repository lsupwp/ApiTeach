import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter, Routes, Route } from "react-router";
import ViewProduct from './pages/ViewProduct.jsx';
import ViewAllProduct from './pages/ViewAllProduct.jsx';
import CreateProduct from './pages/CreateProduct.jsx';
import UpdateProduct from './pages/UpdateProduct.jsx';
import Layout from './components/Layout.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route path="/products" element={<ViewAllProduct />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/update" element={<UpdateProduct />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
