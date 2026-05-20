import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import './Cart.css'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, total, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/schedule')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>🛒 Carrito</h1>
        <div className="empty-cart">
          <p className="empty-cart-message">Tu carrito está vacío</p>
          <p className="empty-cart-subtitle">¡Agrega productos del menú para comenzar!</p>
          <Link to="/menu" className="continue-shopping-btn">
            Ir al menú
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1>🛒 Carrito</h1>

      <div className="cart-content">
        {/* Listado de productos */}
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-category">{item.category}</p>
                <p className="item-price">${item.price}</p>
              </div>

              <div className="item-quantity">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  title="Disminuir cantidad"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1
                    updateQuantity(item.id, value)
                  }}
                  className="qty-input"
                />
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  title="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              <div className="item-total">
                <p className="item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                title="Eliminar del carrito"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Resumen del carrito */}
        <div className="cart-summary">
          <h2>Resumen</h2>

          <div className="summary-items">
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items):</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>

            <div className="summary-row">
              <span>Impuestos:</span>
              <span>${(total * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total:</span>
            <span className="total-amount">${(total * 1.1).toFixed(2)}</span>
          </div>

          <div className="cart-actions">
            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Continuar con la compra
            </button>

            <Link to="/menu" className="continue-shopping-btn secondary">
              Seguir comprando
            </Link>

            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
