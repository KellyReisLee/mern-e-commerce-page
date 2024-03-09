import React from 'react'
import styled from 'styled-components'
import categories from '../helpers/categories'
import CategoryItem from './CategoryItem'

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
padding: 6rem 4rem 6rem 4rem ;
justify-content: center;
align-items: center;
background-color: #FEFAE0;
`

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} />
      ))}
    </Container>
  )
}

export default Categories