import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { unstable_noStore as noStore } from 'next/cache';

import { useDispatch } from 'react-redux';
import request from '@/utils/axios';
import { ProductType } from '@/types/Product';
import {
  CARTINT,
  IUSERCART,
  handleCartCount,
} from '@/redux/slices/userCartSlice';
const URL = process.env.URL;

// fetch user cart initial ---------------------------------------------------------------------

export const handleFetchUserCart = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery({
    queryKey: ['carts'],
    queryFn: async () => {
      noStore();
      try {
        const result: any = await request.get(`/carts`);
        // console.log("-----------------------------------------------------------",result)
        if (result.cart) {
          localStorage.setItem('productCart', JSON.stringify(result.cart));
        }
        dispatch(handleCartCount(result));

        return result;
      } catch (error: any) {
        console.log(error);
        localStorage.removeItem('productCart');
        dispatch(handleCartCount(error.response.data));
        throw error.response.data.error;
      }
    },
  });
};

export const handleCartInfoManipulation = (
  cart: IUSERCART,
  allProduct: ProductType[],
) => {
  let cartProduct: CARTINT[] = cart.product;

  const productList = allProduct;
  const productLookup: any = {};
  productList.forEach((product: ProductType) => {
    productLookup[product.id as string] = product;
  });

  const updatedcartProduct = [];
  // Iterate over the cartProduct and add product information
  for (const userCart of cartProduct) {
    const product = productLookup[userCart.product];

    if (product) {
      const updatedCart = {
        ...userCart,
        name: product.productName,
        unitPrice: product.productPrice,
        description: product.productDescription,
        thumbnail: product.productThumbnail,
      };

      updatedcartProduct.push(updatedCart);
    }
  }

  //localStorage.setItem('userCart', JSON.stringify(cart?.userId));
  // localStorage.setItem('productCart', JSON.stringify(updatedcartProduct));
  return updatedcartProduct;
  //dispatch(handleCartCount(updatedcartProduct));
};
