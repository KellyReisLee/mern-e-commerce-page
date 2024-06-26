import { loginStart, loginFailure, loginSuccess, loginSuccessMessage } from './userSlice'
import axios from 'axios'


//Login User.
export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());

  try {
    const res = await axios.post('api/auth/login', user)

    dispatch(loginSuccess(res.data))
    dispatch(loginSuccessMessage(res.data.message))
    dispatch(loginFailure(null));

    setTimeout(() => {
      dispatch(loginSuccessMessage(null))
      navigate('/')
    }, 3000);

  } catch (error) {
    dispatch(loginFailure(error.response?.data?.error));

    setTimeout(() => {
      dispatch(loginFailure(null))
    }, 3000);

  }
}


//Logout User
export const logout = async (dispatch, persistor, navigate) => {
  dispatch(loginStart());

  try {
    await axios.post('api/auth/logout')
    dispatch(loginSuccessMessage(res.data.message))
    dispatch(loginFailure(null));
    persistor.purge()
    navigate('/')

  } catch (error) {
    dispatch(loginFailure(error.response?.data?.error));
  }
}