'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, fetchCategories } from '../../redux/slices/productSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../../redux/store';
import { productSchema } from "../../validations/productValidation";
import { showToast } from '@/helpers/toast';
import InputBox from '../InputBox';
import { Router } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IProduct {
  id: string;
  productName: string;
  productCategory: string;
  productPrice: number;
  discount: number;
  currency: string;
  expireDate: string;
  stockLevel: number;
  description: string;
  productPictures: File[];
}

interface IFormInput extends Partial<IProduct> {}

interface ProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductPopup: React.FC<ProductPopupProps> = ({
  
  isOpen = true,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<IFormInput>({
    resolver: zodResolver(productSchema),
  });
  const [pictures, setPictures] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { categories, status } = useSelector(
    (state: RootState) => state.productsAddReducers,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cath = async () => {
      const data = await dispatch(fetchCategories());
  
      console.log('dada', data);
    };
    cath();
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (files.length < 4) {
      setUploadError('You must upload at least 4 pictures.');
      return;
    }

    if (files.length > 8) {
      setUploadError('You can upload a maximum of 8 pictures.');
      return;
    }

    data.productPictures = files;

    setLoading(true);
  
    try {
      const resultAction = await dispatch(createProduct(data as IProduct));
      const result = unwrapResult(resultAction);
     
      console.log(result);
      console.log(result.message);
      showToast(result.message, 'success');
      reset();
        router.push('/dashboard/products');
      
    
    
    
    } catch (error: any) {
      console.error('Failed to create product:', error);
      let errorMessage = 'An unknown error occurred';
      if (error.response) {
        if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.data) {
          errorMessage = JSON.stringify(error.response.data);
        } else {
          errorMessage = error.response.statusText;
        }
      } else if (error.error) {
        errorMessage = error.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      const file = e.target.files[0];
      const totalFiles = files.length + 1;

      // Check for maximum file limit
      if (totalFiles > 8) {
        setUploadError('You can upload a maximum of 8 pictures.');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Only jpeg, jpg, and png files are allowed.');
        return;
      }

      // Validate file size (maximum size of 1MB)
      const maxSizeInBytes = 1 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        setUploadError('Image size must be less than 1MB.');
        return;
      }

      const filePreview = URL.createObjectURL(file);
      setPictures((prevPictures) => [...prevPictures, filePreview]);
      setFiles((prevFiles) => [...prevFiles, file]);
      setValue('productPictures', [
        ...(getValues('productPictures') || []),
        file,
      ]);
      trigger('productPictures');
      setUploadError(null);

      const updatedFiles = getValues('productPictures') || [];
      if (updatedFiles.length < 4) {
        setUploadError('You must upload at least 4 pictures.');
      } else {
        setUploadError(null);
      }
    } else {
      setUploadError('Please upload one picture at a time.');
    }
  };

  const handleDeletePicture = (index: number) => {
    setPictures((prevPictures) => prevPictures.filter((_, i) => i !== index));
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setValue('productPictures', updatedFiles);
    trigger('productPictures');

    if (updatedFiles.length < 4) {
      setUploadError('You must upload at least 4 pictures.');
    } else {
      setUploadError(null);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // if (!isOpen) return null;

  return (
   
    <div
      className=" inset-0 flex items-center justify-start w-full mb-10 mt-10 "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 sm:w-full pb-10 sm:max-w-[80%] w-[100%] min-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          // onClick={onClose}
          className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2 z-50 hidden"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputBox
              nameuse="Product Name"
              type="text"
              placeholder="Enter product name"
              {...register('productName')}
              error={errors.productName?.message}
            />
            <div>
              <label
                htmlFor="productCategory"
                className="mb-0 text-[14px] font-medium text-black/80"
              >
                Product Category
              </label>
              <select
                id="productCategory"
                {...register('productCategory')}
                className={`border rounded-s-sm ${errors.productCategory ? 'border-red-500' : 'border-black/30'} text-[12px] w-full p-2 ${status === 'loading' ? 'select-disabled' : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <option className="option-loading">
                    Loading categories...
                  </option>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))
                ) : (
                  <option value="">No categories available</option>
                )}
              </select>
              {errors.productCategory && (
                <p className="text-red-500 text-xs">
                  {errors.productCategory.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputBox
              nameuse="Product Price"
              type="number"
              placeholder="Enter product price"
              {...register('productPrice')}
              error={errors.productPrice?.message}
            />
            <InputBox
              nameuse="Discount"
              type="number"
              placeholder="Enter discount"
              {...register('discount')}
              error={errors.discount?.message}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputBox
              nameuse="Currency"
              type="text"
              placeholder="Enter currency"
              {...register('currency')}
              error={errors.currency?.message}
            />
            <InputBox
              nameuse="Expire Date"
              type="date"
              min={getCurrentDate()}
              {...register('expireDate')}
              error={errors.expireDate?.message}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputBox
              nameuse="Stock Level"
              type="number"
              placeholder="Enter stock level"
              {...register('stockLevel')}
              error={errors.stockLevel?.message}
            />
            <div>
              <label
                htmlFor="productPictures"
                className="block font-medium mb-1"
              >
                Product Pictures
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="productPictures"
                  onChange={handlePictureUpload}
                  className="hidden"
                  accept="image/*"
                />
                <label
                  htmlFor="productPictures"
                  className="cursor-pointer w-full"
                >
                  <div
                    className={`text-center p-2 rounded h-[40px] flex justify-center items-center ${errors.productPictures || uploadError ? 'border-red-500' : 'border-gray-400'} border`}
                    style={{ position: 'relative', top: '-4px' }}
                  >
                    <span className="text-xl">+</span>
                    <span className="ml-2">Upload</span>
                  </div>
                </label>
              </div>
              {uploadError && (
                <p className="text-red-500 text-xs">{uploadError}</p>
              )}
              {errors.productPictures && (
                <p className="text-red-500 text-xs">
                  {errors.productPictures.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap mt-4">
            {pictures.map((picture, index) => (
              <div key={index} className="w-36 h-36 m-2 relative border group">
                <img
                  src={picture}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeletePicture(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              className={`border p-2 w-full rounded ${errors.description ? 'border-red-500' : 'border-gray-400'}`}
              placeholder="Enter product description"
              rows={4}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-l-lg rounded-r-none flex-grow flex items-center justify-center mb-2 md:mb-0"
            >
              <span className="ml-2">Close</span>
            </button>
            <button
              type="submit"
              className="bg-greenMain hover:bg-green-500 text-white px-4 py-3 rounded-r-lg rounded-l-none flex-grow flex items-center justify-center"
              disabled={status === 'loading' || loading}
            >
              {loading && (
                <div className="border-t-4 border-b-4 border-white rounded-full w-6 h-6 animate-spin m-auto"></div>
              )}
              {!loading && <span className="ml-2">Save Product</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductPopup;
