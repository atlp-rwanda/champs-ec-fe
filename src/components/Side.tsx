'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import sideImage from "../../public/Rectangle 1403.png";
import request from '@/utils/axios';
import { CategoryResponse, ProductObj } from '@/types/Product';
import { useRouter } from 'next/navigation';

function Side() {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [products, setProducts] = useState<ProductObj[]>([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');

    const router = useRouter();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const allCategories: any = await request.get('/categories');
                setCategories(allCategories.categories || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        async function fetchProducts() {
            try {
                const allProducts: any = await request.get(`/products`);
                setProducts(allProducts.products || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        handleSearchParams();
    }, [minPrice, maxPrice, selectedCategory, selectedProduct]);

    const handleSearchParams = () => {
        if (minPrice || maxPrice || selectedCategory || selectedProduct) {
            const queryParams: { [key: string]: string } = {};
            if (minPrice) queryParams.minPrice = minPrice;
            if (maxPrice) queryParams.maxPrice = maxPrice;
            if (selectedCategory) queryParams.category = selectedCategory;
            if (selectedProduct) queryParams.name = selectedProduct;

            const queryString = new URLSearchParams(queryParams).toString();
            console.log('Query Params:', queryString); // Debugging log
            router.push(`/products?${queryString}`);
        }
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setSelectedProduct('');
    };

    const handleProductClick = (product: string) => {
        setSelectedProduct(product);
        setSelectedCategory('');
    };

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(e.target.value);
    };

    return (
        <div className='h-full w-[15rem] mt-5 flex flex-col justify-center items-center gap-10'>
            <div className='w-full border p-5 flex-col items-center justify-center border-black'>
                <h2 className='border-b-[1px] border-black pb-2'>Filter Product</h2>
                <div className='m-3'>
                    <h2>Categories</h2>
                    {categories.length > 0 ? (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {categories.map((category: any) => (
                                <h4 
                                    key={category.id} 
                                    className={`text-blue-400 cursor-pointer px-2 py-1 rounded ${selectedCategory === category.id ? 'font-bold text-blue-600' : ''}`} 
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    {category.categoryName}
                                </h4>
                            ))}
                        </div>
                    ) : (
                        <p>No categories available</p>
                    )}
                    <p>Price</p>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex justify-between gap-3'>
                        <input 
                            type="number" 
                            className='border p-2 w-[6rem]' 
                            placeholder='Min Price' 
                            value={minPrice} 
                            onChange={handleMinPriceChange}
                            onBlur={handleSearchParams}
                        />
                        <input 
                            type="number" 
                            className='border p-2 w-[6rem]' 
                            placeholder='Max Price' 
                            value={maxPrice} 
                            onChange={handleMaxPriceChange}
                            onBlur={handleSearchParams}
                        />
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <Image src={sideImage} width={200} height={200} alt='side_Image' />
            </div>
        </div>
    );
}

export default Side;
