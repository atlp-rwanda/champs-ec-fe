import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  getUsers,
  createUser,
  getProducts,
  createProduct,
} from '../utils/requests';
jest.setTimeout(15000);
const axiosMock = {
  get: jest.fn(),
  post: jest.fn(),
};
axiosMock.get.mockRejectedValue({ response: { status: 404 } });
axiosMock.post.mockRejectedValue({ response: { status: 401 } });
axiosMock.get.mockRejectedValueOnce({ response: { status: 500 } });

describe('API functions', () => {
  console.log(
    'should render test with t xxxxxxxxxxxxxxxxxxxxxxx in request ts',
  );

  const userData = { username: 'testuser', email: 'testuser@example.com' };
  const productData = { productName: 'shoes', productPrice: 200 };
  beforeEach(() => {
    // Reset all axios mock functions before each test
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  // test('getUsers function', async () => {
  //   axiosMock.get.mockRejectedValue({ response: { status: 401 } });
  //   await expect(getUsers()).rejects.toThrow(
  //     'Request failed with status code 401',
  //   );
  // });
  test('createUser function', async () => {
    axiosMock.post.mockRejectedValue({ response: { status: 404 } });
    await expect(createUser(userData)).rejects.toThrow(
      'Request failed with status code 404',
    );
  });

  //   test('getProducts function', async () => {
  //     axiosMock.get.mockRejectedValueOnce({ response: { status: 500 } });
  //     await expect(getProducts()).resolves.toBeInstanceOf()
  //   });

  test('createProduct function', async () => {
    axiosMock.post.mockRejectedValue({ response: { status: 401 } });
    await expect(createProduct({})).rejects.toThrow(
      'Request failed with status code 401',
    );
  });
});
