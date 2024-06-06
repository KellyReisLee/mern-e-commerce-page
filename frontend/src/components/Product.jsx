import React, { useState, useEffect } from 'react'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { Link } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { wishSliceActions, selectorWishList } from '../redux/wishSlice.js';
import { selectorCurrentUser } from '../redux/userSlice.js';
import {Info, Container, Circle, Icon, IconIncluded, Image} from './Product.style.jsx'
import { useSelector, useDispatch } from 'react-redux';

const Product = ({ item }) => {
  const wishList = useSelector(selectorWishList)
  const dispatch = useDispatch()
  const [wish, setWish] = useState();
  const currentUser = useSelector(selectorCurrentUser)
  

  useEffect(() => {
    const itemIncluded = wishList.wishList.find((product) => product._id === item._id);
    if (itemIncluded) {
      setWish(true)
    }

  }, [])


  function handleAddWishList(item) {
    dispatch(wishSliceActions.addWishList({ ...item }))
    setWish(true)
  }

  function handleRemoveWishList(item) {
    dispatch(wishSliceActions.removeItemWish({ ...item }))
    setWish(false)
  }
  return (
    <Container>
      <Circle />
      <Image src={item.image} />
      <Info>
        {wish ? (
          <IconIncluded >
            <FavoriteBorderRoundedIcon onClick={() => handleRemoveWishList(item)} />
          </IconIncluded>
        ) : (
          <Icon >
            <FavoriteBorderRoundedIcon onClick={() => handleAddWishList(item)} />
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
