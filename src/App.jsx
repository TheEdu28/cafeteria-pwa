import { Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Layout from "./components/Layout"

import Home from "./pages/Home"
import Menu from "./pages/Menu"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Schedule from "./pages/Schedule"
import Confirmation from "./pages/Confirmation"
import Orders from "./pages/Orders"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </CartProvider>
  )
}

export default App