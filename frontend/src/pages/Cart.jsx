//import { Add, Remove } from "@material-ui/icons";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { useSelector, useDispatch } from "react-redux";
import Stripecheckout from "react-stripe-checkout";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cartActions } from "../redux/cartSlice.js";
import {
  selectorTotalPrice,
  selectorCartProducts,
  selectProductsQuantity,
} from "../redux/cartSlice.js";
import {
  selectorWishList,
  selectProductsQuantityWish,
  wishSliceActions,
} from "../redux/wishSlice.js";
import { formatNumber } from "../utils/formatting.js";
import { selectorCurrentUser } from "../redux/userSlice.js";
import {Container, Wrapper, Title, Top, TopButton, Add, Remove, TopText, TopTexts, Bottom, Info, Product, ProductAmount, Image, Details, ProductColor, ProductDetail, ProductId, ProductName, ProductPrice, ProductSize, ProductAmountContainer, ProductsButton, PriceDetail, Hr, Summary, SummaryItem, SummaryItemPrice, SummaryItemText, SummaryTitle, Button, ButtonProduct, } from './Cart.styled.jsx'

const KEY = import.meta.env.VITE_STRIPE;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector(selectorCurrentUser);
  const wishListArray = useSelector(selectorWishList);
  const totalQuantityProducts = useSelector(selectProductsQuantity);
  const totalQuantityWishList = useSelector(selectProductsQuantityWish);
  const totalPrice = useSelector(selectorTotalPrice);
  const [stripeToken, setStripeToken] = useState(null);
  const { id } = useParams();
const token = currentUser.accessToken;
 
  console.log(cart);
  console.log(token);


  const onToken = (token) => {
    setStripeToken(token);
  };

  const cartItems = cart.products.map((product) => ({
    productId: product._id,
    quantity: product.quantity,
  }));

 
  //console.log(cartItems);



  useEffect(() => {
    const changingCart = async () => {
      if (!token) {
        console.log('No token found');
        return;
      }

      try {
        const response = await axios.put(
          `/api/carts/${id}`,
          { products: cartItems }, // Ensure this matches the expected payload structure
          {
            headers: {
              'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error('Error updating cart:', error.response ? error.response.data : error.message);
      }
    };

    if (cartItems.length > 0) {
      changingCart();
    }
  }, [cartItems]);


  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("api/checkout/payment", {
          tokenId: stripeToken.id,
          amount: formatNumber(totalPrice) * 100,
        });
        // navigate to success page.
        if (res) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  const handleClickRemoveCart = (item) => {
    dispatch(cartActions.removeProduct({ ...item }));
  };

  const handleRemoveComplete = (item) => {
    dispatch(cartActions.removeProductComplete({ ...item }));
  };

  const handleClickAddCart = (item) => {
    dispatch(cartActions.addProduct({ ...item }));
  };

  const handleAddWishList = (item) => {
    dispatch(wishSliceActions.addWishList({ ...item }));
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>
            <Link to="/">CONTINUE SHOPPING</Link>
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag({totalQuantityProducts})</TopText>
            <TopText>
              <Link to={`/wishlist/${currentUser._id}`}>
                Your Wishlist ({totalQuantityWishList})
              </Link>
            </TopText>
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
                      <Remove onClick={() => handleClickRemoveCart(item)}>
                        -
                      </Remove>
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {formatNumber(item.price * item.quantity)}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
                <ProductsButton>
                  <ButtonProduct onClick={() => handleRemoveComplete(item)}>
                    Remove from Cart
                  </ButtonProduct>
                  <ButtonProduct onClick={() => handleAddWishList(item)}>
                    Add to Wishlist
                  </ButtonProduct>
                </ProductsButton>

                <Hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {formatNumber(totalPrice)}</SummaryItemPrice>
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
              <SummaryItemPrice>$ {formatNumber(totalPrice)}</SummaryItemPrice>
            </SummaryItem>
            <Stripecheckout
              name="Urban"
              image={logo}
              billingAddress
              shippingAddress
              description={`Your total is $${formatNumber(totalPrice)}`}
              amount={formatNumber(totalPrice) * 100}
              token={onToken}
              stripeKey={KEY}>
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
