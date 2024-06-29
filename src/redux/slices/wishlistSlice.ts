import request from '@/utils/axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const handleFetchUserWishes = async ():Promise<number>=>{
    const token = localStorage.getItem('token');
    if(token){
        const response:any = await request.get('/wishes');
        console.log('this is data from wishlist', response);
        if(response.status == 200){
            return response.wishes.length;
        }
    }
    return 0;
};

const initialState = {
    wishNumber: handleFetchUserWishes()
};
export const userWishlistSlice = createSlice({
    name: 'wishlistCounter',
    initialState,
    reducers: {
      handleWishlistCount: (state, action: PayloadAction<any>) => {
        const result = action.payload;
        state.wishNumber = result;
      }
    }
});

export const { handleWishlistCount } = userWishlistSlice.actions;
export default userWishlistSlice.reducer;


