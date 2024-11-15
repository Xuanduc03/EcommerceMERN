import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SummaryApi from '../common/helper';
import { toast } from 'react-toastify';

export const Sidebar = () => {
    const images = require.context('../assest/logo', false, /\.(png|jpe?g|svg|gif)$/);

    const icon = ['./1-small.png', './1-small.png','./1-small.png','./2.png','./3.png','./5.png','./6.png','./7.png','./8.png','./9.png','./10.png']

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [allCategory, setAllCategory] = useState([]);

    const fetchListCategories = async () => {
        try {
            const fetchData = await fetch(SummaryApi.list_category.url, {
                method: SummaryApi.list_category.method,
                credentials: "include"
            });
            const responseData = await fetchData.json();
            if (responseData.success) {
                setAllCategory(responseData.data);
            } else if (responseData.error) {
                toast.error("Cannot fetch list");
            }
        } catch (error) {
            toast.error("Cannot load");
        }
    };

    useEffect(() => {
        fetchListCategories();
    }, []);

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    return (
        <div className='bg-white shadow-md relative rounded-lg'>
            <ul className="p-4">
                {allCategory.map((category, index) => (
                    <li 
                        className="flex items-center justify-between mb-2 hover:bg-slate-100 relative" 
                        key={index}
                        onClick={() => toggleDropdown(index)}
                    >
                        <div className="flex items-center">
                            <img className='mr-2' width={30} height={30} src={images(icon[index])} alt="" />
                            <p className='text-sm cursor-pointer hover:text-red-500'>{category?.name}</p>
                        </div>
                        <FontAwesomeIcon className="text-red-500 text-sm" icon={faChevronRight} />

                        {openDropdownIndex === index && category.subCategories && (
                            <ul className="absolute z-50 left-[220px] h-full w-[500px] py-2 bg-white shadow-sm transition-opacity duration-200 text-sm text-gray-700 dark:text-gray-200">
                                {category.subCategories.map((subCategory) => (
                                    <li className='top-1  bg-white'>
                                        <a href="#" className="block px-4 py-2 hover:text-red-700 cursor-pointer">
                                            {subCategory?.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
