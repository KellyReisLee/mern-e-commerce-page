import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Anouncement from '../components/Announcement'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Container = styled.div``
const Wrapper = styled.div`
padding: 50px;
display: flex;


`
const ImgContainer = styled.div`
flex: 1;

`
const Image = styled.img`
width: 100%;
height: 90vh;
object-fit: cover;

`
const InfoContainer = styled.div`
flex: 1;
padding: 0 50px;
`
const Title = styled.h1`
font-weight: 200;



`
const Description = styled.p`
margin: 20px 0px;
`
const Price = styled.span`
font-weight: 100;
font-size: 50px;
`
const FilterContainer = styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-around;

`
const Filter = styled.div`
margin: 20px;
display: flex;

`

const FilterTitle = styled.div`
font-size: 20px;
font-weight: 200;
margin-right: 3px;

`
const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${(props) => props.color};
margin: 0px 3px;
cursor: pointer;
`
const FilterSize = styled.select`
margin-left: 5px;
padding: 2px 3px;
cursor: pointer;



`
const FilterSizeOption = styled.option`

`;



const Product = () => {
  return (
    <Container>
      <Anouncement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src="https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png" />
        </ImgContainer>
        <InfoContainer>
          <Title>Lorem ipsum is placeholder text</Title>
          <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Description>
          <Price>$ 20</Price>
          <FilterContainer>
            {/* color */}
            <Filter>
              <FilterTitle>Color: </FilterTitle>
              <FilterColor color='black' />
              <FilterColor color='darkblue' />
              <FilterColor color='gray' />
            </Filter>
            {/* Size */}
            <Filter>
              <FilterTitle >Size</FilterTitle>
              <FilterSize >
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>

          </FilterContainer>
        </InfoContainer>
      </Wrapper>


      <NewsLetter />
      <Footer />
    </Container>
  )
}

export default Product