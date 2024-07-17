import axiosMockAdapter from 'axios-mock-adapter';
import request from '@/utils/axios';
import axios from 'axios';
// Mock functions
const setItems = jest.fn();
const showToast = jest.fn();
const setError = jest.fn();

// Mock useState and useRouter from next/navigation
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial: any) => [initial, setItems],
}));

// Sample handleDelete function
const handleDelete = async (id: string) => {
  try {
    const res = await request.delete(`/products/${id}`);
    setItems((items: any) => items.filter((product: any) => product.id !== id));
    console.log(res);
    showToast('Product has been deleted', 'success');
    // router.push('/sellers?page=Products');
  } catch (error) {
    console.log(error);
    setError('Error deleting item');
    showToast('error deleting product', 'error');
  }
};

describe('handleDelete', () => {
  const mock = new axiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

//   it('should delete a product successfully', async () => {
//     const id = '1';
//     const response = { data: 'Product deleted' };

//     mock.onDelete(`/products/${id}`).reply(200, response);

//     await handleDelete(id);

//     expect(setItems).toHaveBeenCalledWith(expect.any(Function));
//     expect(showToast).toHaveBeenCalledWith('Product has been deleted', 'success');
//     // Uncomment the following line to ensure push is called
//     // expect(push).toHaveBeenCalledWith('/sellers?page=Products');
//   });

  it('should handle delete error', async () => {
    const id = '1';

    mock.onDelete(`/products/${id}`).reply(500);

    await handleDelete(id);

    expect(setError).toHaveBeenCalledWith('Error deleting item');
    expect(showToast).toHaveBeenCalledWith('error deleting product', 'error');
  });
});
