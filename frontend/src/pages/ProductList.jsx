import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Anouncement from '../components/Announcement'
import Products from '../components/Products'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import { mobile } from '../responsive'
import { useLocation } from 'react-router-dom';

const Container = styled.div``
const Title = styled.h1`
margin: 20px;
color: #555;
${mobile({ textAlign: 'center' })}

`


const FilterContainer = styled.div`
display: flex;
justify-content: space-between;

`
const Filter = styled.div`
margin: 20px;

`

const FilterText = styled.span`
font-size: 20px;
font-weight: 600;
margin-right: 10px;
color: #555;
${mobile({ fontSize: '1rem', marginBottom: '0.3rem' })}
`

const Select = styled.select`
padding: 10px;
margin-right: 10px;
color: #555;
${mobile({ padding: '5px', marginTop: '0.1rem', })}

`
const Option = styled.option``


const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filters, setFilters] = useState("");
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    setFilters({
      ...filters
      , [e.target.name]: e.target.value
    })
  }

  console.log(filters);

  return (
    <Container>
      <Anouncement />
      <Navbar />
      <Title>{category.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products: </FilterText>
          <Select name="color" onChange={handleFilters} defaultValue="Color">
            <Option disabled>Color</Option>
            <Option value="white">white</Option>
            <Option value="black">black</Option>
            <Option value="red">red</Option>
            <Option value="blue">blue</Option>
            <Option value="yellow">yellow</Option>
            <Option value="green">green</Option>
          </Select>
          <Select name='size' onChange={handleFilters} defaultValue="Size">
            <Option disabled>Size</Option>
            <Option value="XS">XS</Option>
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
          </Select>

        </Filter>
        <Filter>
          <FilterText>
            Sort Products:
          </FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest" selected>newest</Option>
            <Option value="asc" >Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </Container>
  )
}

export default ProductList
