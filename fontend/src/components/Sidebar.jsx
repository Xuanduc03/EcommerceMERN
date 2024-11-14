import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const Sidebar = () => {
    // Import toàn bộ ảnh trong thư mục
    const images = require.context('../assest/logo', false, /\.(png|jpe?g|svg|gif)$/);

    const [hoverIndex, setHoverIndex] = useState(null);

    const menuItems = [
        { id: 1, name: "Điện thoại", imageSrc: "./1-small.png" }
    ]

    return (
        <div className='bg-white shadow-md relative rounded-lg'>
            <ul className="p-4">
                <li className="mb-2 hover:bg-slate-100 flex items-center">
                    <img className='mr-2' width={30} height={30} src={images('./icon-hot.gif')} alt="" />
                    <p className="text-sm"></p>
                    iPhone 16
                </li>
                <li className="mb-2 hover:bg-slate-100 flex items-center">
                    <img className='mr-2' width={30} height={30} src={images('./icon-hot.gif')} alt="" />
                    <p className="text-sm"></p>
                    iPhone 15
                </li>
                {
                    menuItems.map((item, index) => (
                        <li className="flex items-center justify-between mb-2 hover:bg-slate-100"
                            key={item.id}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                        >
                            <div className="flex items-center">
                                <img className='mr-2' width={30} height={30} src={images('./1-small.png')} alt="" />
                                <p className='text-sm cursor-pointer hover:text-red-500'>{item.name}</p>
                            </div>
                            <FontAwesomeIcon className="text-red-500 text-sm" icon={faChevronRight} /></li>
                    ))
                }

                <li className="flex items-center justify-between mb-2 hover:bg-slate-100">
                    <div className="flex items-center">
                        <img className='mr-2' width={30} height={30} src={images('./1-small.png')} alt="" />
                        <p className="text-sm cursor-pointer hover:text-red-500">iPhone</p>
                    </div>
                    <FontAwesomeIcon className="text-red-500 text-sm" icon={faChevronRight} /></li>
                <li className="flex items-center justify-between mb-2 hover:bg-slate-100">
                    <div className="flex items-center">
                        <img className='mr-2' width={30} height={30} src={images('./2.png')} alt="" />
                        <p className="text-sm cursor-pointer hover:text-red-500">Samsung</p>
                    </div>
                    <FontAwesomeIcon className="text-red-500 text-sm" icon={faChevronRight} /></li>
                <li className="flex items-center justify-between mb-2 hover:bg-slate-100">
                    <div className="flex items-center">
                        <img className='mr-2' width={30} height={30} src={images('./3.png')} alt="" />
                        <p className="text-sm cursor-pointer hover:text-red-500">Tablet</p>
                    </div>
                    <FontAwesomeIcon className="text-red-500 text-sm" icon={faChevronRight} /></li>
                <li className="flex items-center justify-between mb-2 hover:bg-slate-100">
                    <div className="flex items-center">
                        <img className='mr-2' width={30} height={30} src={images('./5.png')} alt="" />
                        <p className="text-sm cursor-pointer hover:text-red-500">Laptop</p>
                    </div>
                    <FontAwesomeIcon className="text-red-500 text-sm" icon={faChevronRight} /></li>
                <li className="flex items-center justify-between mb-2 hover:bg-slate-100">
                    <div className="flex items-center">
                        <img className='mr-2' width={30} height={30} src={images('./6.png')} alt="" />
                        <p className="text-sm cursor-pointer hover:text-red-500">Đồng hồ</p>
                    </div>
                    <FontAwesomeIcon className="text-red-500 text-sm" icon={faChevronRight} /></li>
                <li className="flex items-center justify-between mb-2 hover:bg-slate-100">
                    <div className="flex items-center">
                        <img className='mr-2' width={30} height={30} src={images('./7.png')} alt="" />
                        <p className="text-sm cursor-pointer hover:text-red-500">Hàng cũ</p>
                    </div>
                    <FontAwesomeIcon className="text-red-500 text-sm" icon={faChevronRight} /></li>
                <li className="flex items-center justify-between mb-2 hover:bg-slate-100">
                    <div className="flex items-center">
                        <img className='mr-2' width={30} height={30} src={images('./8.png')} alt="" />
                        <p className="text-sm cursor-pointer hover:text-red-500">Thu cũ</p>
                    </div>
                </li>
                <li className="flex items-center justify-between mb-2 hover:bg-slate-100">
                    <div className="flex items-center">
                        <img className='mr-2' width={30} height={30} src={images('./9.png')} alt="" />
                        <p className="text-sm cursor-pointer hover:text-red-500">Phụ kiện</p>
                    </div>
                    <FontAwesomeIcon className="text-red-500 text-sm" icon={faChevronRight} /></li>
                <li className="flex items-center justify-between mb-2 hover:bg-slate-100">
                    <div className="flex items-center">
                        <img className='mr-2' width={30} height={30} src={images('./10.png')} alt="" />
                        <p className="text-sm cursor-pointer hover:text-red-500">Âm Thanh</p>
                    </div>
                    <FontAwesomeIcon className="text-red-500 text-sm" icon={faChevronRight} /></li>
            </ul>
        </div>
    )
}
