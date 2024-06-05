import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { currencyFormatter } from '../utils/formatting.js'
import { useSelector, useDispatch } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { teal } from '@mui/material/colors';
import { selectorWishListArray, wishSliceActions} from '../redux/wishSlice.js'
import { mobile } from '../responsive.js';



const Container = styled.div`
min-height: 10rem;
margin: 2rem 0;
padding: 1rem 3rem;
display: grid;
/* grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr)); */
grid-template-columns: repeat(4, 1fr);
/* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
gap: 1rem;
${mobile({ padding: '20px' })}
`

const Boxes = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
border: 1px solid teal;
border-radius: 5px;
transition: all 0.5s ease;
cursor: pointer;
background-color: #FEFAF6;
position: relative;



&:hover{
  transform: scale(1.05);
  box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
-webkit-box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
-moz-box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
}
`

const ImageBox = styled.div`
width: 100%;
padding: 0rem;
margin-top: 3rem;
object-fit: cover;
display: flex;
justify-content: center;

`

const Image = styled.img`
width: 70%;
border-radius: 10px;
filter: grayscale(50%);


`

const TextBox = styled.div`
padding: 0 0.6rem ;
`

const Title = styled.h2`
color: #555;
text-align: center;
`

const Description = styled.p`
font-size: 0.9rem;
margin: 0.7rem 0;
color: #777;
text-align: center;
`

const Price = styled.h4`
text-align: center;
padding: 1rem;
background-color: teal;
color: white;
border: none;
border-radius: 4px;
justify-self: end;
`

const Message = styled.p`
width: 100%;
background-color: gray;
padding: 1rem;
color: aliceblue;
font-weight: 600;
font-size: 1.2rem;
text-align: center;
`

const IconBox = styled.div`
width: 100%;
display: flex;
justify-content: end;
position: absolute;
top: 10px;
right: 10px;
cursor: pointer;
z-index: 2;
background-color: transparent;
cursor: pointer;

`



const data = [
  { _id: '660ec00b03e1011f9abefc25', title: 'first', description: 'Path `description` is required', price: 34, image: 'https://iili.io/JSXTEn2.png' },
  { _id: '660ec00b03e1011f9abef142', title: 'first', description: 'Path `description` is required', price: 34, image: 'https://iili.io/JSXTEn2.png' },
  { _id: '660ec00b03e1011f9abef638', title: 'first', description: 'Path `description` is required', price: 34, image: 'https://iili.io/JSXTEn2.png' },
]

const WishList = () => {
  const [wishData, setWishData] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const wishListArray = useSelector(selectorWishListArray)


  useEffect(() => {
    setWishData(wishListArray)
  }, [wishData, wishListArray])

 

  function handleDeleteItem(item) {
    dispatch(wishSliceActions.removeItemWish({ ...item }))

  }

  return (
    <>
      {wishListArray && wishListArray.length === 0 && !error && <Message>Could not find data.</Message>}
      {loading && !error && <Message>Loading...</Message>}
      <Container>
        {wishListArray?.map((item) => (
          
            <Boxes key={item.name}>
              <IconBox onClick={() => handleDeleteItem(item)}>
                <FavoriteIcon sx={{ color: teal[700], fontSize: '36px' }} />
              </IconBox>
              <ImageBox>
                <Image src={item.image} alt={item.title} />
              </ImageBox>
              <TextBox>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
              </TextBox>
              <Price>{currencyFormatter.format(item.price)}</Price>
            </Boxes>
          
        ))}

      </Container>
    </>
  )
}

export default WishList
