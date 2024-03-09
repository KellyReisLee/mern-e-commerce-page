import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
height: 30px;
background-color:teal;
color: white;
display: flex;
justify-content: center;
align-items: center;

font-size: 13px;
font-weight: 400;
font-family: "Poppins", sans-serif;
letter-spacing: 1px;

`
const Anouncement = () => {
  return (
    <div>
      <Container>
        Super Deal! Free Shipping on Orders Over $50.
      </Container>
    </div>
  )
}

export default Anouncement
