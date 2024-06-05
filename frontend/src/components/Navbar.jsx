import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductsQuantity } from "../redux/cartSlice";
import { selectorCurrentUser } from "../redux/userSlice";
import Avatar from "../assets/avatar.png";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { logout } from "../redux/userSlice";
import {persistor} from '../redux/store'
import axios  from "axios";

const Container = styled.div`
  height: 80px;
  background-color: rgba(240, 248, 255, 0.4);
  display: flex;
  align-items: center;
  text-align: center;
  backdrop-filter: blur(20px);
  position: sticky;
  color: #31363f;
  border-bottom: 6px solid teal;
  position: sticky;
  top: 0;
  z-index: 10;
  ${mobile({ height: "60px" })}
`;

const Wrapper = styled.div`
  width: 100vw;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "0px 10px 0px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

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
`;
const Input = styled.input`
  border: none;
  padding: 0.3rem;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 2;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: #555;
  ${mobile({ fontSize: "20px" })}

  & a {
    color: #555;
    text-decoration: none;
  }
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 3, justifyContent: "center", marginLeft: "0px" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-right: 1rem;
  ${mobile({
    width: "28% ",
    fontSize: "9px",
    marginRight: "0px",
  })}

  & a {
    color: #333;
    text-decoration: none;
  }
`;

const MenuItemUser = styled(MenuItem)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  gap: 0.4rem;
  color: #666;
  font-weight: 600;
`;

const ImageContainer = styled.div`
  width: 27px;
  height: 27px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const UserItem = styled.p``;

const MenuUserBlock = styled.div`
  min-width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  padding: 0.9rem 0.2rem;
  gap: 0.5rem;
  margin-left: 0.5rem;
  & > :last-child {
    margin-left: 0.4rem;
    background-color: white;
    border-radius: 10px;
    width: 29px;
    height: 29px;
    color: teal;
    border: 1px solid teal;
    &:hover {
      background-color: teal;
      color: white;
    }
  }
`;

const DropDownContainer = styled.div`
  width: 233px;
  height: 200px;
  position: absolute;
  background-color: #edebeb;
  top: 77px;
  left: 14%;
  display:${props => (props.isopen === 'true' ? 'block' : 'none')};
`
const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(100%, 1fr)
  ); /* Distribui igualmente o espaço */
  gap: 10px; /* Espaçamento entre os itens */
  justify-items: center;
  place-items: center;


  & > :first-child{
    margin-top: 6px;
  }
 
  & > :last-child{
    border-bottom:none
  }
  
`;
const ItemList = styled.li`
width: 100%;
  padding: 10px;
  list-style-type: none;
  color: #777;
  border-bottom: 0.7px solid #99999968;
  cursor: pointer;
  font-weight: 600;

  &:hover{
    color: teal;
    
  }

`;

const Navbar = () => {
  const quantityProducts = useSelector(selectProductsQuantity);
  const currentUser = useSelector(selectorCurrentUser);
  const [dropDownBtn, setDropDownBtn] = useState(false);
  const dispatch = useDispatch()
  const btnArrow = dropDownBtn ? <ExpandMoreIcon /> : <ExpandLessIcon />;
  console.log(currentUser);
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get('api/auth/logout');
      dispatch(logout());
      persistor.purge();
      setDropDownBtn(false)
      navigate('/'); // Redireciona para a página de login após o logout
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <Link to="/">Urban</Link>
          </Logo>
        </Center>
        <Right>
          {!currentUser && (
            <>
              <MenuItem>
                <Link to="/register">REGISTER</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login">SIGN IN</Link>
              </MenuItem>
            </>
          )}

          {currentUser && (
            <>
              <MenuItemUser>
                <Link to={`/cart/${currentUser._id}`}>
                  <Badge badgeContent={quantityProducts} color="warning">
                    <ShoppingCartOutlinedIcon color="action" />
                  </Badge>
                </Link>
                <MenuUserBlock>
                  <ImageContainer>
                    <Image src={Avatar} />
                  </ImageContainer>

                  <UserItem>{currentUser?.username || "User"}</UserItem>
                  <UserItem onClick={() => setDropDownBtn(!dropDownBtn)}>{btnArrow}</UserItem>
                </MenuUserBlock>
              </MenuItemUser>
            </>
          )}

          <DropDownContainer isopen={dropDownBtn.toString()}>
            <List>
              <ItemList>User Profile</ItemList>
              <ItemList>Wishlist</ItemList>
              <ItemList>Orders</ItemList>
              <ItemList onClick={handleLogout}>Logout</ItemList>
            </List>
          </DropDownContainer>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
