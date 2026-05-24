import { useState, useContext, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { CheckCircle2Icon, AlertCircleIcon } from '../components/Icons'
import { products } from '../data/menu'
import './Confirmation.css'

const Confirmation = () => {
  const navigate = useNavigate()
  const {
    cartItems,
    selectedSchedule,
    total,
    completeOrder,
    editingOrderId,
    updateOrder,
    calcPoints,
    cafePoints,
    nextRewardThreshold,
    rewardSelection,
    rewardEligible,
    setRewardUse,
    selectRewardDrink,
    clearRewardSelection
  } = useContext(CartContext)
  const [confirmed, setConfirmed] = useState(false)
  const [confirmError, setConfirmError] = useState(null)
  const [order, setOrder] = useState(null)
  const [showRewardGrid, setShowRewardGrid] = useState(true)
  const pointsPreview = calcPoints(total)
  const rewardOptions = useMemo(() => {
    const available = products.filter(product => product.available)
    const beverages = available.filter(product => product.category === 'Bebidas')
    const cheapFood = available.filter(product => product.category !== 'Bebidas' && product.price < 80)
    return { beverages, cheapFood }
  }, [])
  const rewardRemaining = Math.max(nextRewardThreshold - cafePoints, 0)
  const rewardItem = cartItems.find(item => item.isReward)

  // Redirigir si no hay carrito o horario seleccionado
  useEffect(() => {
    if (cartItems.length === 0 || !selectedSchedule) {
      navigate('/menu')
    }
  }, [cartItems, selectedSchedule, navigate])

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

  const handleConfirmOrder = () => {
    try {
      if (rewardSelection.useReward && !rewardSelection.drinkId) {
        setConfirmError('Selecciona tu producto gratis.')
        return
      }
      let newOrder
      
      if (editingOrderId) {
        // Modo edición: actualizar el pedido existente
        newOrder = updateOrder(editingOrderId, {
          orderNumber: `ORD-${Date.now().toString().slice(-8)}`
        })
      } else {
        // Modo nuevo pedido: crear uno nuevo
        newOrder = completeOrder({
          orderNumber: `ORD-${Date.now().toString().slice(-8)}`
        })
      }
      
      setOrder(newOrder)
      setConfirmed(true)
    } catch (error) {
      setConfirmError('Hubo un error al confirmar tu pedido. Intenta de nuevo.')
      console.error(error)
    }
  }

  if (confirmed && order) {
    return (
      <div className="confirmation-container">
        <section className="confirmation-success">
          <div className="success-icon">
            <CheckCircle2Icon size={64} />
          </div>
          <h1>¡Pedido Confirmado!</h1>
          <p className="order-number">Pedido #{order.orderNumber}</p>
          <p className="success-message">Tu pedido ha sido confirmado exitosamente</p>
          <p className="success-details">
            Recibirás una confirmación en tu correo electrónico
          </p>

          <div className="order-summary">
            <div className="summary-section">
              <h3>Fecha y Hora de Recolección</h3>
              <p className="summary-value">
                {order.schedule.date} a las {order.schedule.time}
              </p>
            </div>

            <div className="summary-section">
              <h3>Total a Pagar</h3>
              <p className="summary-value price">${order.total.toFixed(2)}</p>
            </div>

            <div className="summary-section">
              <h3>CafePuntos Ganados</h3>
              <p className="summary-value">+{order.earnedPoints} puntos</p>
            </div>

            {order.rewardUsed && (
              <div className="summary-section">
                <h3>Producto gratis canjeado</h3>
                <p className="summary-value">{order.rewardDrinkName}</p>
              </div>
            )}

            <div className="summary-section">
              <h3>Número de Artículos</h3>
              <p className="summary-value">
                {order.items.length} {order.items.length === 1 ? 'artículo' : 'artículos'}
              </p>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/orders" className="view-orders-btn">
              Ver Mis Pedidos
            </Link>
            <Link to="/menu" className="new-order-btn secondary">
              Hacer Otro Pedido
            </Link>
          </div>
        </section>
      </div>
    )
  }

  if (cartItems.length === 0 || !selectedSchedule) {
    return (
      <div className="confirmation-container">
        <section className="confirmation-error">
          <AlertCircleIcon size={48} />
          <h1>Información Incompleta</h1>
          <p>Tu carrito o horario no está disponible.</p>
          <Link to="/menu" className="back-link">
            Volver al menú
          </Link>
        </section>
      </div>
    )
  }

  const taxAmount = total * 0.1
  const finalTotal = total + taxAmount

  return (
    <div className="confirmation-container">
      <header className="confirmation-header">
        <h1>Confirmar Pedido</h1>
        <p>Revisa los detalles antes de confirmar</p>
      </header>

      <section className="confirmation-content">
        <div className="confirmation-grid">
          {/* Detalles del pedido */}
          <div className="order-details">
            <h2 className="section-title">Tu Pedido</h2>
            <div className="items-list">
              {cartItems.map((item, index) => (
                <div key={index} className="detail-item">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <span className="item-quantity">x {item.quantity}</span>
                  </div>
                  
                  {item.customizations && item.customizations.length > 0 && (
                    <div className="item-customizations">
                      <p className="customizations-label">Personalizaciones:</p>
                      <ul className="customizations-list">
                        {item.customizations.map(custom => (
                          <li key={custom.id} className="customization-item">
                            • {custom.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="item-category">{item.category}</p>
                  <p className="item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen y confirmación */}
          <div className="confirmation-summary">
            <h2 className="section-title">Resumen</h2>

            <div className="summary-card">
              {/* Fecha y hora */}
              <div className="summary-box">
                <h3>Recolección</h3>
                <p className="summary-value">
                  <strong>{selectedSchedule.date}</strong>
                </p>
                <p className="summary-value">
                  <strong className="highlight">{selectedSchedule.time}</strong>
                </p>
              </div>

              {/* Totales */}
              <div className="summary-box">
                <div className="summary-row divider">
                  <span>Total a Pagar:</span>
                  <span className="total-price">${total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>CafePuntos que ganaras en este pedido:</span>
                  <span className="total-price">+{pointsPreview}</span>
                </div>
              </div>

              <div className="summary-box reward-box">
                <h3>Canjear Producto Gratis</h3>
                {rewardEligible ? (
                  <>
                    <div className="reward-question">
                      <span>Quieres cobrar tu producto gratis?</span>
                      <div className="reward-options">
                        <label className="reward-option">
                          <input
                            type="radio"
                            name="reward-confirmation"
                            checked={rewardSelection.useReward}
                            onChange={() => {
                              setConfirmError(null)
                              setRewardUse(true)
                              setShowRewardGrid(true)
                            }}
                          />
                          Si
                        </label>
                        <label className="reward-option">
                          <input
                            type="radio"
                            name="reward-confirmation"
                            checked={!rewardSelection.useReward}
                            onChange={() => {
                              setConfirmError(null)
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
                                  setConfirmError(null)
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
                                  setConfirmError(null)
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
                        <div className="reward-summary-actions">
                          <button
                            type="button"
                            className="reward-change"
                            onClick={() => setShowRewardGrid(true)}
                          >
                            Cambiar
                          </button>
                          <button
                            type="button"
                            className="reward-remove"
                            onClick={() => {
                              clearRewardSelection()
                              setRewardUse(false)
                              setShowRewardGrid(false)
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="reward-message">
                    Te faltan {rewardRemaining} CafePuntos para canjear tu producto gratis.
                  </p>
                )}
              </div>

              {/* Avisos */}
              <div className="confirmation-notes">
                <p className="note">
                  ✓ Tu pedido será preparado según la hora seleccionada
                </p>
                <p className="note">
                  ✓ Se te enviará una confirmación por correo
                </p>
                <p className="note">
                  ✓ Puedes cancelar o modificar tu pedido desde "Mis Pedidos"
                </p>
              </div>

              {confirmError && (
                <div className="error-message" role="alert">
                  <AlertCircleIcon size={18} />
                  <span>{confirmError}</span>
                </div>
              )}

              {/* Botones de acción */}
              <div className="confirmation-actions">
                <button
                  className="confirm-btn"
                  onClick={handleConfirmOrder}
                  aria-label="Confirmar pedido"
                >
                  Confirmar Pedido
                </button>

                <Link to="/schedule" className="modify-btn">
                  Cambiar Horario
                </Link>

                <Link to="/cart" className="back-btn">
                  Volver al Carrito
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Confirmation
