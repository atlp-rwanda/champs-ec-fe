import React from 'react'

interface Product {
  id: number;
  productCategory: string;
  productName: string;
  stockLevel: number;
  productPrice: number;
  productCurrency: string;
  productImage: Array<string>;
  productDescription: string;
  expireDate: string;
}

interface ProductDisplayProps {
  product: Product;
}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  return (
    <div className="product-card">
      <h3></h3>
      <p></p>
    </div>
  );
};