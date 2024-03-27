import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../responsive'

const Container = styled.div`
height: 80px;
background-color: rgba(240, 248, 255, 0.4);
display: flex;
align-items: center;
text-align: center;
backdrop-filter: blur(20px);
position: sticky;
color: #31363F;
border-bottom: 6px solid teal;
position: sticky;
top: 0;
z-index: 10;
${mobile({ height: '60px' })}

`

const Wrapper = styled.div`
width: 100vw;
padding: 10px 20px;
display: flex;
justify-content: space-between;
align-items: center;
${mobile({ padding: '0px 10px 0px 0px' })}
`

const Left = styled.div`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
`

const Language = styled.span`
font-size: 14px;
cursor: pointer;
${mobile({ display: 'none' })}
`

const SearchContainer = styled.div`
gap: 0.2rem;
font-size: 14px;
border: 1px solid lightgray;
display: flex;
align-items: center;
justify-content: center;
margin-left: 10px;
border-radius: 3px;
padding: 0.1rem;

`
const Input = styled.input`
border: none;
padding: 0.3rem;
${mobile({ width: "50px" })}

`

const Center = styled.div`
flex: 2;
text-align: center;
`


const Logo = styled.h1`
font-weight: bold;
color: #555;
${mobile({ fontSize: "20px" })}

`

const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex: 3, justifyContent: "center", marginLeft: '0px', })}

`


const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-right: 1rem;
${mobile({
  width: "28% ", fontSize: '9px', marginRight: '0px'
})}
    `

const Navbar = () => {
  return (
    <Container >
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Urban</Logo>
        </Center>
        <Right>
          <MenuItem>
            REGISTER
          </MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem>
            <Badge badgeContent={4} color="warning" >
              <ShoppingCartOutlinedIcon color="action" />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
