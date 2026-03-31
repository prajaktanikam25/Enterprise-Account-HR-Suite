import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Title from '../images/logo/new-01.jpg'

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const role = localStorage.getItem('role')
  return (
    <>
      {role != null ? (<>
        <div className='dark:bg-boxdark-2 dark:text-bodydark'>
          {/* <!-- ===== Page Wrapper Start ===== --> */}
          <div className='flex h-screen overflow-hidden'>
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
              {/* <!-- ===== Header Start ===== --> */}
              <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>
                <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
                  {children}
                </div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
          {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
      </>) : (<><div style={{ textAlign: 'center' }}>
        <img src={Title} alt="" height="100%" width="100%" style={{ textAlign: 'center' }} />
      </div></>)}
    </>

  )
}

export default DefaultLayout;
