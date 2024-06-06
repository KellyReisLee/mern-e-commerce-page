import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],


}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    replaceCart(state, action) {
      const productsArray = action.payload;
      state.products = productsArray
    },

    addProduct(state, action) {

      const newItem = action.payload;
      const itemExist = state.products.find((item) => item._id === newItem._id)
      state.quantity += 1

      if (!itemExist) {
        state.products.push(
          {
            _id: newItem._id,
            categories: newItem.categories,
            color: newItem.color,
            createdAt: newItem.createdAt,
            description: newItem.description,
            image: newItem.image,
            inStock: true,
            price: newItem.price,
            size: newItem.size,
            title: newItem.title,
            quantity: newItem.quantity,
            total: newItem.quantity * newItem.price
          }
        )
      } else if (itemExist.color !== newItem.color || itemExist.size !== newItem.size) {
        state.products.push(
          {
            _id: newItem._id,
            categories: newItem.categories,
            color: newItem.color,
            createdAt: newItem.createdAt,
            description: newItem.description,
            image: newItem.image,
            inStock: true,
            price: newItem.price,
            size: newItem.size,
            title: newItem.title,
            quantity: newItem.quantity,
            total: newItem.quantity * newItem.price
          }
        )

      } else {
        itemExist.quantity++;
        itemExist.total = itemExist.quantity * itemExist.price
      }
    },
    removeProduct(state, action) {
      const newItem = action.payload;
      const findItem = state.products.find((item) => item._id === newItem._id)
      state.quantity -= 1


      if (findItem.quantity === 1) {
        state.products = state.products.filter((item) => item._id !== findItem._id)
      } else {
        findItem.quantity--;
        findItem.total = findItem.quantity * findItem.price
      }

    },
    removeProductComplete(state, action) {
      const newItem = action.payload;
      state.products = state.products.filter((item) => item._id !== newItem._id)
    },
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

  }
})


// ______ Selectors _____
// Cart
export const selectorCart = (state) => state.cart

//Products Array
export const selectorCartProducts = (state) => state.cart.products


//Quantity of products inside cart
export const selectProductsQuantity = (state) => {
  return state.cart.products?.reduce((acc, curr) => acc + curr.quantity, 0)
}

//Total price 
export const selectorTotalPrice = (state) => {
  return state.cart.products?.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)

}

export const cartActions = cartSlice.actions
export default cartSlice;