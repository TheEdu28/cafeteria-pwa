import { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { MinusIcon, PlusIcon, TrashIcon } from '../components/Icons'
import { products } from '../data/menu'
import './Cart.css'

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    total,
    clearCart,
    cafePoints,
    nextRewardThreshold,
    rewardSelection,
    rewardEligible,
    setRewardUse,
    selectRewardDrink,
    clearRewardSelection
  } = useContext(CartContext)
  const navigate = useNavigate()
  const [showRewardGrid, setShowRewardGrid] = useState(true)

  const rewardOptions = useMemo(() => {
    const available = products.filter(product => product.available)
    const beverages = available.filter(product => product.category === 'Bebidas')
    const cheapFood = available.filter(product => product.category !== 'Bebidas' && product.price < 80)
    return { beverages, cheapFood }
  }, [])

  const rewardRemaining = Math.max(nextRewardThreshold - cafePoints, 0)
  const paidItemsCount = cartItems.filter(item => !item.isReward).length
  const rewardItem = cartItems.find(item => item.isReward)

  useEffect(() => {
    if (!rewardEligible && rewardSelection.useReward) {
      clearRewardSelection()
    }
  }, [rewardEligible, rewardSelection.useReward, clearRewardSelection])

  useEffect(() => {
    if (!rewardSelection.useReward) {
      setShowRewardGrid(false)
      return
    }
    if (!rewardSelection.drinkId) {
      setShowRewardGrid(true)
    }
  }, [rewardSelection.useReward, rewardSelection.drinkId])

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
                <div className="item-title-row">
                  <h3 className="item-name">{item.name}</h3>
                  {item.isReward && <span className="item-reward-badge">Canje</span>}
                </div>
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
                <p className={`item-price ${item.isReward ? 'reward' : ''}`}>
                  {item.isReward ? 'Gratis' : `$${item.price}`}
                </p>
              </div>

              {item.isReward ? (
                <div className="item-reward-qty">Gratis</div>
              ) : (
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
              )}

              <div className="item-total">
                <p className={`item-subtotal ${item.isReward ? 'reward' : ''}`}>
                  {item.isReward ? 'Gratis' : `$${(item.price * item.quantity).toFixed(2)}`}
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
              <span>Total ({paidItemsCount} {paidItemsCount === 1 ? 'artículo' : 'artículos'}):</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="reward-section">
            <h3>Canjear Producto Gratis</h3>
            {rewardEligible ? (
              <>
                <div className="reward-question">
                  <span>Quieres cobrar tu producto gratis?</span>
                  <div className="reward-options">
                    <label className="reward-option">
                      <input
                        type="radio"
                        name="reward-cart"
                        checked={rewardSelection.useReward}
                        onChange={() => {
                          setRewardUse(true)
                          setShowRewardGrid(true)
                        }}
                      />
                      Si
                    </label>
                    <label className="reward-option">
                      <input
                        type="radio"
                        name="reward-cart"
                        checked={!rewardSelection.useReward}
                        onChange={() => {
                          setRewardUse(false)
                          setShowRewardGrid(false)
                        }}
                      />
                      Mas tarde
                    </label>
                  </div>
                </div>

                {rewardSelection.useReward && showRewardGrid && (
                  <div className="reward-select">
                    <p className="reward-select-title">Elige tu producto gratis</p>
                    <div className="reward-group">
                      <p className="reward-group-title">Bebidas</p>
                      <div className="reward-grid">
                        {rewardOptions.beverages.map(product => (
                          <button
                            key={product.id}
                            type="button"
                            className={`reward-card ${rewardSelection.drinkId === product.id ? 'selected' : ''}`}
                            onClick={() => {
                              selectRewardDrink(product)
                              setShowRewardGrid(false)
                            }}
                            aria-pressed={rewardSelection.drinkId === product.id}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="reward-card-image"
                              loading="lazy"
                            />
                            <span className="reward-card-name">{product.name}</span>
                            <span className="reward-card-meta">{product.category}</span>
                            <span className="reward-card-price">${product.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="reward-group">
                      <p className="reward-group-title">Comida barata</p>
                      <div className="reward-grid">
                        {rewardOptions.cheapFood.map(product => (
                          <button
                            key={product.id}
                            type="button"
                            className={`reward-card ${rewardSelection.drinkId === product.id ? 'selected' : ''}`}
                            onClick={() => {
                              selectRewardDrink(product)
                              setShowRewardGrid(false)
                            }}
                            aria-pressed={rewardSelection.drinkId === product.id}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="reward-card-image"
                              loading="lazy"
                            />
                            <span className="reward-card-name">{product.name}</span>
                            <span className="reward-card-meta">{product.category}</span>
                            <span className="reward-card-price">${product.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="reward-note">Al canjear se descuentan 50 CafePuntos</p>
                  </div>
                )}

                {rewardSelection.useReward && !showRewardGrid && rewardItem && (
                  <div className="reward-summary">
                    <div className="reward-summary-card">
                      <img
                        src={rewardItem.image}
                        alt={rewardItem.rewardOriginalName || rewardItem.name}
                        className="reward-summary-image"
                        loading="lazy"
                      />
                      <div className="reward-summary-info">
                        <p className="reward-summary-name">
                          {rewardItem.rewardOriginalName || rewardItem.name}
                        </p>
                        <p className="reward-summary-meta">{rewardItem.category}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="reward-change"
                      onClick={() => setShowRewardGrid(true)}
                    >
                      Cambiar
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="reward-message">
                Te faltan {rewardRemaining} CafePuntos para canjear tu producto gratis.
              </p>
            )}
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
