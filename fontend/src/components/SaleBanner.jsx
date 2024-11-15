import React from 'react'

export const SaleBanner = () => {
    const images = require.context('../assest/banner', false, /\.(png|jpe?g|svg|gif)$/);

    const image = ['./left-banner-1.png', './left-banner-2.png', './left-banner-3.png'];
    return (
        <div className='bg-white ml-2 w-full h-auto rounded-md'>
            <h4 className="text-red-500 text-center">Khuyến mãi nổi bật</h4>
            <ul className='flex flex-col p-2'>
                {
                    image.map((image, index) => (
                        <li key={index} className='pb-2 block'>
                            <img className='h-[130px] w-full rounded-lg' src={images(image)} alt="" />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
