import styled from 'styled-components'
import { useState } from 'react'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import slideItems from '../helpers/slideDate'

const Container = styled.div`
width: 100%;
height: 92vh;
display: flex;
position: relative;
overflow: hidden;
color: #31363F;

`
const Arrow = styled.div`
width: 50px;
height: 50px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
position: absolute;
top: 0;
bottom: 0;
left: ${props => props.direction === 'left' && '10px'};
right: ${props => props.direction === 'right' && '10px'};
margin: auto;
cursor: pointer;
opacity: 0.8;
z-index: 2;
background-color: rgba(254, 254, 254, 0.2);
`

const Wrapper = styled.div`
height: 100%;
display: flex;
transform: translateX(${props => props.slide * -100}vw);
transition: all 1.5s ease ;
`

const SlideContainer = styled.div`
display: flex;
align-items: center;
width: 100vw;
height: 100vh;
background-color: ${props => props.bg};
`

const ImageContainer = styled.div`
flex: 0.5;
height: 100%;

`
const Image = styled.img`
height: 92%;

`

const InfoContainer = styled.div`
flex: 1;
padding: 50px;
`

const Title = styled.h1`
font-size: 70px;

`
const Description = styled.p`
margin: 10px 0px 3rem 0rem;
font-size: 20px;
font-weight: 500;
letter-spacing: 3px;
color: #35374B;
`
const Button = styled.button`
padding: 10px;
font-size: 20px;
background-color: transparent;
cursor: pointer;
color: #35374B;
border: 2px solid #35374B;
border-radius: 10px;

`
const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }

  }
  return (
    <Container>
      <Arrow direction='left' onClick={() => handleClick('left')}>
        <ArrowBackIosNewOutlinedIcon style={{ color: '#31363F' }} />
      </Arrow>
      <Wrapper slide={slideIndex}>
        {
          slideItems.map((item) => (
            <SlideContainer key={item.id} bg={item.bg} >
              <ImageContainer>
                <Image src={item.img} />
              </ImageContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
                <Button>Show Now</Button>
              </InfoContainer>
            </SlideContainer>

          ))
        }

      </Wrapper>
      <Arrow direction='right' onClick={() => handleClick('right')}>
        <ArrowForwardIosOutlinedIcon style={{ color: '#31363F' }} />
      </Arrow>
    </Container>
  )
}

export default Slider