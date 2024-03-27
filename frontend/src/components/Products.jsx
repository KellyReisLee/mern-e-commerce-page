import React from 'react'
import popularProducts from '../helpers/products'
import styled from 'styled-components'
import Product from './Product'
import { mobile } from '../responsive'


const Container = styled.div`
padding: 20px;
display: grid;
overflow: hidden;
grid-template-columns: repeat(2, 1fr);
gap: 1.5rem ;
${mobile({ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' })}

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