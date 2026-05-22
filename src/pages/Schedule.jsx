import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { CheckCircle2Icon, XCircleIcon, AlertCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/Icons'
import './Schedule.css'

const Schedule = () => {
  const navigate = useNavigate()
  const { cartItems, selectedSchedule, setSchedule, total } = useContext(CartContext)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [error, setError] = useState(null)

  // Horarios disponibles
  const timeSlots = [
    { id: 'slot_11_00', label: '11:00 AM', time: '11:00', capacity: 15, current: 8 },
    { id: 'slot_11_30', label: '11:30 AM', time: '11:30', capacity: 15, current: 12 },
    { id: 'slot_12_00', label: '12:00 PM', time: '12:00', capacity: 15, current: 15 },
    { id: 'slot_12_30', label: '12:30 PM', time: '12:30', capacity: 15, current: 6 },
    { id: 'slot_01_00', label: '01:00 PM', time: '13:00', capacity: 15, current: 10 },
    { id: 'slot_01_30', label: '01:30 PM', time: '13:30', capacity: 15, current: 14 },
    { id: 'slot_05_00', label: '05:00 PM', time: '17:00', capacity: 15, current: 3 },
    { id: 'slot_05_30', label: '05:30 PM', time: '17:30', capacity: 15, current: 9 },
    { id: 'slot_06_00', label: '06:00 PM', time: '18:00', capacity: 15, current: 15 },
  ]

  // Generar próximos 7 días
  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const dates = generateDates()

  // Obtener estado del horario
  const getSlotStatus = (slot) => {
    const available = slot.current < slot.capacity
    const saturated = slot.current >= slot.capacity - 2
    
    return {
      available,
      saturated,
      filled: Math.round((slot.current / slot.capacity) * 100),
      remaining: slot.capacity - slot.current
    }
  }

  // Manejar selección de horario
  const handleSelectSchedule = () => {
    if (!selectedDate || !selectedTime) {
      setError('Por favor selecciona fecha y hora')
      return
    }

    const slot = timeSlots.find(s => s.id === selectedTime)
    const status = getSlotStatus(slot)
    
    if (!status.available) {
      setError('Este horario está lleno. Por favor selecciona otro.')
      return
    }

    const scheduleData = {
      date: selectedDate.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      dateObj: selectedDate,
      time: slot.label,
      timeValue: slot.time,
      slotId: slot.id
    }

    setSchedule(scheduleData)
    navigate('/confirmation')
  }

  if (cartItems.length === 0) {
    return (
      <div className="schedule-container">
        <header className="schedule-header">
          <h1>Agendar Entrega</h1>
          <p>Selecciona fecha y hora para recoger tu pedido</p>
        </header>
        <section className="schedule-content">
          <div className="empty-schedule">
            <AlertCircleIcon size={48} />
            <h2>Tu carrito está vacío</h2>
            <p>Agrega productos a tu carrito antes de agendar la entrega.</p>
            <Link to="/menu" className="empty-link">
              Ir al menú
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="schedule-container">
      <header className="schedule-header">
        <h1>Agendar Entrega</h1>
        <p>Selecciona fecha y hora para recoger tu pedido</p>
      </header>

      <section className="schedule-content">
        <div className="schedule-grid">
          {/* Selección de fecha */}
          <div className="date-selection">
            <h2 className="section-title">Selecciona una fecha</h2>
            <div className="dates-grid">
              {dates.map((date, index) => (
                <button
                  key={index}
                  className={`date-btn ${selectedDate?.getTime() === date.getTime() ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedDate(date)
                    setError(null)
                  }}
                  aria-selected={selectedDate?.getTime() === date.getTime()}
                  aria-label={`Seleccionar ${date.toLocaleDateString('es-ES', { weekday: 'long', month: 'short', day: 'numeric' })}`}
                >
                  <div className="date-day">
                    {date.toLocaleDateString('es-ES', { weekday: 'short' })}
                  </div>
                  <div className="date-number">
                    {date.getDate()}
                  </div>
                  <div className="date-month">
                    {date.toLocaleDateString('es-ES', { month: 'short' })}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selección de hora */}
          <div className="time-selection">
            <h2 className="section-title">Selecciona un horario</h2>
            <div className="times-list">
              {timeSlots.map(slot => {
                const status = getSlotStatus(slot)
                return (
                  <button
                    key={slot.id}
                    className={`time-slot ${selectedTime === slot.id ? 'active' : ''} ${!status.available ? 'unavailable' : ''} ${status.saturated ? 'saturated' : ''}`}
                    onClick={() => {
                      if (status.available) {
                        setSelectedTime(slot.id)
                        setError(null)
                      }
                    }}
                    disabled={!status.available}
                    aria-selected={selectedTime === slot.id}
                    aria-label={`${slot.label} - ${status.available ? `${status.remaining} lugares disponibles` : 'Horario lleno'}`}
                  >
                    <div className="time-header">
                      <span className="time-label">{slot.label}</span>
                      <span className={`status-icon ${status.available ? '' : 'unavailable'}`}>
                        {status.available ? (
                          <CheckCircle2Icon size={20} />
                        ) : (
                          <XCircleIcon size={20} />
                        )}
                      </span>
                    </div>

                    <div className="time-capacity">
                      <div className="capacity-bar">
                        <div 
                          className="capacity-fill"
                          style={{ width: `${status.filled}%` }}
                          role="progressbar"
                          aria-valuenow={status.filled}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          aria-label={`${status.filled}% lleno`}
                        ></div>
                      </div>
                      <span className="capacity-text">
                        {status.available ? (
                          <>
                            <span className="remaining">{status.remaining}</span>
                            <span className="total">/{slot.capacity}</span>
                          </>
                        ) : (
                          <span className="full">Lleno</span>
                        )}
                      </span>
                    </div>

                    {status.saturated && status.available && (
                      <span className="saturated-badge">Casi lleno</span>
                    )}
                  </button>
                )
              })}
            </div>

            {error && (
              <div className="error-message" role="alert" aria-live="polite">
                <AlertCircleIcon size={18} />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Resumen */}
        <div className="schedule-summary">
          <div className="summary-card">
            <h3>Resumen de tu pedido</h3>
            <div className="summary-items">
              <div className="summary-row">
                <span>Productos:</span>
                <span className="summary-value">{cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}</span>
              </div>
              <div className="summary-row">
                <span>Total:</span>
                <span className="summary-value highlight">${total.toFixed(2)}</span>
              </div>
              {selectedDate && (
                <div className="summary-row">
                  <span>Fecha:</span>
                  <span className="summary-value">
                    {selectedDate.toLocaleDateString('es-ES', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              )}
              {selectedTime && (
                <div className="summary-row">
                  <span>Hora:</span>
                  <span className="summary-value">
                    {timeSlots.find(s => s.id === selectedTime)?.label}
                  </span>
                </div>
              )}
            </div>

            <button
              className="schedule-btn"
              onClick={handleSelectSchedule}
              disabled={!selectedDate || !selectedTime}
              aria-label="Continuar a confirmación"
            >
              Continuar a Confirmación
            </button>

            <Link to="/cart" className="back-link">
              ← Volver al carrito
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Schedule
