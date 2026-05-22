import { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { CheckCircle2Icon, AlertCircleIcon } from '../components/Icons'
import './Confirmation.css'

const Confirmation = () => {
  const navigate = useNavigate()
  const { cartItems, selectedSchedule, total, completeOrder } = useContext(CartContext)
  const [confirmed, setConfirmed] = useState(false)
  const [confirmError, setConfirmError] = useState(null)
  const [order, setOrder] = useState(null)

  // Redirigir si no hay carrito o horario seleccionado
  useEffect(() => {
    if (cartItems.length === 0 || !selectedSchedule) {
      navigate('/menu')
    }
  }, [cartItems, selectedSchedule, navigate])

  const handleConfirmOrder = () => {
    try {
      const newOrder = completeOrder({
        orderNumber: `ORD-${Date.now().toString().slice(-8)}`
      })
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
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Impuestos (10%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row divider">
                  <span>Total:</span>
                  <span className="total-price">${finalTotal.toFixed(2)}</span>
                </div>
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
