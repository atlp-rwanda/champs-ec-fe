// showToast.test.ts
import { toast } from 'react-toastify';
import { showToast } from '../helpers/toast';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('showToast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call toast with the correct arguments for default type', () => {
    const message = 'This is a default message';
    showToast(message);

    expect(toast).toHaveBeenCalledWith(message, {
      type: 'default',
      position: 'top-right',
      autoClose: 20000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  });

  it('should call toast with the correct arguments for success type', () => {
    const message = 'This is a success message';
    showToast(message, 'success');

    expect(toast).toHaveBeenCalledWith(message, {
      type: 'success',
      position: 'top-right',
      autoClose: 20000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  });

  // Add more tests for other types if needed
});
