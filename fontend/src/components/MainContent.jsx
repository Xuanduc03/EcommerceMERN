import { React, useState, useEffect } from 'react';
import SummaryApi from '../common/helper';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const MainContent = () => {

    const [allCategory, setAllCategory] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    //callback function get category
    const fetchListCategories = async () => {
        try {
            const fetchData = await axios({
                url: SummaryApi.list_category.url,
                method: SummaryApi.list_category.method,
                withCredentials: "true"
            });
            const responseData = await fetchData.data;
            if (responseData.success) {
                setAllCategory(responseData.data);
            } else if (responseData.error) {
                toast.error("Cannot fetch list");
            }
        } catch (error) {
            toast.error("Cannot load");
        }
    };

    // callback function get fullproduct
    const fetchAllProducts = async () => {
        try {
            const fetchAll = await axios({
                url: SummaryApi.all_product.url,
                method: SummaryApi.all_product.method,
                withCredentials: "true"
            });
            const dataResponse = await fetchAll.data;

            if (dataResponse.success) {
                setAllProducts(dataResponse.data);
            }
            if (dataResponse.error) {
                toast.error("Error for display product")
            }
        } catch (error) {
            toast.error("Cann't display all product");
        }
    }

    useEffect(() => {
        fetchListCategories();
        fetchAllProducts();
    }, []);

    const formatPrice = (value) => {
        if (value === "") return "";
        return new Intl.NumberFormat('vi-VN').format(value);
    }


    return (
        <div>
            {/* topcontent */}
            <div className="mt-1 w-full">
                {allCategory.length > 0 && (
                    <div className="flex items-center justify-around">
                        <Link to={'/product'} className="bg-gradient-to-l from-[#434343] to-black rounded-[12px] text-white float-left text-[16px] font-bold h-[32px] flex justify-center items-center mb-0 min-w-[230px] px-[15px] uppercase cursor-pointer">
                            {allCategory[1].name}
                        </Link>
                        <ul className="flex items-center">
                            {
                                allCategory[1].subCategories.map((subCategory) => (
                                    <li className='p-2'>
                                        <a href="#" className="bg-white border hover:text-red-500 border-[#e5e7eb] rounded-[10px] text-[14px] leading-[18px] mb-0 px-[6px] py-[7.5px] text-center">
                                            {subCategory?.name}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )}
            </div>
            {/* category product */}
            <ul className="mt-3 flex justify-center flex-wrap w-full">
                {
                    allProducts.map((product) => (
                        <li className="relative mt-2 my-0 mx-[10px] min-h-[278px] max-w-[calc(20%-10px)] w-[250px] border bg-white rounded-xl shadow-lg">
                            <a href="#" className='block h-full text-black px-8 py-2 transition duration-300' title={product.name}>
                                {/* thumnail image product */}
                                <div className="flex items-center justify-center mb-2 relative">
                                    <img className='h-[150px] max-w-full object-cover w-auto' src={product.imageUrl} alt="" />
                                </div>
                                {/* detail product */}
                                <div className="detail">
                                    <h3 className='font-semibold text-[14px] overflow-hidden w-full max-h-[55px]'>{product.name}</h3>
                                    <div className="absolute top-[6px] right-[-6px] py-[1px] px-[13px] text-[13px] shadow-md font-bold bg-yellow-400">{product.salePercent}%</div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className='text-red-500 font-bold text-[15px]'>{formatPrice(product.price)} <span className='text-[11px]'>₫</span></p>
                                        <del className='text-gray-400 text-[13px]'>{formatPrice(product.oldPrice)}  <span className='text-[11px]'>₫</span></del>
                                    </div>
                                    <div className="flex flex-col absolute top-[40%] left-[1px]">
                                        <label className='py-0 px-[5px] text-[11px] font-semibold shadow-md bg-red-500 text-white rounded-r-md'>Trả góp 0%</label>
                                        <label className='py-0 px-[5px] text-[11px] font-semibold shadow-md bg-black text-white rounded-r-md'>Miễn phí ship</label>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="mr-2">
                                            <FontAwesomeIcon className='text-gray-300 text-[12px]' icon={faStar} />
                                            <FontAwesomeIcon className='text-gray-300 text-[12px]' icon={faStar} />
                                            <FontAwesomeIcon className='text-gray-300 text-[12px]' icon={faStar} />
                                            <FontAwesomeIcon className='text-gray-300 text-[12px]' icon={faStar} />
                                            <FontAwesomeIcon className='text-gray-300 text-[12px]' icon={faStar} />
                                        </div>
                                        <p className="text-gray-300 text-[12px]">Đánh giá</p>
                                    </div>

                                </div>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
