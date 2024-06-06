import { uiActions } from '../redux/uiSlice'
import axios from 'axios'
import { productActions } from './productSlice';



// Fech a product by id
export const fetchProductData = (id) => {
  return async (dispatch) => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `/api/products/find/${id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Check if the status code is not in the success range
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Fetching products data failed.');
      }
      console.log(response); // Log the entire response to inspect it
      return response.data; // Return the data part of the response
    };

    try {
      const resData = await fetchProduct();
      console.log(resData);
      dispatch(productActions.fetchProductIndividual(resData))

      // Descomente e ajuste conforme necessário
      // dispatch(cartActions.replaceCart(resData.products));

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Fetched products data successfully!',
        })
      );

    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message || 'Fetching products data failed!',
        })
      );
    }
  };
};


// const fetchProducts = async () => {
//   try {
//     const res = await axios.get(category ? `api/products?category=${category}` : 'api/products')
//     //console.log(res.data);
//     setProducts(res.data)
//   } catch (error) {
//     console.log(error);

//   }

// }



// Fetching all products:
export const fetchAllProductsData = (category) => {
  return async (dispatch) => {
    const fetchProducts = async () => {
      const response = await axios.get(
        category ? `api/products?category=${category}` : 'api/products',
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Check if the status code is not in the success range
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Fetching products data failed.');
      }
      console.log(response); // Log the entire response to inspect it
      return response.data; // Return the data part of the response
    };

    try {
      const resData = await fetchProducts();
      console.log(resData);
      dispatch(productActions.fetchProductIndividual(resData))

      // Descomente e ajuste conforme necessário
      dispatch(productActions.fetchAllProducts(resData.products));

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Fetched products data successfully!',
        })
      );

    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message || 'Fetching products data failed!',
        })
      );
    }
  };
};