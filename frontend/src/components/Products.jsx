import React from 'react'
import styled from 'styled-components'
import Product from './Product'
import { mobile } from '../responsive'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { fetchAllProductsData } from '../redux/productAPICalls'
import { selectAllProducts } from '../redux/productSlice'


const Container = styled.div`
padding: 20px;
display: grid;
overflow: hidden;
grid-template-columns: repeat(2, 1fr);
gap: 1.5rem ;
${mobile({ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' })}

`


const Products = ({ category, filters, sort }) => {
  const [filterProducts, setFilterProducts] = useState([]);
  const productsArray =  useSelector(selectAllProducts)
  const dispatch = useDispatch()
  console.log(productsArray)
  

  useEffect(() => {
    dispatch(fetchAllProductsData(category))
    
  }, [category])
  



  useEffect(() => {
    if (category) {
      setFilterProducts(
        productsArray.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    } else {
      setFilterProducts(productsArray)
    }



  }, [category, filters, productsArray])


  useEffect(() => {
    if (sort === 'newest') {
      setFilterProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt))
    } else if (sort === 'asc') {
      setFilterProducts((prev) => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setFilterProducts((prev) => [...prev].sort((a, b) => b.price - a.price))
    }

  }, [sort])
  
  return (
    <Container>
      {filterProducts.map((item) => (
        <Product key={item._id} item={item} />
      ))}
    </Container>
  )
}

export default Products