import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()
  const { itemCount } = useContext(CartContext)

  const isActive = (path) => location.pathname === path

  return (
    <div className="layout">
      {/* Navbar superior */}
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            ☕ Cafetería PWA
          </Link>
          <div className="navbar-spacer"></div>
          <Link to="/cart" className="navbar-cart">
            🛒 Carrito
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
        </div>
      </nav>

      {/* Espacio principal */}
      <main className="main-content">
        {children}
      </main>

      {/* Navegación inferior móvil */}
      <nav className="bottom-nav">
        <Link
          to="/"
          className={`nav-item ${isActive('/') ? 'active' : ''}`}
          title="Inicio"
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Inicio</span>
        </Link>

        <Link
          to="/menu"
          className={`nav-item ${isActive('/menu') ? 'active' : ''}`}
          title="Menú"
        >
          <span className="nav-icon">📋</span>
          <span className="nav-label">Menú</span>
        </Link>

        <Link
          to="/orders"
          className={`nav-item ${isActive('/orders') ? 'active' : ''}`}
          title="Pedidos"
        >
          <span className="nav-icon">📦</span>
          <span className="nav-label">Pedidos</span>
        </Link>

        <Link
          to="/cart"
          className={`nav-item ${isActive('/cart') ? 'active' : ''}`}
          title="Carrito"
        >
          <span className="nav-icon">🛒</span>
          <span className="nav-label">Carrito</span>
          {itemCount > 0 && <span className="nav-badge">{itemCount}</span>}
        </Link>
      </nav>
    </div>
  )
}

export default Layout
