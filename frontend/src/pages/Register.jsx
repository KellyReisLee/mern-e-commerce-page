import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
width: 100vw;
height: 100vh;
background:linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://img.freepik.com/free-photo/portrait-young-beautiful-sexy-woman-with-ghoul-hairstyle-trendy-girl-casual-summer-white-hipster-suit-clothes-sunglasses-hot-model-isolated-blue_158538-5868.jpg") center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Wrapper = styled.div`
width: 40%;
background-color: white;
padding: 20px;



`
const Title = styled.h1`
font-size: 25px;
font-weight: 300;


`
const Form = styled.form`
display: flex;
flex-wrap: wrap;

`
const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 15px 10px 0px 0px;
padding: 10px;
`
const Agreement = styled.span`
font-size: 12px;
margin: 20px 0px;
`
const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
width: 100%;

`




const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        <Form>
          <Input placeholder="Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="Username" />
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Input placeholder="Confirm Password" />
          <Agreement>
            By cretaing an account, I consent to the processing of my personal data in confidance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>Create</Button>

        </Form>
      </Wrapper>

    </Container>
  )
}

export default Register
