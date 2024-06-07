import reducer, {
  updatePassword,
  clearError,
  PasswordData,
  UpdatePasswordState,
} from '@/redux/slices/UpdatePasswordSlice';

describe('updatePassword slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      loading: false,
      error: '',
    });
  });

  it('should handle updatePassword.pending', () => {
    const initialState: UpdatePasswordState = {
      loading: false,
      error: '',
    };

    const action = { type: updatePassword.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: true,
      error: null,
    });
  });

  it('should handle updatePassword.fulfilled', () => {
    const initialState: UpdatePasswordState = {
      loading: false,
      error: '',
    };

    const action = {
      type: updatePassword.fulfilled.type,
      payload: { data: { message: 'Password updated successfully !' } },
    };

    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      error: '',
    });
  });
  it('should handle updatePassword.fulfilled with error', () => {
    const initialState: UpdatePasswordState = {
      loading: false,
      error: '',
    };

    const action = {
      type: updatePassword.fulfilled.type,
      payload: {
        response: { data: { error: 'incorrect old password' } },
      },
    };

    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      error: 'incorrect old password',
    });
  });

  it('should handle updatePassword.rejected', () => {
    const initialState: UpdatePasswordState = {
      loading: false,
      error: '',
    };

    const action = {
      type: updatePassword.rejected.type,
      error: 'Failed to update password',
    };

    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      error: '',
    });
  });

  it('should handle clearError', () => {
    const initialState: UpdatePasswordState = {
      loading: false,
      error: 'Some error',
    };

    const action = { type: clearError.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      error: '',
    });
  });
});
