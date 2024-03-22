
import React from 'react'
import styled from 'styled-components'
import SendSharpIcon from '@mui/icons-material/SendSharp';


const Container = styled.div`
height: 60vh;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #F5EEE6;

color: #333;


`

const Title = styled.h1`
font-size: 3.5rem;
color: #555;
margin-bottom: 0.3rem;
`

const Description = styled.p`
font-size: 1rem;
font-weight: 300;
margin-bottom: 2rem;
letter-spacing: 1px;
color: #333;
`

const InputContainer = styled.div`
width: 50%;
height: 40px;
background-color: transparent;
display: flex;
justify-content: space-between;
box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
-webkit-box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
-moz-box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
border-bottom-right-radius: 10px;
border-top-right-radius: 10px;
`

const Input = styled.input`
flex: 7;
height: 100%;
border: none;
border: 1px solid lightgray;
padding: 0 1rem;
border-right: none;
font-size: 0%.7;
`

const Button = styled.button`
flex: 1.5;
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