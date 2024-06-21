import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import sideImage from "../../public/Rectangle 1403.png";
import request from '@/utils/axios'; // Assuming request uses axios for HTTP requests

// Define the type for a category and product
interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
}

interface CategoryResponse {
    data: Category[];
}

interface ProductResponse {
    data: {
        products: Product[];
    };
}

function Side() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await request.get<CategoryResponse>('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        async function fetchProducts() {
            try {
                const response = await request.get<ProductResponse>('/products');
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchCategories();
        fetchProducts();
    }, []);

    return (
        <>
            <div className='h-full w-[15rem] mt-5 flex flex-col justify-center items-center gap-10'>
                <div className='w-full border p-5 flex-col items-center justify-center border-black'>
                    <h2 className='border-b-[1px] border-black pb-2'>Filter Product</h2>
                    <div className='m-3'>
                        <p className='font-bold'>Categories</p>
                        {/* {categories.map((category) => (
                            <p key={category.id} className='text-blue-300'>{category.name}</p>
                        ))} */}
                        <p className='font-bold'>Price</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex justify-between gap-3'>
                            <input 
                                type="number" 
                                className='border p-2 w-[6rem]' 
                                placeholder='Min Price' 
                                value={minPrice} 
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <input 
                                type="number" 
                                className='border p-2 w-[6rem]' 
                                placeholder='Max Price' 
                                value={maxPrice} 
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col justify-center gap-2 mt-3'>
                        <h3 className='font-bold'>Product Names</h3>
                        <div className='flex flex-col gap-2'>
                            {products.map((product) => (
                                <p key={product.id} className='border px-2 cursor-pointer'>{product.name}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <Image src={sideImage} width={200} height={200} alt='side_Image' />
                </div>
            </div>
        </>
    );
}

export default Side;
