import './ProductDetail.css'

const ProductDetail = () => {
  return (
    <div className="product-detail-container">
      <header className="detail-header">
        <h1>Detalles del Producto</h1>
        <p>Información completa del artículo</p>
      </header>
      <section className="detail-content">
        <p>Selecciona un producto desde el menú para ver sus detalles.</p>
      </section>
    </div>
  )
}

export default ProductDetail
