import React from 'react'
import Header from '../components/Layout/Header'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Payment from "../components/Payment/Payment.jsx"
import Footer from '../components/Layout/Footer'

const PaymentPage = () => {
  console.log("PaymentPage is rendering");
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc] text-dark'>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2}/>
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  )
}

export default PaymentPage
