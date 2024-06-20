import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ProductDisplay } from '@/app/ProductView';

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
