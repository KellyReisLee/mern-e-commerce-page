
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { mobile } from '../responsive'

export const Container = styled.div``

export const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({ padding: '10px 5px', flexDirection: 'column', })}

`
export const ImgContainer = styled.div`
flex: 1;

`
export const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

export const InfoContainer = styled.div`
flex: 1;
padding: 0 50px;

${mobile({ padding: '20px' })}

`


export const Title = styled.h1`
font-weight: 200;
`
export const Description = styled.p`
margin: 20px 0px;
`


export const Price = styled.span`
font-weight: 100;
font-size: 50px;


`


export const FilterContainer = styled.div`
margin: 10px 0px;
display: flex;
justify-content: space-between;
${mobile({ width: '100%', })}

`
export const Filter = styled.div`
margin-top: 10px;
display: flex;
justify-content: flex-start;
${mobile({ margin: '0', })}
`
export const FilterTitle = styled.div`
font-size: 20px;
font-weight: 200;
margin-right: 3px;

`
export const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${(props) => props.color};
margin: 0px 3px;
cursor: pointer;
`
export const FilterSize = styled.select`
margin-left: 5px;
padding: 2px 3px;
cursor: pointer;


`
export const FilterSizeOption = styled.option`
  `
export const AddContainer = styled.div`
 width: 100%;
  display: flex;
  align-items: center;
  margin-top: 3rem;
  gap: 1rem;
  ${mobile({ width: '100%', margin: '0', gap: '0.1rem' })}

 
`;

export const AmountContainer = styled.div`
 display: flex;
 flex: 1;
  align-items: center;
  font-weight: 700;
  ${mobile({ width: '100%', flexDirection: 'column', margin: '0', })}



`;
export const Remove = styled.option`
font-size: 2rem;
margin-right: 0.3rem;
font-weight: 300;
`;
export const Amount = styled.span`
width: 32px;
height: 32px;
border-radius: 10px;
border: 1px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 5px;



`;
export const Add = styled.span`
font-size: 1.2rem;
margin-left: 0.3rem;
font-weight: 500;
`;

export const StyledButton = styled(Link)`
text-align: center;
color: #444;
text-decoration: none;
padding: 15px;
flex: 2;
border: 1px solid teal;
background-color: white;
cursor: pointer;
font-weight: 500;
${mobile({ padding: '5px 15px', })}

&:hover{
      background-color: #f8f4f4;
  }
`;

export const ContainerSkeletonHorizontal = styled.div`
width: 100%;
height: 30vh;
display: flex;
gap: 1rem;
${mobile({ padding: '5px 15px', flexDirection: 'column' })}

`
export const ContainerSkeletonVertical = styled.div`
width: 100%;
height: 50vh;
display: flex;
flex-direction: column;
gap: 1rem;
`

export const ErrorContainer = styled.div`
width: 100%;
background-color: red;
margin-top: 1rem;
padding: 0.6rem 0;
text-align: center;
color: aliceblue;
border-radius: 5px;
font-weight: 500;
letter-spacing: 1px;
`

export const Error = styled.p`
font-size: 15px;
`
