import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ProductDisplay } from '@/app/ProductView';
import {
  productSchema,
  productUpdateSchema,
} from '@/validations/productValidation';

describe('Product Validation Schemas', () => {
  test('Valid product data should pass', () => {
    const validProduct = {
      productName: 'Test Product',
      stockLevel: '10',
      productCategory: '123e4567-e89b-12d3-a456-426614174000',
      productPrice: '50',
      productDiscount: '10',
      currency: 'USD',
      description: 'This is a test product description.',
      expireDate: new Date(Date.now() + 86400000).toISOString(),
    };

    expect(productSchema.parse(validProduct)).toEqual(validProduct);
  });

  test('Invalid product data should fail', () => {
    const invalidProduct = {
      productName: '',
      stockLevel: 'abc',
      productCategory: 'invalid-uuid',
      productPrice: 'abc',
      productDiscount: 'abc',
      currency: 'US$',
      description: 'Short desc.',
      expireDate: '2020-01-01',
    };

    expect(() => productSchema.parse(invalidProduct)).toThrow();
  });

  test('Update schema should match product schema', () => {
    expect(productUpdateSchema).toEqual(productSchema);
  });
});

describe('ProductDisplay', () => {
  const product = {
    id: 1,
    productCategory: 'Category',
    productName: 'Product Name',
    stockLevel: 10,
    productPrice: 100,
    productCurrency: 'USD',
    productImage: ['image1.jpg', 'image2.jpg'],
    productDescription: 'Product Description',
    expireDate: '2024-12-31',
  };
  it('should render h3 tag for product name and p tag for product description', () => {
    const { container } = render(<ProductDisplay product={product} />);

    const productNameElement = container.querySelector('h3');
    expect(productNameElement).toBeInTheDocument();

    const productDescriptionElement = container.querySelector('p');
    expect(productDescriptionElement).toBeInTheDocument();
  });
});
