import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../common/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const ListProduct = () => {

  const [allCategory, setAllCategory] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  

  const fethCategory = async () => {
    try {
      const fetchData = await axios({
        url: SummaryApi.list_category.url,
        method: SummaryApi.list_category.method,
        withCredentials: "include",
      })

      const responseData = await fetchData.data;
      if (responseData.success) {
        setAllCategory(responseData.data);
      } else {
        toast.error("cannn't load category");
      }
    } catch (error) {
      toast.error("Cann't load category")
    }
  }

  const fetchAllProducts = async () => {
    try {
      const fetchData = await axios({
        url: SummaryApi.all_product.url,
        method: SummaryApi.all_product.method,
        withCredentials: "true"
      });

      const responseData = await fetchData.data;

      if (responseData.success) {
        setAllProducts(responseData.data);
      } else {
        toast.error("Cann't load product");
      }
    } catch (error) {
      toast.error("Cann't load product")
    }
  }

  useEffect(() => {
    fethCategory();
    fetchAllProducts();
  }, [])
  return (
    <div className='max-w-[1200px] w-full m-auto'>
      <main>
        <div className="mt-1 w-full">
          {allCategory.length > 0 && (
            <div className="flex items-center justify-start">
              <h2 to={'/product'} className="text-xl font-bold">
                {allCategory[1].name} -
              </h2>
              <ul className="flex items-center">
                {
                  allCategory[1].subCategories.map((subCategory) => (
                    <li className='p-2'>
                      <h2 className="text-xl font-bold">
                        {subCategory?.name}
                      </h2>
                    </li>
                  ))
                }
              </ul>
            </div>
          )}
        </div>
        <p className='my-3'>Mua điện thoại tại Đức Áp bồ giá rẻ hơn bao giờ hết - săn khuyến mãi với những giờ vàng chạy chương trình quý khách sẽ được nhiều ưu đãi bất ngờ</p>
        <h2 className='text-xl font-bold mt-2'>Điện thoại chính hãng và thu cũ đổi mới của DucApple bảo hành 2 năm</h2>
        <div className="mt-4">
        {
          allCategory.length > 0 && (
            <ul className="flex items-center">
              {
                allCategory[1].subCategories.map((subCategory) => (
                  <li className='p-2'>
                    <a href="#" className="bg-white border font-semibold hover:text-red-500 border-[#e5e7eb] rounded-[4px] text-[18px] leading-[20px] mb-0 px-[6px] py-[7px] text-center">
                      {subCategory?.name}
                    </a>
                  </li>
                ))
              }
            </ul>
          )
        }
        </div>
        {/* filter product */}
        <div className="w-full mt-4">
          <h2 className="text-xl font-semibold">Chọn tiêu chí</h2>
          <div className="flex items-center mt-2">
              {/* filter button */}
              <span className="px-[15px] py-[8px] text-red-500 rounded-[10px] bg-slate-200">
                <FontAwesomeIcon className='mr-1' icon={faFilter}/>
                Bộ lọc
              </span>
          </div>
        </div>
        
      </main>
    </div>
  )
}
