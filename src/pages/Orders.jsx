import './Orders.css'

const Orders = () => {
  return (
    <div className="orders-container">
      <header className="orders-header">
        <h1>Mis Pedidos</h1>
        <p>Historial y seguimiento de tus pedidos</p>
      </header>
      
      <section className="orders-content">
        <div className="empty-state">
          <p className="empty-message">No hay pedidos disponibles</p>
          <p className="empty-subtitle">Aquí aparecerán tus pedidos realizados</p>
        </div>
      </section>
    </div>
  )
}

export default Orders
