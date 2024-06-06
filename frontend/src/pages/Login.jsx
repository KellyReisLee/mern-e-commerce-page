import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from "../redux/userAPICalls";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorIsFetching,
  selectorError,
  selectorMessage,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/surprised-curly-woman-beret-looks-left-charming-lady-pink-sweater-sunglasses-green-skirt-holds-grey-handbag_197531-29645.jpg")
      left;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-size: cover;
`;

const Wrapper = styled.div`
  width: 50%;
  background-color: white;
  padding: 30px;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 25px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 100%;
  margin: 10px 10px 0px 0px;
  padding: 10px;
`;

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

  &:disabled {
    background-color: gray;
  }
`;

const Link = styled.a`
  margin: 2px 0px;
  font-size: 12px;
  cursor: pointer;
`;

const Message = styled.p`
  padding: 0.9rem 0.6rem;
  font-size: 0.9rem;
  margin: 0.4rem 0;
  color: white;
  font-weight: 600;
  letter-spacing: 0.7px;
`;

const Error = styled(Message)`
  background-color: #fb4e45e0;
`;
const Loading = styled(Message)`
  background-color: gray;
`;
const SuccessMessage = styled(Message)`
  background-color: green;
`;


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectorIsFetching);
  const error = useSelector(selectorError);
  const message = useSelector(selectorMessage);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });


  
  console.log(false)

  console.log(loading, error, message);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const { email, password } = userLogin;
    login(dispatch, { email, password }, navigate);
    if( message){
      setTimeout(() => {
        navigate('/')
      }, 2000);
      
    }
   
   
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        {loading && <Loading>Loading...</Loading>}
        {error && !loading && <Error>{error}</Error>}
        {message && !loading &&!error && <SuccessMessage>{message}</SuccessMessage>}
        <Form>
          <Input
            name="email"
            type="email"
            value={userLogin.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <Input
            name="password"
            type="password"
            value={userLogin.password}
            onChange={handleInputChange}
            placeholder="Password"
          />

          <Button disabled={loading} onClick={handleSubmitLogin}>
            Login
          </Button>
          <Link>DO NOT REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
