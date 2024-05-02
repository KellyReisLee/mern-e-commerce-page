import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import WishList from '../components/WishList'
import styled from 'styled-components'


const Title = styled.h1`
text-align: center;
margin-top: 2rem;
margin-bottom: 0;
color: teal;
`
const WishPage = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Title>WishList</Title>
      <WishList />
      <NewsLetter />
      <Footer />
    </>
  )
}

export default WishPage