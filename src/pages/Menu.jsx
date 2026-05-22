import { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/menu'
import { CartContext } from '../context/CartContext'
import './Menu.css'

const Menu = () => {
  const { addToCart } = useContext(CartContext)
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [addedProduct, setAddedProduct] = useState(null)
  const categoryListRef = useRef(null)

  // Obtener categorías únicas ordenadas
  const categories = ['Todos', ...new Set(products.map(p => p.category))]

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory)

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    setAddedProduct(product.id)
    setTimeout(() => setAddedProduct(null), 2000)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handleKeyDown = (e, category) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCategoryChange(category)
    }
  }

  return (
    <div className="menu-container">
      <header className="menu-header">
        <h1 className="menu-title">Menú Restaurante</h1>
        <p className="menu-subtitle">Selecciona tu categoría favorita</p>
      </header>

      {/* Filtro de categorías */}
      <nav className="categories-section" aria-label="Filtrar por categoría">
        <h2 className="categories-title">Categorías</h2>
        <div 
          className="categories-filter"
          ref={categoryListRef}
          role="tablist"
          aria-label="Categorías de productos"
        >
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
              onKeyDown={(e) => handleKeyDown(e, category)}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-controls={`${category}-products`}
              aria-label={`Mostrar ${category === 'Todos' ? 'todos los productos' : `productos de ${category}`}`}
            >
              <span className="category-btn-text">{category}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Información de productos */}
      <div className="products-info">
        <p className="products-count" aria-live="polite" aria-atomic="true">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'producto disponible' : 'productos disponibles'}
        </p>
      </div>

      {/* Lista de productos */}
      <div 
        className="products-grid"
        id={`${selectedCategory}-products`}
        role="region"
        aria-label={`Productos de ${selectedCategory}`}
      >
        {filteredProducts.map(product => (
          <article 
            key={product.id} 
            className={`product-card ${!product.available ? 'unavailable' : ''}`}
          >
            <Link 
              to={`/product/${product.id}`}
              className="product-card-link"
              aria-label={`Ver detalles de ${product.name}`}
            >
              <div className="product-header">
                <h3 className="product-name">{product.name}</h3>
                {!product.available && (
                  <span className="unavailable-badge" aria-label="No disponible">
                    No disponible
                  </span>
                )}
              </div>

              <p className="product-description">{product.description}</p>

              <div className="product-meta">
                <span className="category-badge" aria-label={`Categoría: ${product.category}`}>
                  {product.category}
                </span>
              </div>
            </Link>

            <div className="product-footer">
              <span className="product-price" aria-label={`Precio: $${product.price}`}>
                ${product.price}
              </span>

              {product.available ? (
                <button
                  className={`add-btn ${addedProduct === product.id ? 'added' : ''}`}
                  onClick={() => handleAddToCart(product)}
                  aria-label={`Agregar ${product.name} al carrito sin personalizar`}
                  aria-pressed={addedProduct === product.id}
                  title="Agregar sin personalizar. Click en el producto para más opciones."
                >
                  <span className="btn-text">
                    {addedProduct === product.id ? '✓ Agregado' : '+'}
                  </span>
                </button>
              ) : (
                <button 
                  className="add-btn disabled" 
                  disabled
                  aria-label={`${product.name} no disponible`}
                >
                  <span className="btn-text">✕</span>
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products" role="status" aria-live="polite">
          <p>No hay productos disponibles en esta categoría</p>
        </div>
      )}
    </div>
  )
}

export default Menu
