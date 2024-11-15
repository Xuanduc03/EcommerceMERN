import React, { useState } from 'react';
import SummaryApi from '../../common/helper';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const AddProduct = ({ onClose }) => {
    const [dataProduct, setDataProduct] = useState({
        name: "",
        description: "",
        summary: "",
        oldPrice: "",
        price: "",
        salePercent: "",
        category: "",
        stock: "",
        installment : "",
        imageUrl: "",
        manufacturarName: "",
        productId: "",
        processor: "", memory: "", display: "", camera: "", shipping: "", color: ""
    });

    
    const handleChangeData = (e) => {
        const { name, value } = e.target;

        setDataProduct((prev) => {
            const updatedData = {...prev, [name] : value};

            // Tính toán giá đã giảm nếu có thay đổi về oldPrice hoặc salePercent
            if ((name === "oldPrice" || name === "salePercent") && updatedData.oldPrice && updatedData.salePercent) {
                const oldPrice = parseFloat(updatedData.oldPrice);
                const salePercent = parseFloat(updatedData.salePercent);
                const discountPrice = oldPrice - (oldPrice * (salePercent / 100));
                updatedData.price = discountPrice.toFixed(2);  // Cập nhật giá đã giảm, làm tròn tới 2 chữ số
            }

            return updatedData;
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const fetchData = await fetch(SummaryApi.add_product.url, {
                method: SummaryApi.add_product.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataProduct)
            });

            const responseData = await fetchData.json();

            if (responseData.success) {
                toast.success("Add product successful");
                onClose();
            } else {
                toast.error("Can't add product");
            }
        } catch (error) {
            toast.error("Can't add product");
        }
    }


    return (
        <>
            <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div class="w-full mb-1 mt-20">
                    <div class="mb-4">
                        <nav class="flex mb-5" aria-label="Breadcrumb">
                            <ol class="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                                <li class="inline-flex items-center">
                                    <Link to="/admin-panel" class="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                                        <svg class="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                        Trang chủ
                                    </Link>
                                </li>
                                <li>
                                    <div class="flex items-center">
                                        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                        <Link to="/admin-panel/products" class="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Sản phẩm</Link>
                                    </div>
                                </li>
                                <li>
                                    <div class="flex items-center">
                                        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                        <span class="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Thêm sản phẩm</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Thêm mới sản phẩm</h1>
                    </div>
                    <div class="sm:flex">
                        <div class="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                            <form class="lg:pr-3" action="#" method="GET">
                                <label for="Product-search" class="sr-only">Search</label>
                                <div class="relative mt-1 lg:w-64 xl:w-96">
                                    <input type="text" name="email" id="Product-search" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Tìm kiếm sản phẩm" />
                                </div>
                            </form>
                        </div>
                        <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
                            <button type="button" data-modal-target="add-user-modal" data-modal-toggle="add-user-modal" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white dark:bg-sky-700 rounded-lg bg-sky-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Thêm sản phẩm
                            </button>
                            <a href="#" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                                Bỏ qua
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 dark:bg-gray-800 min-h-screen">
                {/* Form Container */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Type, Tags, Pricing */}
                    <div className="space-y-6">
                        {/* Type Section */}
                        <div className="bg-white p-6 rounded-md shadow">
                            <h2 className="text-lg font-medium mb-4">Thể loại</h2>
                            <form className="space-y-4">
                                <div>
                                    <label for="category" className="block text-gray-700">Chọn thể loại:</label>
                                    <select
                                        name="category"
                                        value={dataProduct.category}
                                        onChange={handleChangeData}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="" disabled>Select a category</option>
                                        <option value="điện thoại">Điện thoại</option>
                                        <option value="máy tính">Máy tính</option>
                                        <option value="phụ kiện">Phụ kiện</option>
                                        <option value="thời trang">Thời trang</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Select sub-category:</label>
                                    <select
                                        name="subCategory"
                                        value={dataProduct.subCategory}
                                        onChange={handleChangeData}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="iPhone 14 pro">iPhone 14 pro</option>
                                    </select>
                                </div>
                            </form>
                        </div>

                        {/* Tags Section */}
                        <div className="bg-white p-6 rounded-md shadow">
                            <h2 className="text-lg font-medium mb-4">Trả góp</h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">Thêm phần trăm trả góp</label>
                                    <input
                                        type="text"
                                        name="installment"
                                        value={dataProduct.installment}
                                        onChange={handleChangeData}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Pricing Section */}
                        <div className="bg-white p-6 rounded-md shadow">
                            <h2 className="text-lg font-medium mb-4 border-b">Giá sản phẩm</h2>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="oldPrice" className="block text-gray-700">Giá gốc:</label>
                                    <input
                                        type="number"
                                        name="oldPrice"
                                        value={dataProduct.oldPrice}
                                        onChange={handleChangeData}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="salePercent" className="block text-gray-700">Phần trăm giảm giá:</label>
                                    <input
                                        type="number"
                                        name="salePercent"
                                        value={dataProduct.salePercent}
                                        onChange={handleChangeData}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-gray-700">Giá đã giảm:</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={dataProduct.price}
                                        onChange={handleChangeData}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Currency:</label>
                                    <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Select currency</option>
                                    </select>
                                </div>
                            </form>
                        </div>

                        {/* Shipping section */}
                        <div className="bg-white p-6 rounded-md shadow">
                            <h2 className="text-lg font-medium mb-4 border-b">Giao hàng</h2>
                            <form className="space-y-4">
                                <div className='flex'>
                                    <input
                                        name="shipping"
                                        type="radio"
                                        value="Miễn phí Ship"
                                        onChange={handleChangeData}
                                        checked={dataProduct.shipping === 'Miễn phí Ship'}
                                    />
                                    <label htmlFor="Miễn phí Ship" className="block text-md ml-2 text-grey-700">Miễn phí Ship</label>
                                </div>
                                <div className='flex'>
                                    <input
                                        name="shipping"
                                        type="radio"
                                        value="ghtk"
                                        onChange={handleChangeData}
                                        checked={dataProduct.shipping === 'ghtk'}
                                    />
                                    <label htmlFor="ghtk" className="block text-md ml-2 text-grey-700">Giao hang tiet kiem</label>
                                </div>
                                <div className='flex'>
                                    <input
                                        name="shipping"
                                        type="radio"
                                        value="vtp"
                                        onChange={handleChangeData}
                                        checked={dataProduct.shipping === 'vtp'}
                                    />
                                    <label htmlFor="vtp" className="block text-md ml-2 text-grey-700">Viettel Post</label>
                                </div>
                            </form>
                        </div>

                        {/* Stock section */}
                        <div className="bg-white p-6 rounded-md shadow">
                            <h2 className="text-lg font-medium mb-4 border-b">Tình trạng kho</h2>
                            <form className="space-y-4">
                                <div className='flex'>
                                    <input
                                        name="stock"
                                        type="radio"
                                        value="Còn hàng"
                                        onChange={handleChangeData}
                                        checked={dataProduct.stock === 'Còn hàng'}
                                    />
                                    <label htmlFor="Còn hàng" className="block text-md ml-2 text-grey-700">Còn hàng</label>
                                </div>
                                <div className='flex'>
                                    <input
                                        name="stock"
                                        type="radio"
                                        value="Hết hàng"
                                        onChange={handleChangeData}
                                        checked={dataProduct.stock === 'Hết hàng'}
                                    />
                                    <label htmlFor="Hết hàng" className="block text-md ml-2 text-grey-700">Hết hàng</label>
                                </div>
                                <div className='flex'>
                                    <input
                                        name="stock"
                                        type="radio"
                                        value="Nhập hàng sớm"
                                        onChange={handleChangeData}
                                        checked={dataProduct.stock === 'Nhập hàng sớm'}
                                    />
                                    <label htmlFor="Nhập hàng sớm" className="block text-md ml-2 text-grey-700">Nhập hàng sớm</label>
                                </div>
                            </form>
                        </div>

                    </div>

                    {/* Right Column: Basic Information, Add Images */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information Section */}
                        <div className="bg-white p-6 rounded-md shadow">
                            <h2 className="text-lg font-medium pb-4 border-b">Thông tin cơ bản:</h2>
                            <form className="space-y-4 mt-2">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 mb-1">Tên sản phẩm:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={dataProduct.name}
                                        onChange={handleChangeData}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="manufacturarName" className="block text-gray-700 mb-1">Hãng sản xuất:</label>
                                    <input
                                        type="text"
                                        name="manufacturarName"
                                        value={dataProduct.manufacturarName}
                                        onChange={handleChangeData}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="productId" className="block text-gray-700 mb-1">Số nhận dạng sản phẩm:</label>
                                    <input
                                        type="number"
                                        name="productId"
                                        value={dataProduct.productId}
                                        onChange={handleChangeData}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="summary" className="block text-gray-700 mb-1">Tóm tắt sản phẩm:</label>
                                    <textarea
                                        name="summary"
                                        value={dataProduct.summary}
                                        onChange={handleChangeData}
                                        className="w-full h-20 p-2 border border-gray-300 rounded-md"
                                    ></textarea>
                                </div>
                            </form>
                        </div>

                        {/* Add Images Section */}
                        <div className="bg-white p-6 rounded-md shadow">
                            <h2 className="text-lg font-medium pb-4 border-b-1">Thêm ảnh sản phẩm</h2>
                            <div className="flex items-center flex-col justify-center border-2 border-dashed border-gray-300 p-6 rounded-md">
                                <span className="text-gray-500 mb-1">Nhét ảnh vào đây</span>
                                <input
                                    type="text"
                                    name="imageUrl"
                                    value={dataProduct.imageUrl}
                                    onChange={handleChangeData}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Details */}
                        <div className="bg-white p-6 rounded-md shadow">
                            <h2 className="text-lg font-medium mb-4 pb-3 border-b">Mô tả sản phẩm</h2>
                            <form className="space-y-4">

                                {/* Product Description */}
                                <div>
                                    <label htmlFor="description" className="block text-gray-700 mb-2">Mô tả sản phẩm:</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        value={dataProduct.description}
                                        onChange={handleChangeData}
                                        className="w-full h-32 p-2 border border-gray-300 rounded-md"
                                        placeholder="Enter product description here..."
                                    ></textarea>
                                    {/* Đây là chỗ bạn sẽ thêm các icon chức năng nếu cần */}
                                </div>

                                {/* Import Status and Country of Origin */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Trạng thái nhập khẩu:</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Select</option>
                                            <option>Nhập khẩu</option>
                                            <option>Nội địa</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">Nơi xuất xứ:</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Select</option>
                                            <option>USA</option>
                                            <option>China</option>
                                            <option>Japan</option>
                                            <option>Germany</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Release Date */}
                                <div>
                                    <label className="block text-gray-700 mb-2">Release Date:</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Warranty Length */}
                                <div>
                                    <label className="block text-gray-700 mb-2">Warranty Length:</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="e.g., 1 year"
                                    />
                                </div>

                                {/* Warranty Policy */}
                                <div>
                                    <label className="block text-gray-700 mb-2">Warranty Policy:</label>
                                    <textarea
                                        className="w-full h-20 p-2 border border-gray-300 rounded-md"
                                        placeholder="Describe the warranty policy..."
                                    ></textarea>
                                </div>
                            </form>
                        </div>

                        {/* them chi tiet thong so san pham */}
                        <div className="bg-white p-6 rounded-md shadow-sm">
                            <h2 className="text-lg font-semibold mb-4 border-b pb-2 ">Thông số kỹ thuât sản phẩm</h2>

                            <ul>
                                <li className="flex justify-start items-center mb-2 pb-2 border-teal-100">
                                    <div className="flex-1">
                                        <label htmlFor="processor" className='text-md font-bold text-gray-500'>CPU</label>
                                    </div>
                                    <div className="flex-1 ml-2">
                                        <input
                                            type="text"
                                            name='processor'
                                            value={dataProduct.processor}
                                            onChange={handleChangeData}
                                            placeholder="CPU"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </li>

                                <li className="flex justify-start items-center mb-2 pb-2 border-teal-100">
                                    <div className="flex-1">
                                        <label htmlFor="memory" className='text-md font-bold text-gray-500'>Bộ nhớ</label>
                                    </div>
                                    <div className="flex-1 ml-2">
                                        <input
                                            type="text"
                                            name='memory'
                                            value={dataProduct.memory}
                                            onChange={handleChangeData}
                                            placeholder="Bộ nhớ"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </li>

                                <li className="flex justify-start items-center mb-2 pb-2 border-teal-100">
                                    <div className="flex-1">
                                        <label htmlFor="display" className='text-md font-bold text-gray-500'>Kích thước màn hình</label>
                                    </div>
                                    <div className="flex-1 ml-2">
                                        <input
                                            type="text"
                                            name='display'
                                            value={dataProduct.display}
                                            onChange={handleChangeData}
                                            placeholder="Kích thước màn hình"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </li>

                                <li className="flex justify-start items-center mb-2 pb-2 border-teal-100">
                                    <div className="flex-1">
                                        <label htmlFor="camera" className='text-md font-bold text-gray-500'>Camera chính</label>
                                    </div>
                                    <div className="flex-1 ml-2">
                                        <input
                                            type="text"
                                            name='camera'
                                            value={dataProduct.camera}
                                            onChange={handleChangeData}
                                            placeholder="camera chính"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </li>

                                <li className="flex justify-start items-center mb-2 pb-2 border-teal-100">
                                    <div className="flex-1">
                                        <label htmlFor="color" className='text-md font-bold text-gray-500'>Màu sắc</label>
                                    </div>
                                    <div className="flex-1 ml-2">
                                        <input
                                            type="text"
                                            name='color'
                                            value={dataProduct.color}
                                            onChange={handleChangeData}
                                            placeholder="Màu sắc"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex mt-3 rounded-md p-4 shadow-md bg-white justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">You're almost done</h1>
                    <div>
                        <button className="mr-4 text-gray-500 hover:text-gray-700">Discard</button>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add product</button>
                    </div>
                </div>
            </div>
        </>
    )
}