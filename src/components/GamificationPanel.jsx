import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import './GamificationPanel.css'

const BADGES = [
  {
    id: 'Madrugador',
    title: 'Madrugador',
    description: '5 pedidos en Desayunos'
  },
  {
    id: 'Cliente Frecuente',
    title: 'Cliente Frecuente',
    description: '10 pedidos en total'
  },
  {
    id: 'Producto Gratis',
    title: 'Producto Gratis',
    description: '50 CafePuntos acumulados'
  }
]

const GamificationPanel = ({ variant = 'full' }) => {
  const { cafePoints, badges, nextRewardThreshold } = useContext(CartContext)
  const progress = Math.min(
    100,
    Math.round((cafePoints / nextRewardThreshold) * 100)
  )
  const remaining = Math.max(nextRewardThreshold - cafePoints, 0)
  const isCompact = variant === 'compact'

  return (
    <section className={`gamification-panel ${isCompact ? 'compact' : ''}`}>
      <header className="gamification-header">
        <div>
          <p className="gamification-label">CafePuntos</p>
          <h2 className="gamification-title">
            {cafePoints} / {nextRewardThreshold}
          </h2>
          <p className="gamification-subtitle">
            Te faltan {remaining} puntos para tu proximo producto gratis
          </p>
        </div>
        <div className="gamification-badge-wrap">
          <div className="gamification-badge" style={{ '--progress': progress }}>
            <span className="badge-value">{progress}%</span>
          </div>
          <span className="badge-caption">Progreso</span>
        </div>
      </header>

      <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {!isCompact && (
        <div className="gamification-badges">
          <h3 className="badges-title">Insignias desbloqueables</h3>
          <div className="badges-grid">
            {BADGES.map(badge => {
              const unlocked = badges.includes(badge.id)
              return (
                <div key={badge.id} className={`badge-card ${unlocked ? 'unlocked' : ''}`}>
                  <div className="badge-icon">
                    <span className="badge-dot"></span>
                  </div>
                  <div className="badge-info">
                    <p className="badge-name">{badge.title}</p>
                    <p className="badge-desc">{badge.description}</p>
                  </div>
                  <span className="badge-status">
                    {unlocked ? 'Desbloqueada' : 'Bloqueada'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}

export default GamificationPanel
