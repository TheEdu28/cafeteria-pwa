import { createContext, useState, useCallback } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // Agregar producto al carrito
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      return [...prevItems, { ...product, quantity }]
    })
  }, [])

  // Actualizar cantidad de producto
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }, [])

  // Eliminar producto del carrito
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    )
  }, [])

  // Calcular total
  const total = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)

  // Calcular cantidad total de items
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Limpiar carrito
  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total,
    itemCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
