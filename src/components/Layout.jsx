import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import {
  ShoppingCartIcon,
  HomeIcon,
  MenuIcon,
  OrdersIcon
} from './Icons'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()
  const { itemCount } = useContext(CartContext)

  const isActive = (path) => location.pathname === path

  return (
    <div className="layout">
      {/* Navbar superior */}
      <header className="navbar" role="banner">
        <nav className="navbar-content" aria-label="Navegación principal">
          <Link to="/" className="navbar-logo" aria-label="U-COFFEE - Inicio">
            <img src="/ImagenesMenu/Logo.png" alt="U-COFFEE logo" className="logo-img" />
          </Link>
          <div className="navbar-spacer"></div>
          <Link to="/cart" className="navbar-cart" aria-label={`Carrito${itemCount > 0 ? ` con ${itemCount} artículos` : ''}`}>
            <ShoppingCartIcon size={24} className="cart-icon" />
            <span className="cart-text">Carrito</span>
            {itemCount > 0 && <span className="cart-badge" aria-label={`${itemCount} artículos`}>{itemCount}</span>}
          </Link>
        </nav>
      </header>

      {/* Espacio principal */}
      <main className="main-content" role="main">
        {children}
      </main>

      {/* Navegación inferior móvil */}
      <nav className="bottom-nav" aria-label="Navegación móvil" role="navigation">
        <Link
          to="/"
          className={`nav-item ${isActive('/') ? 'active' : ''}`}
          aria-label="Inicio"
          aria-current={isActive('/') ? 'page' : undefined}
        >
          <span className="nav-icon">
            <HomeIcon size={20} />
          </span>
          <span className="nav-label">Inicio</span>
        </Link>

        <Link
          to="/menu"
          className={`nav-item ${isActive('/menu') ? 'active' : ''}`}
          aria-label="Menú"
          aria-current={isActive('/menu') ? 'page' : undefined}
        >
          <span className="nav-icon">
            <MenuIcon size={20} />
          </span>
          <span className="nav-label">Menú</span>
        </Link>

        <Link
          to="/orders"
          className={`nav-item ${isActive('/orders') ? 'active' : ''}`}
          aria-label="Pedidos"
          aria-current={isActive('/orders') ? 'page' : undefined}
        >
          <span className="nav-icon">
            <OrdersIcon size={20} />
          </span>
          <span className="nav-label">Pedidos</span>
        </Link>
      </nav>
    </div>
  )
}

export default Layout
