import React from 'react'
import popularProducts from '../helpers/products'
import styled from 'styled-components'
import Product from './Product'


const Container = styled.div`
padding: 20px;
display: flex;

`


const Products = () => {
  return (
    <Container>
      {popularProducts.map((item) => (
        <Product key={item.id} item={item} />
      ))}

    </Container>
  )
}

export default Products