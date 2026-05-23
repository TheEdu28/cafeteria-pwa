import { createContext, useState, useCallback } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [editingOrderId, setEditingOrderId] = useState(null)
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

  // Reordenar - Agregar items de un pedido anterior al carrito
  const reorderFromPastOrder = useCallback((orderId) => {
    const pastOrder = completedOrders.find(order => order.id === orderId)
    if (!pastOrder) return false
    
    // Limpiar carrito antes de agregar items del pedido anterior
    setCartItems([])
    
    // Marcar que estamos editando este pedido
    setEditingOrderId(orderId)
    
    // Agregar cada item del pedido anterior al carrito actual
    pastOrder.items.forEach(item => {
      const { customizations = [] } = item
      addToCart(item, item.quantity, customizations)
    })
    return true
  }, [completedOrders, addToCart])

  // Marcar pedido como recogido
  const completeOrderPickup = useCallback((orderId) => {
    const updatedOrders = completedOrders.map(order =>
      order.id === orderId ? { ...order, status: 'completed' } : order
    )
    setCompletedOrders(updatedOrders)
    localStorage.setItem('completedOrders', JSON.stringify(updatedOrders))
  }, [completedOrders])

  // Actualizar un pedido existente (cuando se modifica)
  const updateOrder = useCallback((orderId, orderData) => {
    const updatedOrders = completedOrders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          items: cartItems,
          schedule: selectedSchedule,
          total,
          timestamp: new Date().toISOString(),
          ...orderData
        }
      }
      return order
    })
    setCompletedOrders(updatedOrders)
    localStorage.setItem('completedOrders', JSON.stringify(updatedOrders))
    
    // Limpiar carrito y horario después de actualizar
    setCartItems([])
    setSelectedSchedule(null)
    setEditingOrderId(null)
    
    return updatedOrders.find(o => o.id === orderId)
  }, [cartItems, selectedSchedule, total, completedOrders])

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
    editingOrderId,
    completedOrders,
    completeOrder,
    cancelOrder,
    reorderFromPastOrder,
    completeOrderPickup,
    updateOrder
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
