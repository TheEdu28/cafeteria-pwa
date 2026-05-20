import './Schedule.css'

const Schedule = () => {
  return (
    <div className="schedule-container">
      <header className="schedule-header">
        <h1>Agendar Entrega</h1>
        <p>Selecciona la fecha y hora de tu pedido</p>
      </header>
      <section className="schedule-content">
        <div className="schedule-info">
          <p>Completa el proceso de compra desde tu carrito para agendar la entrega.</p>
        </div>
      </section>
    </div>
  )
}

export default Schedule
