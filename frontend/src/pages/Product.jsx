import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Anouncement from '../components/Announcement'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import { mobile } from '../responsive'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Skeleton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/cartSlice.js';




const Container = styled.div``

const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({ padding: '10px 5px', flexDirection: 'column', })}

`
const ImgContainer = styled.div`
flex: 1;

`
const Image = styled.img`
width: 100%;
height: 90vh;
object-fit: cover;
${mobile({ width: '100%', height: '40vh', })}
`
const InfoContainer = styled.div`
flex: 1;
padding: 0 50px;

${mobile({ padding: '20px' })}

`


const Title = styled.h1`
font-weight: 200;
`
const Description = styled.p`
margin: 20px 0px;
`


const Price = styled.span`
font-weight: 100;
font-size: 50px;


`


const FilterContainer = styled.div`
margin: 10px 0px;
display: flex;
justify-content: space-between;
${mobile({ width: '100%', })}

`
const Filter = styled.div`
margin-top: 10px;
display: flex;
justify-content: flex-start;
${mobile({ margin: '0', })}
`
const FilterTitle = styled.div`
font-size: 20px;
font-weight: 200;
margin-right: 3px;

`
const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${(props) => props.color};
margin: 0px 3px;
cursor: pointer;
`
const FilterSize = styled.select`
margin-left: 5px;
padding: 2px 3px;
cursor: pointer;


`
const FilterSizeOption = styled.option`
  `
const AddContainer = styled.div`
 width: 100%;
  display: flex;
  align-items: center;
  margin-top: 3rem;
  gap: 1rem;
  ${mobile({ width: '100%', margin: '0', gap: '0.1rem' })}

 
`;

const AmountContainer = styled.div`
 display: flex;
 flex: 1;
  align-items: center;
  font-weight: 700;
  ${mobile({ width: '100%', flexDirection: 'column', margin: '0', })}



`;
const Remove = styled.option`
font-size: 2rem;
margin-right: 0.3rem;
font-weight: 300;
`;
const Amount = styled.span`
width: 32px;
height: 32px;
border-radius: 10px;
border: 1px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 5px;



`;
const Add = styled.span`
font-size: 1.2rem;
margin-left: 0.3rem;
font-weight: 500;
`;

const Button = styled.button`
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

const ContainerSkeletonHorizontal = styled.div`
width: 100%;
height: 30vh;
display: flex;
gap: 1rem;
${mobile({ padding: '5px 15px', flexDirection: 'column' })}

`
const ContainerSkeletonVertical = styled.div`
width: 100%;
height: 50vh;
display: flex;
flex-direction: column;
gap: 1rem;
`

const ErrorContainer = styled.div`
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

const Error = styled.p`
font-size: 15px;
`

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [error, setError] = useState('')
  const dispatch = useDispatch()



  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`api/products/find/${id}`)
        console.log(res.data);
        setProduct(res.data)

      } catch (error) {
        console.log(error);

      }
    }
    getProduct()
  }, [id])
  console.log(id);
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

  const handleClickAddCart = () => {
    if (handleValidValues()) {
      dispatch(
        cartActions.addProduct({ ...product, quantity, color, size })
      )
      setError('')
    }

  }


  return (
    <>
      <Container>
        <Anouncement />
        <Navbar />
        <Wrapper>

          {Object.keys(product).length === 0 ? (
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
                <Image src={product.image} />
              </ImgContainer>
              <InfoContainer>
                <Title>{product.title}</Title>
                <Description>{product.description}</Description>
                <Price>{product.price}</Price>
                {error && <ErrorContainer>
                  <Error>{error}</Error>
                </ErrorContainer>}
                <FilterContainer>
                  {/* color */}
                  <Filter>
                    <FilterTitle>Color: </FilterTitle>
                    {product.color?.map((c) => (
                      <FilterColor onClick={() => setColor(c)} key={c} color={c} />
                    ))}

                  </Filter>
                  {/* Size */}
                  <Filter>
                    <FilterTitle>Size: </FilterTitle>
                    <FilterSize onChange={(e) => setSize(e.target.value)} defaultValue="Size" >
                      <FilterSizeOption ></FilterSizeOption>
                      {product.size?.map((s) => (
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
                  <Button onClick={handleClickAddCart}>ADD TO CART</Button>
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
