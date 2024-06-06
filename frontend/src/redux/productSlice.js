import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';

const initialState = {
  allProducts: [],
  productIndividual: {}
}

const productSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    resetProductIndividual(state) {

      state.productIndividual = {}

    },
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