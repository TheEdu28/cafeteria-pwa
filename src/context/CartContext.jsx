import { createContext, useState, useCallback } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [completedOrders, setCompletedOrders] = useState(() => {
    const saved = localStorage.getItem('completedOrders')
    return saved ? JSON.parse(saved) : []
  })

  // Agregar producto al carrito con personalizaciones opcionales
  const addToCart = useCallback((product, quantity = 1, customizations = []) => {
    setCartItems(prevItems => {
      // Crear identificador único basado en producto y personalizaciones
      const customizationKey = JSON.stringify(customizations.sort((a, b) => a.id.localeCompare(b.id)))
      const existingItem = prevItems.find(item => 
        item.id === product.id && 
        JSON.stringify((item.customizations || []).sort((a, b) => a.id.localeCompare(b.id))) === customizationKey
      )
      
      if (existingItem) {
        return prevItems.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      return [...prevItems, { ...product, quantity, customizations }]
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

  // Guardar horario seleccionado
  const setSchedule = useCallback((schedule) => {
    setSelectedSchedule(schedule)
  }, [])

  // Completar pedido y guardarlo en historial
  const completeOrder = useCallback((orderData) => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      schedule: selectedSchedule,
      total,
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...orderData
    }
    
    const updatedOrders = [...completedOrders, newOrder]
    setCompletedOrders(updatedOrders)
    localStorage.setItem('completedOrders', JSON.stringify(updatedOrders))
    
    // Limpiar carrito y horario después de completar
    setCartItems([])
    setSelectedSchedule(null)
    
    return newOrder
  }, [cartItems, selectedSchedule, total, completedOrders])

  // Cancelar pedido
  const cancelOrder = useCallback((orderId) => {
    const updatedOrders = completedOrders.map(order =>
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    )
    setCompletedOrders(updatedOrders)
    localStorage.setItem('completedOrders', JSON.stringify(updatedOrders))
  }, [completedOrders])

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total,
    itemCount,
    selectedSchedule,
    setSchedule,
    completedOrders,
    completeOrder,
    cancelOrder
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
