import React, { useEffect, useState } from 'react';

export const MainBanner = () => {
  const images = require.context('../assest/banner', false, /\.(png|jpe?g|svg|gif)$/);

  const slides = [
    { imagePath: './slide1.png', content: 'IPhone 16 PRM Màu sa mạc tốt nhất', },
    { imagePath: './slide2.png', content: 'Xiaomi 14T 14TPro Nhiều ưu đãi' },
    { imagePath: './slide3.png', content: 'TECHNO SPARK 30C đã sẵn sàng' },
    { imagePath: './slide4.png', content: 'Pova 6 Neo - chiến binh thần tốc' },
    { imagePath: './slide5.png', content: 'Galaxy z-fold 6 z-flip 6 Sẵn sàng' },
    { imagePath: './slide6.png', content: 'Galaxy S24 ultra' },]
  const [currentIndex, setCurrentIndex] = useState(0);

  //function next slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }

  //function back slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  //function selected slide
  const selecteSlide = (index) => {
    setCurrentIndex(index);
  }

  //auto next slide to 3second
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [])


  return (
    <div>
      <div id="controls-carousel" class="relative w-full" data-carousel="static">
        <div class="relative md:h-[18rem] h-40 w-full overflow-hidden rounded-lg">
          {
            slides.map((slide, index) => (
              <div key={index}
                class={`absolute top-0 left-0 w-full md:h-[18rem] h-40 transition-opacity duration-700 ease-in-out
               ${index === currentIndex ? 'opacity-100' : 'opacity-0'} `}>
                <img src={images(slide?.imagePath)} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
              </div>
            ))
          }
        </div>

        <button onClick={prevSlide} type="button" class="absolute top-0 start-0 z-30 hidden md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
            </svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <button onClick={nextSlide} type="button" class="absolute top-0 end-0 z-30 hidden md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
            </svg>
            <span class="sr-only">Next</span>
          </span>
        </button>

        <ul className="hidden md:flex items-center bg-white rounded-e-lg gap-2">
          {
            slides.map((slide, index) => (
              <li key={index}
                onClick={() => selecteSlide(index)}
                className={`p-2 hover:bg-slate-100 ${index === currentIndex ? 'border-t-2 border-red-500 bg-slate-200' : 'border-none'}`}>
                <a className='text-[12px] hover:text-red-500' href="#">{slide.content}</a>
              </li>
            ))
          }
        </ul>
      </div>

      <div className="w-full h-full mt-1">
        <img className='rounded-lg' src={images('./banner-bottom.png')} alt="" />
      </div>
    </div>
  )
}
