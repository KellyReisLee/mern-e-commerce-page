import React from 'react'
import popularProducts from '../helpers/products'
import styled from 'styled-components'
import Product from './Product'
import { mobile } from '../responsive'


const Container = styled.div`
padding: 20px;
display: flex;
${mobile({ display: 'block' })}

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