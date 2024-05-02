import React from 'react'
import popularProducts from '../helpers/products'
import styled from 'styled-components'
import Product from './Product'
import { mobile } from '../responsive'
import axios from 'axios'
import { useState, useEffect } from 'react'


const Container = styled.div`
padding: 20px;
display: grid;
overflow: hidden;
grid-template-columns: repeat(2, 1fr);
gap: 1.5rem ;
${mobile({ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' })}

`


const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(category ? `api/products?category=${category}` : 'api/products')
        console.log(res.data);
        setProducts(res.data)
      } catch (error) {
        console.log(error);

      }

    }
    fetchProducts()
  }, [category])



  useEffect(() => {
    if (category) {
      setFilterProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    } else {
      setFilterProducts(products)
    }



  }, [category, filters, products])


  useEffect(() => {
    if (sort === 'newest') {
      setFilterProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt))
    } else if (sort === 'asc') {
      setFilterProducts((prev) => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setFilterProducts((prev) => [...prev].sort((a, b) => b.price - a.price))
    }




  }, [sort])


  console.log(filterProducts);
  return (
    <Container>
      {filterProducts.map((item) => (
        <Product key={item._id} item={item} />
      ))}
    </Container>
  )
}

export default Products