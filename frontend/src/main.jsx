import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'



// Define a URL base para todas as requisições dentro do axios.
axios.defaults.baseURL = 'http://localhost:4000/';
//Esta linha configura o Axios para enviar cookies junto com as requisições feitas para o servidor.
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'product/:id', element: <Product /> },
      { path: 'products/:category', element: <ProductList /> },
      { path: 'products/', element: <ProductList /> },
      { path: 'cart', element: <Cart /> }
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
