import React from 'react';
import { Sidebar } from '../components/Sidebar';

export default function Home() {
  return (
    <div className="flex p-4 justify-center">
      <div className="w-full max-w-screen-lg">
        <div className="flex">
          <div className="w-1/4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>

  )
}
