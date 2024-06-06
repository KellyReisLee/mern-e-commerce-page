import styled from 'styled-components'
import { mobile } from '../responsive'


export const Info = styled.div`
opacity: 0;
width: 100%;
height: 100%;
top: 0;
left: 0;
position: absolute;
background-color: rgba(0, 0, 0, 0.2);
z-index: 3;
display: flex;
justify-content: center;
align-items: center;
gap: 0.8rem;
transition: all 0.5s ease;
${mobile({ display: 'flex', padding: '0px' })}
`

export const Container = styled.div`
display: flex;
width: 100%;
height: 350px;
display: flex;
align-items: center;
justify-content: center;
background-color: #CCD3CA;
position: relative;
cursor: pointer;
border-radius: 10px;

&:hover ${Info}{
  opacity: 1;
}

&:hover{
  box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
-webkit-box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
-moz-box-shadow: 32px 25px 34px -7px rgba(166,161,161,0.29);
}

`

export const Circle = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
background-color: white;
position: absolute;

`
export const Image = styled.img`
height: 60%;
z-index: 1;
border-radius: 10px;

`

export const Icon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
color: teal;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.5s ease;

&:hover{
  background-color: teal;
  color: white;
  transform: scale(1.1);
  cursor: pointer;
  
}

`


export const IconIncluded = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: teal;
color: white;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.5s ease;

&:hover{
  background-color: white;
  color: teal;
  transform: scale(1.1);
  cursor: pointer;
  
}

`

