import React from 'react'
import styled from 'styled-components'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Container = styled.div`
display: flex;
width: 100%;
height: 20%;
background-color: #016A70;
color: #FFF9F9;

`
const Left = styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 2rem ;

`

const Logo = styled.h1`
font-size: 3rem;


`

const Desc = styled.p`
 font-family: "Poppins", sans-serif;
 margin: 10px 0 30px 0;
 font-size: 0.8rem;

 
`

const SocialContainer = styled.div`
display: flex;
gap: 1.2rem;
`

const SocialIcon = styled.div`
width: 50px;
height: 50px;
background-color: teal;
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;


&:hover{
  background-color: #FFF9F9;
  color: teal;
  transform: scale(1.1);
}
`

const Center = styled.div`
flex: 1;
padding: 2rem;

`

const Title = styled.h2`
margin-bottom: 26px;
letter-spacing: 1px;
font-size: 1.3rem;
font-family: "Urbanist", sans-serif;

`

const List = styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
flex-wrap: wrap;

`

const ListItem = styled.li`
font-size: 0.9rem;
width: 50%;
margin-bottom: 13px;
font-family: "Urbanist", sans-serif;
`
const Right = styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 2rem;
align-items: flex-start;
gap: 5px;
font-size: 1rem;
font-family: "Urbanist", sans-serif;
`

const ContactItem = styled.div`
margin-bottom: 7px;
display: flex;
justify-content: center;
align-items: center;
gap: 1px;
font-size: 0.9rem;
letter-spacing: 0.6px;

`

const Payment = styled.img`
width: 70% ;
margin-top: 0.4rem;
`

const Footer = () => {
  return (
    <Container>
      {/* Left Container */}
      <Left>
        <Logo>Urban</Logo>
        <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Desc>
        <SocialContainer >
          <SocialIcon  >
            <FacebookOutlinedIcon />
          </SocialIcon>
          <SocialIcon  >
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon  >
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon >
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>
          Useful Links
        </Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>
          Contact
        </Title>

        <ContactItem>
          <PlaceIcon style={{ marginRight: "10px" }} /> 622 Dixie Path , South Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <PhoneEnabledIcon style={{ marginRight: "10px" }} /> +351 987 536 908
        </ContactItem>
        <ContactItem>
          <EmailOutlinedIcon style={{ marginRight: "10px" }} /> contact@urban.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />

      </Right>
    </Container>
  )
}

export default Footer