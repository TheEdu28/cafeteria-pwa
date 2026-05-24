import { createContext, useState, useCallback, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const rewardThreshold = 50
  const [cartItems, setCartItems] = useState([])
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [editingOrderId, setEditingOrderId] = useState(null)
  const [completedOrders, setCompletedOrders] = useState(() => {
    const saved = localStorage.getItem('completedOrders')
    return saved ? JSON.parse(saved) : []
  })
  const [gamification, setGamification] = useState(() => {
    const saved = localStorage.getItem('gamification')
    const defaults = {
      cafePoints: 0,
      pointsHistory: [],
      rewardHistory: [],
      badges: [],
      lastEarnedPoints: 0,
      lastOrderId: null,
      nextRewardThreshold: rewardThreshold
    }
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults
  })
  const [rewardSelection, setRewardSelection] = useState({ useReward: false, drinkId: null })

  useEffect(() => {
    localStorage.setItem('gamification', JSON.stringify(gamification))
  }, [gamification])

  const calcPoints = useCallback((amount) => {
    if (!amount || amount <= 0) return 0
    return Math.max(1, Math.floor(amount / 10))
  }, [])

  const computeBadges = useCallback((orders, totalPoints) => {
    const badges = []
    const breakfastOrders = orders.filter(order =>
      order.items.some(item => item.category === 'Desayunos')
    ).length

    if (breakfastOrders >= 5) badges.push('Madrugador')
    if (orders.length >= 10) badges.push('Cliente Frecuente')
    if (totalPoints >= rewardThreshold) badges.push('Producto Gratis')

    return badges
  }, [rewardThreshold])

  const updateGamification = useCallback((updatedOrders, orderId, points, redeemed = false) => {
    setGamification(prev => {
      const filteredHistory = prev.pointsHistory.filter(entry => entry.orderId !== orderId)
      const pointsHistory = [...filteredHistory, { orderId, points }]
      const rewardHistory = redeemed
        ? (prev.rewardHistory.includes(orderId) ? prev.rewardHistory : [...prev.rewardHistory, orderId])
        : prev.rewardHistory.filter(id => id !== orderId)
      const redeemedCount = rewardHistory.length
      const cafePoints = Math.max(
        pointsHistory.reduce((sum, entry) => sum + entry.points, 0) - (redeemedCount * prev.nextRewardThreshold),
        0
      )
      const badges = computeBadges(updatedOrders, cafePoints)

      return {
        ...prev,
        cafePoints,
        pointsHistory,
        rewardHistory,
        badges,
        lastEarnedPoints: points,
        lastOrderId: orderId,
        nextRewardThreshold: rewardThreshold
      }
    })
  }, [computeBadges, rewardThreshold])

  const setRewardUse = useCallback((useReward) => {
    if (!useReward) {
      setRewardSelection({ useReward: false, drinkId: null })
      setCartItems(prevItems => prevItems.filter(item => !item.isReward))
      return
    }
    setRewardSelection(prev => ({ ...prev, useReward: true }))
  }, [])

  const selectRewardDrink = useCallback((product) => {
    setCartItems(prevItems => {
      const filtered = prevItems.filter(item => !item.isReward)
      const rewardItem = {
        ...product,
        id: `reward-${product.id}`,
        name: `${product.name} - Producto Gratis (Canjear)`,
        price: 0,
        quantity: 1,
        isReward: true,
        rewardLabel: 'Producto Gratis (Canjear)',
        rewardOriginalName: product.name,
        originalPrice: product.price
      }
      return [...filtered, rewardItem]
    })
    setRewardSelection({ useReward: true, drinkId: product.id })
  }, [])

  const clearRewardSelection = useCallback(() => {
    setRewardSelection({ useReward: false, drinkId: null })
    setCartItems(prevItems => prevItems.filter(item => !item.isReward))
  }, [])

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
          ? (item.isReward ? item : { ...item, quantity })
          : item
      )
    )
  }, [])

  // Eliminar producto del carrito
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const removedItem = prevItems.find(item => item.id === productId)
      const updated = prevItems.filter(item => item.id !== productId)
      if (removedItem?.isReward) {
        setRewardSelection({ useReward: false, drinkId: null })
      }
      return updated
    })
  }, [])

  // Calcular total
  const total = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)

  // Calcular cantidad total de items
  const itemCount = cartItems.reduce((sum, item) => {
    if (item.isReward) return sum
    return sum + item.quantity
  }, 0)

  // Limpiar carrito
  const clearCart = useCallback(() => {
    setCartItems([])
    setRewardSelection({ useReward: false, drinkId: null })
  }, [])

  // Guardar horario seleccionado
  const setSchedule = useCallback((schedule) => {
    setSelectedSchedule(schedule)
  }, [])

  // Completar pedido y guardarlo en historial
  const completeOrder = useCallback((orderData) => {
    const earnedPoints = calcPoints(total)
    const rewardUsed = rewardSelection.useReward && rewardSelection.drinkId
    const rewardItem = cartItems.find(item => item.isReward)
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      schedule: selectedSchedule,
      total,
      timestamp: new Date().toISOString(),
      status: 'pending',
      earnedPoints,
      rewardUsed,
      rewardDrinkId: rewardSelection.drinkId,
      rewardDrinkName: rewardItem ? (rewardItem.rewardOriginalName || rewardItem.name) : null,
      ...orderData
    }
    
    const updatedOrders = [...completedOrders, newOrder]
    setCompletedOrders(updatedOrders)
    localStorage.setItem('completedOrders', JSON.stringify(updatedOrders))
    updateGamification(updatedOrders, newOrder.id, earnedPoints, rewardUsed)
    
    // Limpiar carrito y horario después de completar
    setCartItems([])
    setSelectedSchedule(null)
    setRewardSelection({ useReward: false, drinkId: null })
    
    return newOrder
  }, [cartItems, selectedSchedule, total, completedOrders, calcPoints, updateGamification, rewardSelection])

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
      if (item.isReward) return
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
    const earnedPoints = calcPoints(total)
    const rewardUsed = rewardSelection.useReward && rewardSelection.drinkId
    const rewardItem = cartItems.find(item => item.isReward)
    const updatedOrders = completedOrders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          items: cartItems,
          schedule: selectedSchedule,
          total,
          timestamp: new Date().toISOString(),
          earnedPoints,
          rewardUsed,
          rewardDrinkId: rewardSelection.drinkId,
          rewardDrinkName: rewardItem ? (rewardItem.rewardOriginalName || rewardItem.name) : null,
          ...orderData
        }
      }
      return order
    })
    setCompletedOrders(updatedOrders)
    localStorage.setItem('completedOrders', JSON.stringify(updatedOrders))
    updateGamification(updatedOrders, orderId, earnedPoints, rewardUsed)
    
    // Limpiar carrito y horario después de actualizar
    setCartItems([])
    setSelectedSchedule(null)
    setEditingOrderId(null)
    setRewardSelection({ useReward: false, drinkId: null })
    
    return updatedOrders.find(o => o.id === orderId)
  }, [cartItems, selectedSchedule, total, completedOrders, calcPoints, updateGamification, rewardSelection])

  const rewardEligible = gamification.cafePoints >= gamification.nextRewardThreshold

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
    updateOrder,
    cafePoints: gamification.cafePoints,
    badges: gamification.badges,
    nextRewardThreshold: gamification.nextRewardThreshold,
    lastEarnedPoints: gamification.lastEarnedPoints,
    calcPoints,
    rewardSelection,
    rewardEligible,
    setRewardUse,
    selectRewardDrink,
    clearRewardSelection
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
