import styled from "styled-components";
import { mobile } from "../responsive";

export const Container = styled.div``;

export const Wrapper = styled.div`
  padding: 20px;
  margin-top: 1rem;
  ${mobile({ padding: "10px", height: "100%" })}
`;

export const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  color: #444;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const Add = styled.div``;
export const Remove = styled.div``;

export const TopButton = styled.button`
  padding: 10px;
  color: #444;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => (props.type === "filled" ? "none" : "1px solid #444")};
  background-color: ${(props) =>
    props.type === "filled" ? "#444" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "white" : "#444")};

  & a:active,
  a:visited {
    color: #444;
  }
`;

export const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
export const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;

  & a:active,
  a:visited {
    color: #444;
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

export const Info = styled.div`
  flex: 3;
`;

export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

export const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

export const Image = styled.img`
  width: 200px;
`;

export const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ProductName = styled.span``;

export const ProductId = styled.span``;

export const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const ProductSize = styled.span``;

export const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ flexDirection: "row", justifyContent: "space-around" })}
`;

export const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ margin: "5px 0" })}
`;

export const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  //${mobile({ margin: "5px 15px" })}
`;

export const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

export const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

export const SummaryTitle = styled.h1`
  font-weight: 200;
`;

export const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

export const SummaryItemText = styled.span``;

export const SummaryItemPrice = styled.span``;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #444;
  color: white;
  font-weight: 600;
`;

export const ProductsButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
  gap: 1rem;
  padding-right: 0.7rem;
  margin-bottom: 1rem;
`;
export const ButtonProduct = styled.button`
  padding: 0.4rem;
  border-radius: 3px;
  border: 1px solid gray;
  cursor: pointer;
`;
