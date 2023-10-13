import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import AllEvents from '../../components/Shop/AllEvents.jsx'

const ShopAllEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items w-full">
        <div className='w-[80px] 800px:w-[330px]'>
            <DashboardSidebar active={5} />
        </div>

        <div className="w-full justify-center flex">
            <AllEvents />
        </div>
      </div>
    </div>
  )
}

export default ShopAllEvents
