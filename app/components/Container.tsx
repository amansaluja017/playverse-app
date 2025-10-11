import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Container({children}: {children: React.ReactNode}) {
  return (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default Container;