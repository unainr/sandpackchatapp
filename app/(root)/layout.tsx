import Navbar from '@/components/header/Navbar'
import { LayoutProps } from '@/types'
import React from 'react'

const layout = ({children}:LayoutProps) => {
  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}

export default layout