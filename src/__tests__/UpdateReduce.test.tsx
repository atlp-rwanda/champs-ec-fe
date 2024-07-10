import reducer, {
  updatePassword,
  clearError,
  PasswordData,
  UpdatePasswordState,
} from '@/redux/slices/UpdatePasswordSlice';

describe('updatePassword slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      loadings: false,
      erro: '',
    });
  });

  it('should handle updatePassword.pending', () => {
    const initialState: UpdatePasswordState = {
      loadings: false,
      erro: '',
    };

    const action = { type: updatePassword.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      loadings: true,
      erro: null,
    });
  });

  it('should handle updatePassword.fulfilled', () => {
    const initialState: UpdatePasswordState = {
      loadings: false,
      erro: '',
    };

    const action = {
      type: updatePassword.fulfilled.type,
      payload: { data: { message: 'Password updated successfully !' } },
    };

    const state = reducer(initialState, action);
    expect(state).toEqual({
      loadings: false,
      erro: '',
    });
  });
  it('should handle updatePassword.fulfilled with error', () => {
    const initialState: UpdatePasswordState = {
      loadings: false,
      erro: '',
    };

    const action = {
      type: updatePassword.fulfilled.type,
      payload: {
        response: { data: { error: 'incorrect old password' } },
      },
    };

    const state = reducer(initialState, action);
    expect(state).toEqual({
      loadings: false,
      erro: 'incorrect old password',
    });
  });

  it('should handle updatePassword.rejected', () => {
    const initialState: UpdatePasswordState = {
      loadings: false,
      erro: '',
    };

    const action = {
      type: updatePassword.rejected.type,
      erro: 'Failed to update password',
    };

    const state = reducer(initialState, action);
    expect(state).toEqual({
      loadings: false,
      erro: '',
    });
  });

  it('should handle clearError', () => {
    const initialState: UpdatePasswordState = {
      loadings: false,
      erro: 'Some error',
    };

    const action = { type: clearError.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      loadings: false,
      erro: '',
    });
  });
});
