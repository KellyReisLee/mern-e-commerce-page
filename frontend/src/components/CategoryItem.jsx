import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'


const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
transition: all 1.5s ease;
${mobile({ height: '30vh', objectPosition: 'right top' })}

`

const Container = styled.div`
flex: 1;
margin: 5px;
height:70vh ;
position: relative;
${mobile({ height: '30vh', })}


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

const WhiteCard = styled.div`
background-color:  rgba(240, 248, 240, 0.4);
padding: 1.6rem 2rem;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
backdrop-filter: blur(20px);
${mobile({ height: '14vh' })}
`
const Title = styled.h1`
font-size: 2rem;
color: #444;
font-weight: 900;
${mobile({ fontSize: '1rem' })}
`

const Button = styled.button`
padding: 0.7rem 1.5rem;
border: none;
font-size: 1rem;
border-radius: 5px;
color: #FEFAE0;
cursor: pointer;
margin-top: 1.1rem;
background-color: teal;
cursor: pointer;
transition: all 0.3s ease-in;
letter-spacing: 0.8px;
${mobile({ padding: '0.4rem 0.7rem', fontSize: '0.6rem', marginTop: '0.5rem', fontWeight: '300' })}



&:hover{
  transform: scale(1.1);
 
}

& a,  a:visited, a:active{
  color: #FEFAE0;
  text-decoration: none;
}




`


const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <WhiteCard>
          <Title>{item.title}</Title>
          <Button>
            <Link to={`/products/${item.category}`}>Show Now</Link>
          </Button>
        </WhiteCard>
      </Info>
    </Container >
  )
}

export default CategoryItem
