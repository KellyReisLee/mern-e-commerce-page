import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wishList: [],
  wishItem: []
}

const wishSlice = createSlice({
  name: 'wishList',
  initialState: initialState,
  reducers: {
    addWishList(state, action) {
      const newItem = action.payload;
      const findItem = state.wishList.find((item) => item._id === newItem._id)

      if (!findItem || newItem.color !== findItem.color || newItem.size !== findItem.size) {
        state.wishList.push(
          {
            ...newItem, quantity: 1, total: newItem.price
          }
        )
      }

    },
    addItemWish(state, action) {
      const newItem = action.payload;
      const findItem = state.wishList.find((item) => item._id === newItem._id)

      if (!findItem) {
        state.wishList.push(
          {
            ...newItem
          }
        )
      }

    },
    removeItemWish(state, action) {
      const newItem = action.payload;
      state.wishList = state.wishList.filter((item) => item._id !== newItem._id)

    }
  }

})



//All wishList
export const selectorWishList = (state) => state.wishList.wishList;

//Quantity of products inside wishList
export const selectProductsQuantityWish = (state) => {
  return state.cart.products.reduce((acc, curr) => acc + curr.quantity, 0)
}

export const wishSliceActions = wishSlice.actions
export default wishSlice;