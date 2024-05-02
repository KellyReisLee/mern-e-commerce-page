//import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from '../responsive'
import { useSelector, useDispatch } from 'react-redux';
import Stripecheckout from 'react-stripe-checkout'
import logo from '../assets/logo.png'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from '../redux/cartSlice.js';



const KEY = import.meta.env.VITE_STRIPE;
const Container = styled.div``;

const Wrapper = styled.div`

  padding: 20px;
  margin-top: 1rem;
  ${mobile({ padding: '10px', height: '100%' })}

 
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  color: #444;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;


const Add = styled.div``
const Remove = styled.div``

const TopButton = styled.button`
  padding: 10px;
  color: #444;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" ? "none" : '1px solid #444'};
  background-color: ${(props) =>
    props.type === "filled" ? "#444" : "transparent"};
  color: ${(props) => props.type === "filled" ? "white" : '#444'};


  & a:active, a:visited{
  color: #444;
  
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}

  
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;

  & a:active,a:visited{
    color: #444;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}

 

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
  
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ flexDirection: 'row', justifyContent: 'space-around' })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ margin: '5px 0' })}
  
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  //${mobile({ margin: '5px 15px' })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
 
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #444;
  color: white;
  font-weight: 600;
`;

const ProductsButton = styled.div`
width: 100%;
display: flex;
justify-content: end;
align-items: end;
gap: 1rem;
padding-right: 0.7rem;
margin-bottom: 1rem;
`
const ButtonProduct = styled.button`
padding: 0.4rem;
border-radius: 3px;
border: 1px solid gray;
cursor: pointer;

`

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token)
  }

  //console.log(stripeToken);

  const totalCartProducts = cart.products.reduce((inicial, product) => {
    return inicial + product.total

  }, 0)

  const quantityProducts = cart.products.reduce((inicial, product) => {
    return inicial + product.quantity
  }, 0)

  // const quantityWishList = cart.wishList.reduce((inicial, item) =>{
  //   return inicial + item.quantity
  // })





  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post('api/checkout/payment', {
          tokenId: stripeToken.id,
          amount: cart.total * 100,

        })
        // navigate to success page.
        if (res) {
          navigate('/')
        }
      } catch (error) {
        console.log(error);

      }
    }
    stripeToken && makeRequest()
  }, [stripeToken])

  console.log(cart.wishList);

  const handleClickRemoveCart = (item) => {
    console.log(item);
    dispatch(
      cartActions.removeProduct({ ...item })
    )
  }

  const handleRemoveComplete = (item) => {
    dispatch(
      cartActions.removeProductComplete({ ...item })
    )
  }


  const handleClickAddCart = (item) => {
    dispatch(
      cartActions.addProduct({ ...item })
    )
  }

  const handleAddWishList = (item) => {
    dispatch(
      cartActions.addWishList({ ...item })
    )
  }

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>
            <Link to='/'>CONTINUE SHOPPING</Link>
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag({quantityProducts})</TopText>
            <TopText><Link to='/wishlist'>Your Wishlist ({cart.wishList.length})</Link></TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((item) => (
              <>
                <Product key={item._id}>
                  <ProductDetail>
                    <Image src={item.image} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {item.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {item._id}
                      </ProductId>
                      <ProductColor color={item.color} />
                      <ProductSize>
                        <b>Size:</b> {item.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add onClick={() => handleClickAddCart(item)}>+</Add>
                      <ProductAmount>{item.quantity}</ProductAmount>
                      <Remove onClick={() => handleClickRemoveCart(item)}>-</Remove>
                    </ProductAmountContainer>
                    <ProductPrice>$ {item.price * item.quantity}</ProductPrice>
                  </PriceDetail>

                </Product>
                <ProductsButton>

                  <ButtonProduct onClick={() => handleRemoveComplete(item)}>Remove from Cart</ButtonProduct>
                  <ButtonProduct onClick={() => handleAddWishList(item)}>Add to Wishlist</ButtonProduct>
                </ProductsButton>

                <Hr />

              </>
            ))}


          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {totalCartProducts}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {totalCartProducts}</SummaryItemPrice>
            </SummaryItem>
            <Stripecheckout
              name="Urban"
              image={logo}
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </Stripecheckout>

          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;