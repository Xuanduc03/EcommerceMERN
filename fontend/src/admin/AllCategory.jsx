import React, { useEffect, useState } from 'react';
import { AddCategory } from './crud/category/AddCategory';
import SummaryApi from '../common/helper';
import { toast } from 'react-toastify';
import { DeleteCategory } from './crud/category/DeleteCategory';


const AllCategries = () => {
  const [isAddCategory, setAddCategory] = useState(false);
  const [isDeleteCategory, setDeleteCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
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
      } if (responseData.error) {
        toast.error("cann't fetch list");
      }
    } catch (error) {
      toast.error("cann't load")
    }
  }

  useEffect(() => {
    fetchListCategories();
  }, [])

  const handleAddClick = () => {
    setAddCategory(true);
  }
  const handleCloseAddCate = () => {
    setAddCategory(false);
  }

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setDeleteCategory(true);
  }
  const handleCloseDeleteCategory = () => {
    setSelectedCategory(null);
    setDeleteCategory(false);
  }

  const deleteCategory = (deleteCategory) => {
    setAllCategory((prevCategory) =>
      prevCategory.map((category) => (category._id !== deleteCategory._id))
    );
  }

  return (
    <>
      <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
          <div class="mb-4 mt-20">
            <nav class="flex mb-5" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                <li class="inline-flex items-center">
                  <a href="#" class="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                    <svg class="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                    Trang chủ
                  </a>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <a href="#" class="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Danh mục</a>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <span class="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Danh sách</span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Danh sách danh mục</h1>
          </div>
          <div class="sm:flex">
            <div class="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
              <form class="lg:pr-3" action="#" method="GET">
                <label for="users-search" class="sr-only">Search</label>
                <div class="relative mt-1 lg:w-64 xl:w-96">
                  <input type="text" name="email" id="users-search" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for users" />
                </div>
              </form>
              <div class="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
                <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
                </a>
                <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                </a>
                <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                </a>
                <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                </a>
              </div>
            </div>
            <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={handleAddClick}
                className='flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                data-modal-target="add-user-modal" data-modal-toggle="add-user-modal" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                Add Category
              </button>
              <a href="#" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path></svg>
                Export
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg rounded-xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th class="py-2 px-4 border-b dark:border-gray-700">Thứ tự</th>
              <th class="py-2 px-4 border-b dark:border-gray-700">Tên danh mục</th>
              <th class="py-2 px-4 border-b dark:border-gray-700">Mô tả</th>
              <th class="py-2 px-4 border-b dark:border-gray-700">Status</th>
              <th class="py-2 px-4 border-b dark:border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              allCategory.map((categories, index) => (
                <>
                  <tr className='bg-blue-400 border-b dark:bg-blue-500 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                    <td class="py-2 px-4 border-b dark:border-gray-700 text-xl font-bold">{index + 1}</td>
                    <td class="py-2 px-4 text-xl font-semibold border-b dark:border-gray-700">{categories?.name}</td>
                    <td class="py-2 px-4 border-b dark:border-gray-700">{categories?.description}</td>
                    <td class="py-2 px-4 border-b dark:border-gray-700">{categories?.status}</td>
                    <td class="py-2 px-4 border-b dark:border-gray-700">
                      <button class="bg-yellow-400 hover:bg-blue-700 text-white font-normal py-1 px-4 rounded mr-2">Sửa</button>
                      <button
                        onClick={() => {
                          handleDeleteClick(categories);
                        }}
                        class="bg-red-500 hover:bg-red-700 text-white font-normal py-1 px-4 rounded">Xóa</button>
                    </td>
                  </tr>
                  {
                    categories.subCategories.map((SubCategories, subIndex) => (
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td class="py-2 px-4 border-b dark:border-gray-700">{subIndex + 1}</td>
                        <td class="py-2 px-4 border-b dark:border-gray-700 pl-8">{SubCategories?.name}</td>
                        <td class="py-2 px-4 border-b dark:border-gray-700"></td>
                        <td class="py-2 px-4 border-b dark:border-gray-700">Hiển thị</td>
                        <td class="py-2 px-4 border-b dark:border-gray-700">
                        </td>
                      </tr>
                    ))
                  }

                </>
              ))
            }
          </tbody>
        </table>
      </div>

      {
        isAddCategory && (
          <AddCategory
            onClose={handleCloseAddCate}
          />
        )
      }
      {
        isDeleteCategory && (
          <DeleteCategory
            onClose={handleCloseDeleteCategory}
            category={selectedCategory}
            onUpdate={deleteCategory}
            isOpen={isDeleteCategory}
            callFunc={fetchListCategories}
          />
        )
      }

    </>
  );
};

export default AllCategries;
