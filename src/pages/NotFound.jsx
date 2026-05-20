import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found-container">
      <section className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2>Página no encontrada</h2>
        <p>La página que buscas no existe o ha sido movida.</p>
        <Link to="/" className="home-link">
          Volver al Inicio
        </Link>
      </section>
    </div>
  )
}

export default NotFound
