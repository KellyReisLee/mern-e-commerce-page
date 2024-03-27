import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
width: 100vw;
height: 100vh;
background:linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://img.freepik.com/free-photo/surprised-curly-woman-beret-looks-left-charming-lady-pink-sweater-sunglasses-green-skirt-holds-grey-handbag_197531-29645.jpg") left;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background-size: cover;



`


const Wrapper = styled.div`
width: 30%;
background-color: white;
padding: 30px;
${mobile({ width: '75%' })}
`
const Title = styled.h1`
font-size: 25px;
font-weight: 300;



`
const Form = styled.form`
display: flex;
flex-direction: column;


`
const Input = styled.input`
flex: 1;
min-width: 100%;
margin: 10px 10px 0px 0px;
padding: 10px;
`

const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
width: 100%;
margin-top: 20px;
margin-bottom: 10px;

`

const Link = styled.a`
margin: 2px 0px;
font-size: 12px;
cursor: pointer;

`


const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input placeholder="Email" />
          <Input placeholder="Password" />

          <Button>Login</Button>
          <Link>DO NOT REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>

        </Form>
      </Wrapper>

    </Container>
  )
}

export default Login