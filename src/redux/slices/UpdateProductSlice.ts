import request from '@/utils/axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
  loading: false;
  productPictures: File[];
}

export interface IUpdateProductInput {
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

interface ICategory {
  id: string;
  categoryName: string;
}

const URL = process.env.URL;

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await request.get(`/categories/`);
      console.log('CATEGORIES',response.categories)
      return response.categories;
    } catch (error: any) {
console.log(error)
      if (error.response && error.response.data.error) {
        console.log(error.response.data.error)
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);



const UpdateProductsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [] as IProduct[],
    status: 'idle' as string,
    error: null as string | null,
  },
  reducers: {
    SetProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
  },
 

});

export const { SetProduct } = UpdateProductsSlice.actions;
export default UpdateProductsSlice.reducer;
