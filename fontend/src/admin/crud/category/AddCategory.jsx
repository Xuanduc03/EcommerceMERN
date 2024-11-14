import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../../../common/helper';

export const AddCategory = ({ onClose }) => {
    const [dataCategory, setDataCategory] = useState({
        name: '',
        description: '',
        imageUrl: '',
        status: 'Hiển thị',
        subCategories: [],
    });
    const [subCategoryName, setSubCategoryName] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setDataCategory({ ...dataCategory, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setDataCategory((prev) => ({ ...prev, imageUrl: file }))
        }
    }

    const addSubCategory = () => {
        if (subCategoryName.trim()) {
            setDataCategory((prev) => ({
                ...prev,
                subCategories: [...prev.subCategories, { name: subCategoryName }],
            }));
            setSubCategoryName('');
        }
    };

    const handleSubmitAdd = async (e) => {
        e.preventDefault();

        try {
            const fetchData = await fetch(SummaryApi.add_category.url, {
                method: SummaryApi.add_category.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataCategory),
            });

            const responseData = await fetchData.json();
            if (responseData.success) {
                toast.success('Thêm danh mục thành công');
                onClose();
            } else {
                toast.error(responseData.error || 'Lỗi thêm');
            }
        } catch (error) {
            toast.error('Không thể thêm danh mục');
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 top-4 md:inset-0 h-modal" id="add-user-modal">
                <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                            <h3 className="text-xl font-semibold dark:text-white">Thêm danh mục</h3>
                            <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <form onSubmit={handleSubmitAdd}>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên danh mục</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={dataCategory.name}
                                            onChange={handleChangeData}
                                            id="name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Tên danh mục"
                                            required
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả danh mục</label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={dataCategory.description}
                                            onChange={handleChangeData}
                                            id="description"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Mô tả danh mục"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
                                        <input
                                            id="file_input"
                                            type="file"
                                            onChange={handleImageChange}
                                            name='imageUrl'
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        />
                                        {previewImage && (
                                            <img src={previewImage} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded" />
                                        )}
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="subCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên danh mục con</label>
                                        <input
                                            type="text"
                                            value={subCategoryName}
                                            onChange={(e) => setSubCategoryName(e.target.value)}
                                            id="subCategory"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Tên danh mục con"
                                        />
                                        <button type="button" onClick={addSubCategory} className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                                            Thêm danh mục con
                                        </button>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn trạng thái</label>
                                        <select
                                            onChange={handleChangeData}
                                            name="status"
                                            value={dataCategory.status}
                                            id="status"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        >
                                            <option value="Hiển thị">Hiển thị</option>
                                            <option value="Ẩn">Ẩn</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thêm danh mục</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
