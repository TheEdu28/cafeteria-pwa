import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/menu'
import { CartContext } from '../context/CartContext'
import './Menu.css'

const Menu = () => {
  const { addToCart } = useContext(CartContext)
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [addedProduct, setAddedProduct] = useState(null)

  // Obtener categorías únicas
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

  return (
    <div className="menu-container">
      <h1>🍽️ Menú</h1>

      {/* Filtro de categorías */}
      <div className="categories-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Lista de productos */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-header">
              <h3 className="product-name">{product.name}</h3>
              {!product.available && (
                <span className="unavailable-badge">No disponible</span>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-category">
              <span className="category-badge">{product.category}</span>
            </div>

            <div className="product-footer">
              <span className="product-price">${product.price}</span>

              {product.available ? (
                <button
                  className={`add-btn ${addedProduct === product.id ? 'added' : ''}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={addedProduct === product.id}
                >
                  {addedProduct === product.id ? '✓ Agregado' : '+ Agregar'}
                </button>
              ) : (
                <button className="add-btn disabled" disabled>
                  No disponible
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No hay productos disponibles en esta categoría</p>
        </div>
      )}
    </div>
  )
}

export default Menu
