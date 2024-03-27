
import React from 'react'
import styled from 'styled-components'
import SendSharpIcon from '@mui/icons-material/SendSharp';
import { mobile } from '../responsive'

const Container = styled.div`
height: 60vh;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #F5EEE6;
color: #333;
${mobile({ textAlign: 'center', width: '100%', height: '40vh' })}

`

const Title = styled.h1`
font-size: 3.5rem;
color: #555;
margin-bottom: 0.3rem;
${mobile({ fontSize: '2rem' })}
`

const Description = styled.p`
font-size: 1rem;
font-weight: 300;
margin-bottom: 2rem;
letter-spacing: 1px;
color: #333;
${mobile({ fontSize: '0.7rem', marginBottom: '1.4rem' })}


`

const InputContainer = styled.div`
width: 50%;
height: 40px;
background-color: transparent;
display: flex;
justify-content: space-between;
${mobile({ width: '80%' })}


`

const Input = styled.input`
flex: 6;
height: 100%;
border: none;
border: 1px solid lightgray;
padding: 0 1rem;
border-right: none;
font-size: 0.7rem;


`

const Button = styled.button`
flex: 1.8;
border: 1px solid lightgray;
background-color: teal;
color: white;
cursor: pointer;


&:hover{
  color: teal;
  background-color: lightgrey;
}
`

const NewsLetter = () => {
  return (
    <Container>
      <Title>NewsLetter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder='Your email' />
        <Button>
          <SendSharpIcon sx={{ fontSize: 24 }} />
        </Button>
      </InputContainer>

    </Container>
  )
}

export default NewsLetter