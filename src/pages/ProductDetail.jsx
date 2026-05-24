import { useParams, useNavigate, Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { products } from '../data/menu'
import { CartContext } from '../context/CartContext'
import { MinusIcon, PlusIcon, ArrowLeftIcon } from '../components/Icons'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [addedToCart, setAddedToCart] = useState(false)

  // Encontrar el producto
  const product = products.find(p => p.id === parseInt(id))

  // Manejar cambios en las opciones
  const toggleOption = (option) => {
    setSelectedOptions(prev => {
      const exists = prev.find(opt => opt.id === option.id)
      if (exists) {
        return prev.filter(opt => opt.id !== option.id)
      } else {
        return [...prev, option]
      }
    })
  }

  // Manejar agregar al carrito
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedOptions)
      setAddedToCart(true)
      setQuantity(1)
      setSelectedOptions([])
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  // Actualizar cantidad
  const updateQuantity = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity)
    }
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <header className="detail-header">
          <button 
            className="back-button"
            onClick={() => navigate('/menu')}
            aria-label="Volver al menú"
          >
            <ArrowLeftIcon size={20} />
            <span>Volver</span>
          </button>
        </header>
        <section className="detail-content">
          <div className="empty-state">
            <p className="empty-message">Producto no encontrado</p>
            <Link to="/menu" className="continue-link">
              Ir al menú
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="product-detail-container">
      <header className="detail-header">
        <button 
          className="back-button"
          onClick={() => navigate('/menu')}
          aria-label="Volver al menú"
        >
          <ArrowLeftIcon size={20} />
          <span>Volver</span>
        </button>
      </header>

      <section className="detail-content">
        <div className="product-main">
          {/* Imagen del producto */}
          <div className="product-image-container">
            <div className="product-image" role="img" aria-label={`${product.name} - ${product.category}`}>
              <img src={product.image} alt={`${product.name}`} className="product-image-img" />
            </div>
          </div>

          {/* Información del producto */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-name">{product.name}</h1>
              <span className="product-category" aria-label={`Categoría: ${product.category}`}>
                {product.category}
              </span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-meta">
              <div className="availability">
                <span 
                  className={`badge ${product.available ? 'available' : 'unavailable'}`}
                  aria-label={product.available ? 'Disponible' : 'No disponible'}
                >
                  {product.available ? '✓ Disponible' : 'No disponible'}
                </span>
              </div>
              <div className="price-section">
                <span className="price-label">Precio por unidad:</span>
                <span className="product-price" aria-label={`$${product.price}`}>
                  ${product.price}
                </span>
              </div>
            </div>

            {/* Sección de personalización */}
            {product.options && product.options.length > 0 && (
              <div className="customization-section">
                <h2 className="customization-title">Personalización</h2>
                <p className="customization-subtitle">Selecciona tus preferencias</p>
                
                <fieldset className="options-group">
                  <legend className="sr-only">Opciones de personalización</legend>
                  <div className="options-list">
                    {product.options.map(option => (
                      <label key={option.id} className="option-item">
                        <input
                          type="checkbox"
                          checked={selectedOptions.some(opt => opt.id === option.id)}
                          onChange={() => toggleOption(option)}
                          aria-label={option.label}
                          className="option-checkbox"
                        />
                        <span className="option-label">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {selectedOptions.length > 0 && (
                  <div className="selected-options">
                    <p className="selected-title">Personalizaciones seleccionadas:</p>
                    <ul className="selected-list">
                      {selectedOptions.map(opt => (
                        <li key={opt.id} className="selected-item">
                          {opt.label}
                          <button
                            type="button"
                            className="remove-option"
                            onClick={() => toggleOption(opt)}
                            aria-label={`Remover ${opt.label}`}
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Cantidad */}
            <div className="quantity-section">
              <label htmlFor="quantity" className="quantity-label">Cantidad:</label>
              <div className="quantity-control">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(quantity - 1)}
                  disabled={quantity === 1}
                  aria-label="Disminuir cantidad"
                >
                  <MinusIcon size={18} />
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
                  className="qty-input"
                  aria-label="Cantidad de productos"
                />
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(quantity + 1)}
                  aria-label="Aumentar cantidad"
                >
                  <PlusIcon size={18} />
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="total-section">
              <span className="total-label">Total:</span>
              <span className="total-price" aria-label={`Total $${(product.price * quantity).toFixed(2)}`}>
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>

            {/* Botón agregar al carrito */}
            <button
              className={`add-to-cart-btn ${addedToCart ? 'success' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.available}
              aria-label={`Agregar ${quantity} ${product.name} al carrito`}
            >
              {addedToCart ? '✓ Agregado al carrito' : 'Agregar al Carrito'}
            </button>

            {/* Links de navegación */}
            <nav className="product-nav" aria-label="Navegación de productos">
              <Link to="/menu" className="nav-link">
                ← Volver al menú
              </Link>
              <Link to="/cart" className="nav-link primary">
                Ir al carrito →
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetail
