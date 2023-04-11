import React from 'react'
import {Header, ShopProduct, BannerTip, Contact, Pagination} from '../components'
import { ToastContainer} from 'react-toastify'

const HomeScreen = () => {
    window.scrollTo(0,0)
  return (
    <div>
      <Header />
      <ToastContainer containerId={'A'}/>
      <ShopProduct />
      <Pagination />
      <BannerTip />
      <Contact />
    </div>
  )
}

export default HomeScreen
