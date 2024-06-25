import { showToast } from '@/helpers/toast';
import { ProductType } from '@/types/Product';
import request from '@/utils/axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
const URL = process.env.URL;

export interface CARTINT {
  product: string;
  quantity: number;
  totalPrice?: number;
}

interface AddToCartPayload {
  productId: string;
  productPrice?: number;
  quantity?: number;
}

export interface IUSERCART {
  id?: string;
  userId: string;
  product: Array<CARTINT> | [];
  totalPrice?: number;
  updatedAt?: string;
  createdAt?: string;
}

interface InitialCart {
  loading: boolean;
  allProduct: ProductType[];
  deleteCartLoading:boolean,
  cart: IUSERCART | null;
  productInCart: CARTINT[];
  error: string | null;
}

const initialState: InitialCart = {
  loading: false,
  deleteCartLoading:false,
  allProduct: [],
  cart: { userId: '', product: [] },
  productInCart: [],
  error: null,
};

// adding new item in user cart ------------------------------------------------------------------------

export const handleUserAddCart = createAsyncThunk(
  'userAddCart',
  async (payload: AddToCartPayload, { rejectWithValue }) => {
    try {
      const product: CARTINT = {
        quantity: 1,
        totalPrice: payload.productPrice,
        product: payload.productId,
      };

      if (localStorage.getItem('productCart')) {
        const userCart: IUSERCART = JSON.parse(
          localStorage.getItem('productCart') || '',
        );
        let carts: CARTINT[] = userCart.product;
        const productExists = carts.some(
          (item) => item.product === payload.productId,
        );

        if (!productExists) {
          carts.push(product);
          const items = carts.map((element) => ({
            productId: element.product,
            Quantity: element.quantity,
          }));

          const isUserCartExist: string | null = userCart.userId;
          if (isUserCartExist !== '') {
            const response = await request.put(`/carts`, items);
            return response;
          }
        } else {
          const error = 'Product already exists in the cart';
          //showToast(error, 'error');
          return { error };
        }
      } else {
        const items = [
          {
            productId: payload.productId,
            Quantity: 1,
          },
        ];
        const response = await request.post(`/carts`, items);
        //showToast('Successfully added to cart', 'info');
        return response;
      }
    } catch (error: any) {
      showToast(error.response.data.error, 'error');
      return rejectWithValue(error.error);
    }
  },
);

// handle change item quantinty in cart -------------------------------------------------------------------------

export const handleChangeCartQuantity = createAsyncThunk(
  'updateUserCart',
  async (payload: AddToCartPayload,{rejectWithValue}) => {
    const product: CARTINT = {
      quantity: payload.quantity as number,
      product: payload.productId,
    };

    try {
      const userCart = JSON.parse(localStorage.getItem('productCart') || '[]');
      const updatedItems = userCart.product;
      updatedItems.forEach((item: any) => {
        if (item.product === payload.productId) {
          item.quantity = payload.quantity as number;
        }
      });

      const items = updatedItems.map(
        (element: { product: string; quantity: number }) => ({
          productId: element.product,
          Quantity: element.quantity,
        }),
      );

      const result: any = await request.put(`/carts`, items);
      return result;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// handle remove single item in cart ----------------------------------------------------------------------------

export const handleRemoveItemInCart = createAsyncThunk(
  'deleteSingleItemInCart',
  async (id:string,{rejectWithValue}) => {
    try{ 
    const userCart = JSON.parse(localStorage.getItem('productCart') || '[]');
    const carts = userCart.product;
    const updatedItems = carts.filter(
      (item: { product: string }) => item.product !== id,
    );

    const items = updatedItems.map(
      (element: { product: string; quantity: number }) => ({
        productId: element.product,
        Quantity: element.quantity,
      }),
    );
    const result:any= await request.put(`/carts`, items);
    return result
   }catch(error:any) {
    return rejectWithValue(error.response.data);
  }
});




// handle remove all items in cart----------------------------------------------------

export const handleRemoveAllCart = createAsyncThunk(
  'deleteUserCart',
  async () => {
    const items: CARTINT[] = [];
    const result = request.put(`/carts`, items);
    return result;
  },
);











export const userCartSlice = createSlice({
  name: 'counter',
  initialState,

  reducers: {
    storeAllProduct: (state, action) => {
      state.allProduct = action.payload;
    },
    updateLocalCart: (state, action) => {
      state.productInCart = action.payload;
    },
    handleCartCount: (state, action: PayloadAction<any>) => {
      const result = action.payload;
      console.log('-------------------------------------------------------------++++++++++',result)
      if (!result.error) {
        state.cart = result.cart;
        localStorage.setItem('productCart', JSON.stringify(result.cart));
      } else {
        state.error = result.error;
        state.cart = { userId: '', product: [] };
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(handleUserAddCart.pending, (state: InitialCart) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      handleUserAddCart.fulfilled,
      (state: InitialCart, action: PayloadAction<any>) => {
        const result = action.payload;
        state.loading = false;
        if (!result.error) {
          state.cart = result;
          localStorage.setItem('productCart', JSON.stringify(result));
          showToast('Successfully added to cart', 'info');
        } else {
          showToast(result.error,'error');
          state.error = result.error;
        }
      },
    );
    builder.addCase(
      handleUserAddCart.rejected,
      (state: InitialCart, action: PayloadAction<any>) => {
        (state.loading = false), (state.error = action.payload);
      },
    );

    builder.addCase(handleChangeCartQuantity.pending, (state: InitialCart) => {
      state.error = '';
    });

    builder.addCase(
      handleChangeCartQuantity.fulfilled,
      (state: InitialCart, action: PayloadAction<any>) => {
        const result = action.payload;
        state.loading = false;
        if (!result.error) {
          state.cart = action.payload;
          localStorage.setItem('productCart', JSON.stringify(result));
        } else {
          state.error = result.error;
          showToast(result.error, 'warning');
        }
      },
    );
    builder.addCase(
      handleChangeCartQuantity.rejected,
      (state: InitialCart, action: PayloadAction<any>) => {
        (state.loading = false), (state.error = action.payload);
      },
    );


    builder.addCase(handleRemoveItemInCart.pending, (state: InitialCart) => {
      state.deleteCartLoading= true;
      state.error = '';
    });

    builder.addCase(
      handleRemoveItemInCart.fulfilled,
      (state: InitialCart, action: PayloadAction<any>) => {
        const result = action.payload;
         state.deleteCartLoading = false;
        if (!result.error) {
          state.cart = action.payload;
          localStorage.setItem('productCart', JSON.stringify(result));
        } else {
          state.error = result.error;
          showToast(result.error, 'warning');
        }
      },
    );

    builder.addCase(handleRemoveItemInCart.rejected, (state: InitialCart) => {
      state.deleteCartLoading =false;
      state.error = '';
    });

    builder.addCase(handleRemoveAllCart.pending, (state: InitialCart) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      handleRemoveAllCart.fulfilled,
      (state: InitialCart, action: PayloadAction<any>) => {
        const result = action.payload;
        state.loading = false;
        if (!result.error) {
          state.cart = action.payload;
          localStorage.setItem('productCart', JSON.stringify(result));
        } else {
          state.error = result.error;
          showToast(result.error, 'warning');
        }
      },
    );
  },
});

//export const {sellerOTP}=twoFactorAuthSlice.actions
export const { handleCartCount, storeAllProduct, updateLocalCart } =
  userCartSlice.actions;
export default userCartSlice.reducer;
