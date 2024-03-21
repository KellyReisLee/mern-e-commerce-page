
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
gap: 0.8rem;
color: #333;


`

const Title = styled.h1`
font-size: 5rem;
`

const Description = styled.h3`
font-size: 2rem;
font-weight: 300;
margin-bottom: 1.7rem;
letter-spacing: 1px;
`

const InputContainer = styled.div`
width: 50%;
height: 80px;
background-color: white;
display: flex;
justify-content: space-between;
border: 1px solid lightgray;
box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
-webkit-box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
-moz-box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
`

const Input = styled.input`
flex: 8;
height: 100%;
border: none;
border-bottom-left-radius: 10px;
border-top-left-radius: 10px;
padding: 0 1.7rem;
font-size: 1.5rem;
`

const Button = styled.button`
flex: 1.3;
border-bottom-right-radius: 10px;
border-top-right-radius: 10px;
border: 1px solid lightgray;
background-color: teal;
color: white;


`

const NewsLetter = () => {
  return (
    <Container>
      <Title>NewsLetter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder='Your email' />
        <Button>
          <SendSharpIcon sx={{ fontSize: 40 }} />
        </Button>
      </InputContainer>

    </Container>
  )
}

export default NewsLetter