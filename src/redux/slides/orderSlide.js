import { createSlice } from '@reduxjs/toolkit'

export const getOrderFromLocalStorage = (userId) => {
  if (!userId) return []
  const data = localStorage.getItem(`cart_${userId}`)
  return data ? JSON.parse(data) : []
}

export const saveOrderToLocalStorage = (userId, orderItems) => {
  if (!userId) return
  localStorage.setItem(`cart_${userId}`, JSON.stringify(orderItems))
}

const initialState = {
  orderItems: [],
  orderItemsSlected: [],
  shippingAddress: {},
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
  isSucessOrder: false,
}

export const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {

    loadCart: (state, action) => {
      const { userId } = action.payload
      state.orderItems = getOrderFromLocalStorage(userId)
    },

    addOrderProduct: (state, action) => {
      const { orderItem, userId } = action.payload

      const itemOrder = state.orderItems.find(
        (item) => item.product === orderItem.product
      )

      if (itemOrder) {
        if (itemOrder.amount < itemOrder.countInstock) {
          itemOrder.amount += orderItem.amount
        }
      } else {
        state.orderItems.push(orderItem)
      }

      saveOrderToLocalStorage(userId, state.orderItems)
    },

    increaseAmount: (state, action) => {
      const { idProduct, userId } = action.payload

      const item = state.orderItems.find(
        (item) => item.product === idProduct
      )

      if (item && item.amount < item.countInstock) {
        item.amount++
      }

      saveOrderToLocalStorage(userId, state.orderItems)
    },

    decreaseAmount: (state, action) => {
      const { idProduct, userId } = action.payload

      const item = state.orderItems.find(
        (item) => item.product === idProduct
      )

      if (item && item.amount > 1) {
        item.amount--
      }

      saveOrderToLocalStorage(userId, state.orderItems)
    },

    removeOrderProduct: (state, action) => {
      const { idProduct, userId } = action.payload

      state.orderItems = state.orderItems.filter(
        (item) => item.product !== idProduct
      )

      state.orderItemsSlected = state.orderItemsSlected.filter(
        (item) => item.product !== idProduct
      )

      saveOrderToLocalStorage(userId, state.orderItems)
    },

    removeAllOrderProduct: (state, action) => {
      const { listChecked, userId } = action.payload

      state.orderItems = state.orderItems.filter(
        (item) => !listChecked.includes(item.product)
      )

      state.orderItemsSlected = state.orderItemsSlected.filter(
        (item) => !listChecked.includes(item.product)
      )

      saveOrderToLocalStorage(userId, state.orderItems)
    },

    selectedOrder: (state, action) => {
      const { listChecked } = action.payload

      state.orderItemsSlected = state.orderItems.filter((order) =>
        listChecked.includes(order.product)
      )
    },

    resetOrder: () => initialState,
  },
})

export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
  selectedOrder,
  resetOrder,
  loadCart,
} = orderSlide.actions

export default orderSlide.reducer
