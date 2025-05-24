import Footer from '@/components/header/Footer'
import Navbar from '@/components/header/Navbar'
import { LayoutProps } from '@/types'
import React from 'react'

const layout = ({children}:LayoutProps) => {
  return (
    <>
    <Navbar/>
    {children}
    <Footer/>
    </>
  )
}

export default layout