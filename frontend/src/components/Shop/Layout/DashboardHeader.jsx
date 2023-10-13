import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import logo from "../../../Assests/logo2.png"
import { AiOutlineGift } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import {FiPackage, FiShoppingBag} from "react-icons/fi"
import { BiMessageSquareDetail } from 'react-icons/bi';
import { backend_url } from '../../../server';

const DashboardHeader = () => {
    const {seller} = useSelector((state) => state.seller);
  return (
    <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
      <div>
        <Link to="/dashboard">
            <img src={logo} alt="Sorry" style={{width: "100px", height: "50px"}}/>
        </Link>
      </div>
      <div className="flex item-center">
        <Link to="/dashboard/coupons" className='800px:block hidden'>
            <AiOutlineGift color="#555" size={30} className='mx-5 cursor-pointer'/>
        </Link>
        <Link to="/dashboard-events" className='800px:block hidden'>
            <MdOutlineLocalOffer color="#555" size={30} className='mx-5 cursor-pointer'/>
        </Link>
        <Link to="/dashboard-products" className='800px:block hidden'>
            <FiShoppingBag color="#555" size={30} className='mx-5 cursor-pointer'/>
        </Link>
        <Link to="/dashboard-orders" className='800px:block hidden'>
            <FiPackage color="#555" size={30} className='mx-5 cursor-pointer'/>
        </Link>
        <Link to="/dashboard-messages" className='800px:block hidden'>
            <BiMessageSquareDetail color="#555" size={30} className='mx-5 cursor-pointer'/>
        </Link>
        <Link to={`/shop/${seller._id}`}>
            <img src={`${backend_url}${seller.avatar?.url}`} alt="Sorry" style={{width:"40px", height:"40px"}} className='rounded'/>
        </Link>
      </div>
    </div>
  )
}

export default DashboardHeader
