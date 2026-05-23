import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { ChevronDownIcon, CheckCircle2Icon, ClockIcon, XCircleIcon } from '../components/Icons'
import './Orders.css'

const Orders = () => {
  const { completedOrders, cancelOrder, reorderFromPastOrder } = useContext(CartContext)
  const navigate = useNavigate()
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [notification, setNotification] = useState(null)
  const [confirmModal, setConfirmModal] = useState(null) // { type, orderId, orderNumber }

  // Agrupar y clasificar pedidos
  const getOrdersByStatus = () => {
    const pending = completedOrders.filter(order => order.status === 'pending')
    const ready = completedOrders.filter(order => order.status === 'ready')
    const completed = completedOrders.filter(order => order.status === 'completed')
    const cancelled = completedOrders.filter(order => order.status === 'cancelled')
    
    return { pending, ready, completed, cancelled }
  }

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

  // Verificar si el pedido puede ser modificado (debe haber más de 5 minutos)
  const canModifyOrder = (order) => {
    if (order.status !== 'pending') return false
    if (!order.schedule || !order.schedule.dateObj) return false

    const now = new Date()
    const [hours, minutes] = order.schedule.timeValue.split(':')
    const scheduledTime = new Date(order.schedule.dateObj)
    scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)

    // Diferencia en minutos
    const diffMs = scheduledTime - now
    const diffMinutes = Math.floor(diffMs / 1000 / 60)

    // Solo permitir si faltan más de 5 minutos
    return diffMinutes > 5
  }

  const handleConfirmCancel = (orderId, orderNumber) => {
    setConfirmModal({ type: 'cancel', orderId, orderNumber })
  }

  const handleConfirmModify = (orderId, orderNumber) => {
    setConfirmModal({ type: 'modify', orderId, orderNumber })
  }

  const handleConfirmAction = () => {
    if (!confirmModal) return

    if (confirmModal.type === 'cancel') {
      cancelOrder(confirmModal.orderId)
      setNotification({
        type: 'success',
        title: '✓ Pedido Cancelado',
        message: `El pedido #${confirmModal.orderNumber} ha sido cancelado exitosamente.`
      })
      setTimeout(() => setNotification(null), 4000)
    } else if (confirmModal.type === 'modify') {
      const success = reorderFromPastOrder(confirmModal.orderId)
      if (success) {
        setNotification({
          type: 'success',
          title: '✓ Artículos Agregados',
          message: `Los artículos del pedido #${confirmModal.orderNumber} han sido agregados al carrito.`
        })
        setTimeout(() => {
          setNotification(null)
          navigate('/cart')
        }, 2000)
      }
    }

    setConfirmModal(null)
  }

  const handleExpandOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const { pending, ready, completed, cancelled } = getOrdersByStatus()

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
        {/* Notificación */}
        {notification && (
          <div className={`notification ${notification.type}`} role="status" aria-live="polite">
            <div className="notification-content">
              <p className="notification-title">{notification.title}</p>
              <p className="notification-message">{notification.message}</p>
            </div>
            <button
              className="notification-close"
              onClick={() => setNotification(null)}
              aria-label="Cerrar notificación"
            >
              ✕
            </button>
          </div>
        )}

        {/* Pedidos en preparación */}
        {pending.length > 0 && (
          <div className="orders-section">
            <h2 className="section-title">En Preparación</h2>
            <div className="orders-list">
              {pending.map(order => {
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
                            <div className="summary-row total">
                              <span>Total a Pagar:</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="order-actions">
                          <button
                            className="cancel-btn"
                            onClick={() => handleConfirmCancel(order.id, order.orderNumber)}
                            aria-label={`Cancelar pedido ${order.orderNumber}`}
                          >
                            Cancelar Pedido
                          </button>
                          {canModifyOrder(order) ? (
                            <button
                              className="modify-btn"
                              onClick={() => handleConfirmModify(order.id, order.orderNumber)}
                              aria-label={`Modificar pedido ${order.orderNumber}`}
                            >
                              Modificar Pedido
                            </button>
                          ) : (
                            <button
                              className="reorder-btn"
                              onClick={() => handleConfirmModify(order.id, order.orderNumber)}
                              aria-label={`Reordenar pedido ${order.orderNumber}`}
                            >
                              Reordenar
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Pedidos listos para recoger */}
        {ready.length > 0 && (
          <div className="orders-section">
            <h2 className="section-title">Listo para Recoger</h2>
            <div className="orders-list">
              {ready.map(order => {
                const statusInfo = getStatusInfo(order.status)
                const isExpanded = expandedOrder === order.id

                return (
                  <div key={order.id} className={`order-card ready-card ${isExpanded ? 'expanded' : ''}`}>
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
                            <div className="summary-row total">
                              <span>Total a Pagar:</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="order-actions">
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

        {/* Pedidos recogidos */}
        {completed.length > 0 && (
          <div className="orders-section">
            <h2 className="section-title">Pedidos Anteriores</h2>
            <div className="orders-list">
              {completed.map(order => {
                const statusInfo = getStatusInfo(order.status)
                const isExpanded = expandedOrder === order.id

                return (
                  <div key={order.id} className={`order-card completed-card ${isExpanded ? 'expanded' : ''}`}>
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
                            <div className="summary-row total">
                              <span>Total a Pagar:</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="order-actions">
                          <button
                            className="reorder-btn"
                            onClick={() => handleConfirmModify(order.id, order.orderNumber)}
                            aria-label={`Reordenar pedido ${order.orderNumber}`}
                          >
                            Reordenar
                          </button>
                          <Link to="/menu" className="new-order-link">
                            Hacer Nuevo Pedido
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
        {cancelled.length > 0 && (
          <div className="orders-section">
            <h2 className="section-title">Cancelados</h2>
            <div className="orders-list">
              {cancelled.map(order => (
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

        {/* Modal de Confirmación */}
        {confirmModal && (
          <div className="confirm-modal-overlay" onClick={() => setConfirmModal(null)} role="presentation">
            <div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
              <h2 id="confirm-title" className="confirm-title">
                {confirmModal.type === 'cancel' ? '¿Cancelar pedido?' : '¿Modificar pedido?'}
              </h2>
              <p className="confirm-message">
                {confirmModal.type === 'cancel'
                  ? `¿Estás seguro de que deseas cancelar el pedido #${confirmModal.orderNumber}? Esta acción no se puede deshacer.`
                  : `¿Deseas agregar los artículos del pedido #${confirmModal.orderNumber} al carrito?`}
              </p>
              <div className="confirm-actions">
                <button
                  className="confirm-cancel-btn"
                  onClick={() => setConfirmModal(null)}
                  aria-label="Cancelar"
                >
                  Cancelar
                </button>
                <button
                  className={`confirm-accept-btn ${confirmModal.type === 'cancel' ? 'danger' : ''}`}
                  onClick={handleConfirmAction}
                  aria-label={confirmModal.type === 'cancel' ? 'Confirmar cancelación' : 'Confirmar modificación'}
                >
                  {confirmModal.type === 'cancel' ? 'Sí, Cancelar' : 'Sí, Modificar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Orders
