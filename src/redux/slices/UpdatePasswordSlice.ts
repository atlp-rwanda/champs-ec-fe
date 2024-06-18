import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface UpdatePasswordState {
    loading: boolean;
    error: String | null;
}

const initialState: UpdatePasswordState = {
    loading: false,
    error: '',
};

export interface PasswordData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export const updatePassword = createAsyncThunk(
    'updatepassword',
    async (FormData: PasswordData) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.patch(
                `${process.env.URL}/users/passwordUpdate`,
                {
                    oldPassword: FormData.oldPassword,
                    newPassword: FormData.newPassword,
                    confirmPassword: FormData.confirmPassword,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                },
            );
            return response;
        } catch (error: any) {
            return error;
        }
    },
);
const updatePasswordSlice = createSlice({
    name: 'updatePassword',
    initialState,

    reducers: {
        clearError(state) {
            state.error = '';
        },
    },
    extraReducers(builder) {
        builder.addCase(updatePassword.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.loading = false;
            if (
                action.payload &&
                action.payload.response &&
                action.payload.response.data.error
            ) {
                state.error = action.payload.response.data.error;
            } else {
                state.error = '';
            }
        });
    },
});
export const { clearError } = updatePasswordSlice.actions;

export default updatePasswordSlice.reducer;
