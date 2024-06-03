import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice.js';
import uiSlice from './uiSlice.js'
import wishSlice from './wishSlice.js'



export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
    wishList: wishSlice.reducer,

  }
})