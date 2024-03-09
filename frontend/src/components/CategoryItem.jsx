import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
flex: 1;
margin: 5px;
height:70vh ;
position: relative;

`
const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
transition: all 1.5s ease;
filter: brightness(50%);

`
const Info = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;


`
const Title = styled.h1`
font-size: 2rem;
color: #FEFAE0;
font-weight: 900;



`

const Button = styled.button`
padding: 0.6rem 1rem;
border: none;
font-size: 0.9rem;
border-radius: 5px;
color: #31363F;
cursor: pointer;
margin-top: 0.8rem;
background-color: #FEFAE0;

`

const ContainerText = styled.div`
`

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>Show Now</Button>
      </Info>
    </Container>
  )
}

export default CategoryItem
