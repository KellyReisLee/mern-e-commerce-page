import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Anouncement from '../components/Announcement'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../redux/cartSlice.js';
import { selectorCurrentUser } from '../redux/userSlice.js'
import { Skeleton } from '@mui/material'
import {sendCartData, fetchCartData} from '../redux/cartAPICalls.js'
import { fetchProductData } from '../redux/productAPICalls.js'
import {selectProduct} from '../redux/productSlice.js'
import {Container, Wrapper, Image, ImgContainer, InfoContainer, Title, Description, Price, Filter, FilterColor, FilterContainer, FilterSize, FilterSizeOption, FilterTitle, Add, AddContainer, Amount, AmountContainer, StyledButton, ContainerSkeletonHorizontal, ContainerSkeletonVertical, Error, ErrorContainer, Remove} from './Product.style.jsx'




const Product = () => {
  //const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector(selectorCurrentUser);
  const token = currentUser.accessToken;
  const { id } = useParams();
  const productIndividual = useSelector(selectProduct)
  console.log(productIndividual)



  // useEffect(() =>{
  //   dispatch(fetchCartData(token, currentUser._id))
  // }, [dispatch])
  

  // useEffect(() => {
  //   dispatch(fetchProductData(id))
  // }, [id])
  //console.log(product);
  console.log(color, size, quantity);



  const hanndleQuantity = (type) => {
    if (type === 'inc' && quantity >= 1) {
      setQuantity((prev) => prev + 1)

    } else if (type === 'dec' && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }

  }

  const handleValidValues = () => {
    if (!color) {
      setError('Please, choose one color.')
      return false
    }

    if (!size) {
      setError('Please, choose the size.')
      return false
    }
    return true
  }



  const cartItems = cart.products.map((product) => ({
    productId: productIndividual._id,
    quantity: product.quantity,
  }));
  //console.log(productIndividual._id)

console.log(cart.products)
  const handleClickAddCart = () => {

    if (handleValidValues()) {
      dispatch(
        cartActions.addProduct({ productIndividual, quantity, color, size })
      )
      setError('')
    }
    dispatch(sendCartData(cartItems, token, currentUser._id))
  }

  


  return (
    <>
      <Container>
        <Anouncement />
        <Navbar />
        <Wrapper>
          {Object.keys(productIndividual).length === 0 ? (
            <ContainerSkeletonHorizontal>
              <Skeleton variant="rounded" sx={{ width: '50%', height: '100%', bgcolor: 'grey.400' }} />
              <ContainerSkeletonVertical  >
                <Skeleton variant="rectangular" sx={{ width: '100%' }} />
                <Skeleton variant="rectangular" sx={{ width: '100%' }} />
                <Skeleton variant="square" width={100} height={30} />
                <Skeleton variant="rectangular" sx={{ width: '100%' }} />
                <Skeleton variant="rectangular" sx={{ width: '100%' }} />

              </ContainerSkeletonVertical>
            </ContainerSkeletonHorizontal>
          ) : (
            <>
              <ImgContainer>
                <Image src={productIndividual.image} />
              </ImgContainer>
              <InfoContainer>
                <Title>{productIndividual.title}</Title>
                <Description>{productIndividual.description}</Description>
                <Price>{productIndividual.price}</Price>
                {error && <ErrorContainer>
                  <Error>{error}</Error>
                </ErrorContainer>}
                <FilterContainer>
                  {/* color */}
                  <Filter>
                    <FilterTitle>Color: </FilterTitle>
                    {productIndividual.color?.map((c) => (
                      <FilterColor onClick={() => setColor(c)} key={c} color={c} />
                    ))}

                  </Filter>
                  {/* Size */}
                  <Filter>
                    <FilterTitle>Size: </FilterTitle>
                    <FilterSize onChange={(e) => setSize(e.target.value)} defaultValue="Size" >
                      <FilterSizeOption ></FilterSizeOption>
                      {productIndividual.size?.map((s) => (
                        <FilterSizeOption key={s}>{s}</FilterSizeOption>
                      ))}

                    </FilterSize>

                  </Filter>
                </FilterContainer>
                {/* Add container */}
                <AddContainer>
                  <AmountContainer>
                    <Remove onClick={() => hanndleQuantity('dec')} >-</Remove>
                    <Amount>{quantity}</Amount>
                    <Add onClick={() => hanndleQuantity('inc')} >+</Add>
                  </AmountContainer>
                  <StyledButton  to={`/cart/${currentUser._id}`} onClick={handleClickAddCart}>ADD TO CART</StyledButton>
                </AddContainer>
              </InfoContainer>
            </>
          )
          }

        </Wrapper>
        <NewsLetter />
        <Footer />
      </Container >
    </>
  )
}

export default Product
