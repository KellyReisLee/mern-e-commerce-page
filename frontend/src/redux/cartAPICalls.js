
import { uiActions } from '../redux/uiSlice'
import { cartActions } from '../redux/cartSlice';
import axios from 'axios'

export const fetchCartData = (token, id) => { // Adicionar id e token como parâmetros
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api/carts/find/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Check if the status code is not in the success range
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Fetching cart data failed.');
      }
      console.log(response); // Ajustar para acessar os dados corretos da resposta
      return response.data;
    };

    try {
      const resData = await fetchData();
      dispatch(cartActions.replaceCart(resData.products))
      console.log(resData.products);
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Fetched cart data successfully!',
        })
      );

      // Descomentar e ajustar o dispatch para atualizar o estado do carrinho
      // dispatch(
      //   cartActions.replaceCart({
      //     items: cartData.items || [],
      //     totalQuantity: cartData.totalQuantity,
      //   })
      // );
    } catch (error) {
      console.log(error)
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message || 'Fetching cart data failed!',
        })
      );
    }
  };
};


export const sendCartData = (cartItems, token, id) => {

  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      console.log('Preparing to send request'); // Log para verificar antes da requisição
      console.log(`Sending to /api/carts/${id}`, { products: cartItems });
      const response = await axios.put(
        `/api/carts/${id}`,
        { products: cartItems },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Check if the status code is not in the success range
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Sending cart data failed.');
      }
      console.log(response)
      return response

    }

    try {
      const response = await sendRequest();
      console.log('Request succeeded', response);

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      console.error('Request failed', error);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};






// export const updatingCart = createAsyncThunk(
//   'cart/updatingCart',
//   async ({ id, token, cartItems, navigate }, { dispatch }) => { // Destructure os argumentos e o dispatch
//     dispatch(loginStart());
//     try {
//       const res = await axios.put(
//         `/api/carts/${id}`,
//         { products: cartItems },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );
//       dispatch(loginSuccess(res.data))
//       dispatch(loginSuccessMessage(res.data.message))
//       dispatch(loginFailure(null));

//       setTimeout(() => {
//         dispatch(loginSuccessMessage(null))
//         navigate('/')
//       }, 3000);

//     } catch (error) {
//       dispatch(loginFailure(error.response?.data?.error));
//       setTimeout(() => {
//         dispatch(loginFailure(null))
//       }, 3000);

//     }
//   }
// );