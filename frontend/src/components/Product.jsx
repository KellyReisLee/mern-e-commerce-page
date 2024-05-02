import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { Link } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../responsive'
import { cartActions } from '../redux/cartSlice.js';
import { useSelector, useDispatch } from 'react-redux';

const Info = styled.div`

opacity: 0;
width: 100%;
height: 100%;
top: 0;
left: 0;
position: absolute;
background-color: rgba(0, 0, 0, 0.2);
z-index: 3;
display: flex;
justify-content: center;
align-items: center;
gap: 0.8rem;
transition: all 0.5s ease;
${mobile({ display: 'flex', padding: '0px' })}
`

const Container = styled.div`
display: flex;
width: 100%;
height: 350px;
display: flex;
align-items: center;
justify-content: center;
background-color: #CCD3CA;
position: relative;
cursor: pointer;
border-radius: 10px;

&:hover ${Info}{
  opacity: 1;
}

&:hover{
  box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
-webkit-box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
-moz-box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
}

`

const Circle = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
background-color: white;
position: absolute;
`
const Image = styled.img`
height: 75%;
z-index: 1;
border-radius: 10px;

`

const Icon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
color: teal;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.5s ease;

&:hover{
  background-color: teal;
  color: white;
  transform: scale(1.1);
  cursor: pointer;
  
}

`


const IconIncluded = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: teal;
color: white;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.5s ease;

&:hover{
  background-color: white;
  color: teal;
  transform: scale(1.1);
  cursor: pointer;
  
}

`


const Product = ({ item }) => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [wish, setWish] = useState();



  console.log(cart);

  useEffect(() => {
    const itemIncluded = cart.wishList.find((product) => product._id === item._id);
    if (itemIncluded) {
      setWish(true)
    }

  }, [])


  function addWishListItem(item) {
    dispatch(cartActions.addItemWish({ ...item }))
    setWish(true)
  }

  function removeWishListItem(item) {
    dispatch(cartActions.removeItemWish({ ...item }))
    setWish(false)
  }
  return (
    <Container>
      <Circle />
      <Image src={item.image} />
      <Info>
        {wish ? (
          <IconIncluded >
            <FavoriteBorderRoundedIcon onClick={() => removeWishListItem(item)} />
          </IconIncluded>
        ) : (
          <Icon >
            <FavoriteBorderRoundedIcon onClick={() => addWishListItem(item)} />
          </Icon>

        )}

        <Link to={`/product/${item._id}`}>

          <Icon>
            <SearchRoundedIcon
            />

          </Icon>
        </Link>
        <Icon>
          <ShoppingCartOutlinedIcon />
        </Icon>
      </Info>
    </Container>
  )
}

export default Product
