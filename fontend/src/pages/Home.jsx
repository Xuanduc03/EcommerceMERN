import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { MainBanner } from '../components/MainBanner';
import { SaleBanner } from '../components/SaleBanner';
import { MainContent } from '../components/MainContent';

export default function Home() {
  return (
    <div className="flex flex-wrap px-4 w-full">
      <div className="w-full p-4 relative">
        <div className="block md:flex justify-center w-full h-full">
          <div className="w-1/4 mr-7 max-w-[220px] hidden md:block">
            <Sidebar />
          </div>
          <div className="md:w-1/2 w-full mr-5">
            <MainBanner />
          </div>
          <div className="w-1/4 max-w-[250px] hidden md:block">
            <SaleBanner />
          </div>
        </div>
      </div>

      <div className="w-full p-4 relative">
        <MainContent />
      </div>
    </div>

  )
}
