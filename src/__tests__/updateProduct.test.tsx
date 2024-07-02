
import axios from 'axios';
import request from '@/utils/axios'; 

import { handleUpdateProduct } from '@/hooks/update';
import { IFormInput } from '@/components/Product/editProduct';

// Mock axios
jest.mock('@/utils/axios');

describe('handleUpdateProduct', () => {
  const mockRequest = request as jest.Mocked<typeof request>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully update a product', async () => {
    const data: IFormInput = {
      productName: 'Test Product',
      productCategory: 'Test Category',
      productPrice: 100,
      discount: 10,
      currency: 'USD',
      expireDate: '2024-12-31',
      stockLevel: 50,
      description: 'Test Description',
      productPictures: [new File([''], 'test.png')],
    };
    const id = '123';

    const mockResponse = {
      data: {
        success: true,
        message: 'Product updated successfully',
      },
    };

    mockRequest.put.mockResolvedValue(mockResponse);

    const result = await handleUpdateProduct(data, id);

    expect(mockRequest.put).toHaveBeenCalledWith(`/products/${id}`, expect.any(FormData));
    expect(result).toEqual(mockResponse.data);
  });

  it('should handle errors', async () => {
    const data: IFormInput = {
      productName: 'Test Product',
      productCategory: 'Test Category',
      productPrice: 100,
      discount: 10,
      currency: 'USD',
      expireDate: '2024-12-31',
      stockLevel: 50,
      description: 'Test Description',
      productPictures: [new File([''], 'test.png')],
    };
    const id = '123';

    const mockError = new Error('Error updating product');

    mockRequest.put.mockRejectedValue(mockError);

    await expect(handleUpdateProduct(data, id)).rejects.toThrow('Error updating product');
    expect(mockRequest.put).toHaveBeenCalledWith(`/products/${id}`, expect.any(FormData));
  });
});
