import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allProducts: [],
  productIndividual: {}
}

const productSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    fetchProductIndividual(state, action) {
      const product = action.payload;
      state.productIndividual = product

    },
    fetchAllProducts(state, action) {
      const product = action.payload;
      state.allProducts = product

    },

  },

}
)


//________ Selectors ________
export const selectProduct = (state) => state.products.productIndividual
export const selectAllProducts = (state) => state.products.productIndividual



export const productActions = productSlice.actions
export default productSlice;