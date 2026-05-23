import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { MinusIcon, PlusIcon, TrashIcon } from '../components/Icons'
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
        <h1>Carrito de Compras</h1>
        <div className="empty-cart">
          <p className="empty-cart-message">Tu carrito está vacío</p>
          <p className="empty-cart-subtitle">Agrega productos del menú para comenzar</p>
          <Link to="/menu" className="continue-shopping-btn">
            Explorar Menú
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>

      <div className="cart-content">
        {/* Listado de productos */}
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-category">{item.category}</p>
                {item.customizations && item.customizations.length > 0 && (
                  <div className="item-customizations">
                    <p className="customizations-label">Personalizaciones:</p>
                    <ul className="customizations-list">
                      {item.customizations.map(custom => (
                        <li key={custom.id} className="customization-item">{custom.label}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="item-price">${item.price}</p>
              </div>

              <div className="item-quantity">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label={`Disminuir cantidad de ${item.name}`}
                >
                  <MinusIcon size={16} />
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
                  aria-label={`Cantidad de ${item.name}`}
                />
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={`Aumentar cantidad de ${item.name}`}
                >
                  <PlusIcon size={16} />
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
                aria-label={`Eliminar ${item.name} del carrito`}
                title="Eliminar del carrito"
              >
                <TrashIcon size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Resumen del carrito */}
        <div className="cart-summary">
          <h2>Resumen de Compra</h2>

          <div className="summary-items">
            <div className="summary-row">
              <span>Total ({cartItems.length} {cartItems.length === 1 ? 'artículo' : 'artículos'}):</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>A Pagar:</span>
            <span className="total-amount">${total.toFixed(2)}</span>
          </div>

          <div className="cart-actions">
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              aria-label="Continuar con la compra"
            >
              Continuar con la Compra
            </button>

            <Link to="/menu" className="continue-shopping-btn secondary">
              Seguir Comprando
            </Link>

            <button
              className="clear-cart-btn"
              onClick={clearCart}
              aria-label="Vaciar carrito"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
