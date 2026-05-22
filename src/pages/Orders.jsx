import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { ChevronDownIcon, CheckCircle2Icon, ClockIcon, XCircleIcon } from '../components/Icons'
import './Orders.css'

const Orders = () => {
  const { completedOrders, cancelOrder } = useContext(CartContext)
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [cancelledOrder, setCancelledOrder] = useState(null)

  // Separar pedidos activos y completados
  const activeOrders = completedOrders.filter(order => order.status !== 'cancelled')
  const cancelledOrders = completedOrders.filter(order => order.status === 'cancelled')

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { label: 'En preparación', icon: 'clock', color: 'pending' }
      case 'ready':
        return { label: 'Listo para recoger', icon: 'check', color: 'ready' }
      case 'completed':
        return { label: 'Recogido', icon: 'check', color: 'completed' }
      case 'cancelled':
        return { label: 'Cancelado', icon: 'x', color: 'cancelled' }
      default:
        return { label: 'En proceso', icon: 'clock', color: 'pending' }
    }
  }

  const handleCancelOrder = (orderId) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar este pedido?')) {
      cancelOrder(orderId)
      setCancelledOrder(orderId)
      setTimeout(() => setCancelledOrder(null), 2000)
    }
  }

  const handleExpandOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  if (completedOrders.length === 0) {
    return (
      <div className="orders-container">
        <header className="orders-header">
          <h1>Mis Pedidos</h1>
          <p>Historial y seguimiento de tus pedidos</p>
        </header>
        
        <section className="orders-content">
          <div className="empty-state">
            <ClockIcon size={48} />
            <p className="empty-message">No hay pedidos disponibles</p>
            <p className="empty-subtitle">Aquí aparecerán tus pedidos realizados</p>
            <Link to="/menu" className="order-link">
              Hacer mi primer pedido
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="orders-container">
      <header className="orders-header">
        <h1>Mis Pedidos</h1>
        <p>Historial y seguimiento de tus pedidos</p>
      </header>

      <section className="orders-content">
        {/* Pedidos activos */}
        {activeOrders.length > 0 && (
          <div className="orders-section">
            <h2 className="section-title">Pedidos Activos</h2>
            <div className="orders-list">
              {activeOrders.map(order => {
                const statusInfo = getStatusInfo(order.status)
                const isExpanded = expandedOrder === order.id

                return (
                  <div key={order.id} className={`order-card ${isExpanded ? 'expanded' : ''}`}>
                    <button
                      className="order-header-btn"
                      onClick={() => handleExpandOrder(order.id)}
                      aria-expanded={isExpanded}
                      aria-label={`Pedido ${order.orderNumber}`}
                    >
                      <div className="order-info">
                        <h3 className="order-number">{order.orderNumber}</h3>
                        <p className="order-date">
                          {new Date(order.timestamp).toLocaleDateString('es-ES', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>

                      <div className="order-status">
                        <span className={`status-badge ${statusInfo.color}`}>
                          {statusInfo.icon === 'clock' && <ClockIcon size={16} />}
                          {statusInfo.icon === 'check' && <CheckCircle2Icon size={16} />}
                          {statusInfo.label}
                        </span>
                      </div>

                      <div className="order-total">
                        <span className="total-label">Total:</span>
                        <span className="total-amount">${order.total.toFixed(2)}</span>
                      </div>

                      <div className="expand-icon">
                        <ChevronDownIcon size={20} />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="order-details">
                        {/* Horario de recolección */}
                        <div className="detail-section">
                          <h4>Horario de Recolección</h4>
                          <p className="detail-value">
                            <strong>{order.schedule.date}</strong><br />
                            <strong className="highlight">{order.schedule.time}</strong>
                          </p>
                        </div>

                        {/* Productos */}
                        <div className="detail-section">
                          <h4>Productos</h4>
                          <div className="items-breakdown">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="breakdown-item">
                                <div className="item-name-qty">
                                  <span className="name">{item.name}</span>
                                  <span className="qty">x {item.quantity}</span>
                                </div>

                                {item.customizations && item.customizations.length > 0 && (
                                  <div className="customizations">
                                    {item.customizations.map(custom => (
                                      <span key={custom.id} className="custom-badge">
                                        {custom.label}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                <span className="item-price">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Resumen financiero */}
                        <div className="detail-section">
                          <div className="financial-summary">
                            <div className="summary-row">
                              <span>Subtotal:</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                              <span>Impuestos (10%):</span>
                              <span>${(order.total * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="summary-row total">
                              <span>Total:</span>
                              <span>${(order.total * 1.1).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="order-actions">
                          {order.status === 'pending' && (
                            <button
                              className="cancel-btn"
                              onClick={() => handleCancelOrder(order.id)}
                              aria-label={`Cancelar pedido ${order.orderNumber}`}
                            >
                              Cancelar Pedido
                            </button>
                          )}
                          <Link to="/menu" className="new-order-link">
                            Hacer Otro Pedido
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Pedidos cancelados */}
        {cancelledOrders.length > 0 && (
          <div className="orders-section">
            <h2 className="section-title">Pedidos Cancelados</h2>
            <div className="orders-list">
              {cancelledOrders.map(order => (
                <div key={order.id} className="order-card cancelled">
                  <div className="order-header-info">
                    <div className="order-info">
                      <h3 className="order-number">{order.orderNumber}</h3>
                      <p className="order-date">
                        {new Date(order.timestamp).toLocaleDateString('es-ES', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="order-status">
                      <span className="status-badge cancelled">
                        <XCircleIcon size={16} />
                        Cancelado
                      </span>
                    </div>

                    <div className="order-total">
                      <span className="total-label">Total:</span>
                      <span className="total-amount">${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="cancelled-actions">
                    <Link to="/menu" className="new-order-link">
                      Hacer Nuevo Pedido
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mensaje de éxito al cancelar */}
        {cancelledOrder && (
          <div className="success-message" role="status" aria-live="polite">
            <CheckCircle2Icon size={20} />
            <span>Pedido cancelado exitosamente</span>
          </div>
        )}
      </section>
    </div>
  )
}

export default Orders
