'use client';

import { ProductType } from '@/types/Product';
import { productSchema } from '@/validations/productValidation';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import request from '@/utils/axios';
import { IFormInput } from '@/components/Product/editProduct';
import { IUpdateProductInput } from '@/redux/slices/UpdateProductSlice';

export const handleUpdateProduct = async (data: IFormInput, id: string) => {
  console.log('-----------------', id);

  const formData = new FormData();

  if (data.productName) {
    formData.append('productName', data.productName);
  }
  if (data.productCategory) {
    formData.append('productCategory', data.productCategory);
  }
  if (data.productPrice !== undefined) {
    formData.append('productPrice', data.productPrice.toString());
  }
  if (data.discount !== undefined) {
    formData.append('productDiscount', data.discount.toString());
  }
  if (data.currency) {
    formData.append('productCurrency', data.currency.trim());
  }
  if (data.expireDate) {
    formData.append('expireDate', data.expireDate);
  }
  if (data.stockLevel !== undefined) {
    formData.append('stockLevel', data.stockLevel.toString());
  }
  if (data.description) {
    formData.append('productDescription', data.description);
  }
  if (data.productPictures) {
    for (const picture of data.productPictures) {
      formData.append('productImage', picture);
    }
  }

  try {
    const response:any = await request.put(`/products/${id}`, formData);
    console.log('RESPONSE', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating product', error);
    throw error;
  }
};
