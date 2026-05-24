import { Link } from 'react-router-dom'
import GamificationPanel from '../components/GamificationPanel'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a U-COFFEE</h1>
        <p className="home-subtitle">Explora nuestro menú y realiza tu pedido</p>
      </header>

      <section className="home-gamification">
        <GamificationPanel />
      </section>

      <section className="home-content">
        <div className="home-card">
          <h2>Descubre Nuestro Menú</h2>
          <p>Selecciona entre una amplia variedad de desayunos, comidas rápidas y especialidades mexicanas.</p>
          <Link to="/menu" className="home-cta">
            Explorar Menú
          </Link>
        </div>

        <div className="home-card">
          <h2>Rápido y Fácil</h2>
          <p>Realiza tu pedido en pocos pasos y recibe tu comida en el tiempo estimado.</p>
          <p className="home-card-meta">Disponible como PWA</p>
        </div>

        <div className="home-card">
          <h2>Tus Pedidos</h2>
          <p>Accede al historial de tus pedidos y realiza nuevas órdenes fácilmente.</p>
          <Link to="/orders" className="home-cta">
            Ver Mis Pedidos
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
