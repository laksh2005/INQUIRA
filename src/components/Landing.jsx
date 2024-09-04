import React from 'react'
import MainContainer from './MainContainer'
import Header from './Header'
import Features from './Features'
import Faqs from './Faqs'
import Footer from './Footer'

const Landing = () => {
  return (
    <div>
        <Header />
        <MainContainer />
        <Features />
        <Faqs />
        <Footer />
    </div>
  )
}

export default Landing