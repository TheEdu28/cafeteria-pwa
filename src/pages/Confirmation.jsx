import './Confirmation.css'

const Confirmation = () => {
  return (
    <div className="confirmation-container">
      <section className="confirmation-success">
        <div className="success-icon">✓</div>
        <h1>Pedido Confirmado</h1>
        <p className="success-message">Tu pedido ha sido confirmado exitosamente</p>
        <p className="success-details">Recibirás una confirmación por correo electrónico</p>
      </section>
    </div>
  )
}

export default Confirmation
