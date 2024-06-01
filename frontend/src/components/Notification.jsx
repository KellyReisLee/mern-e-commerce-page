import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
background-color: red;
text-align: center;
color: white;
padding: 1rem;
display: flex;
justify-content: space-between;
align-items: center;


`

const Title = styled.h1`
`

const Message = styled.p`
`


const Notification = ({ title, message, status }) => {
  return (
    <Container>

      <Title>
        {title}
      </Title>
      <Message>
        {message}  -- {status}
      </Message>

    </Container>
  )
}

export default Notification
