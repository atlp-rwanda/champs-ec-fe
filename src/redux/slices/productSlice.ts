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

interface ICategory {
  id: string;
  categoryName: string;
}

interface ICreateProductInput {
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

const URL = process.env.URL;

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.categories;
    } catch (error: any) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (data: ICreateProductInput, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const formData = new FormData();
      formData.append('productName', data.productName);
      formData.append('productCategory', data.productCategory);
      formData.append('productPrice', data.productPrice.toString());
      // formData.append('discount', data.discount.toString());
      formData.append('productCurrency', data.currency.trim());
      formData.append('expireDate', data.expireDate);
      formData.append('stockLevel', data.stockLevel.toString());
      formData.append('productDescription', data.description);
      for (const picture of data.productPictures) {
        formData.append('productImage', picture);
      }

      const response = await axios.post(`${URL}/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [] as IProduct[],
    categories: [] as ICategory[],
    status: 'idle' as string,
    error: null as string | null,
  },
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { addProduct } = productsSlice.actions;
const productsAddReducers = productsSlice.reducer;

export default productsAddReducers;