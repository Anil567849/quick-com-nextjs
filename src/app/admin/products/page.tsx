'use client'; // it is client side not a server side [we are not fetching data from the server]

import { Button } from '@/components/ui/button';
import React from 'react';
import { DataTable } from '../_components/data-table';
import { columns } from './_components/columns';
import { useQuery } from '@tanstack/react-query';
// import { getAllProducts } from '@/http/api';
import { Product } from '@/types/index';
import ProductSheet from './_components/product-sheet';
// import { useNewProduct } from '@/store/product/product-store';
import { Loader2 } from 'lucide-react';
import { getAllProducts } from '@/http/api';
import { useNewProduct } from '@/store/product/product-store';

const ProductsPage = () => {
    const { onOpen } = useNewProduct();

    const {
        data: products,
        isLoading,
        isError,
    } = useQuery<Product[]>({ // it will return data that you will get from getAllProducts
        queryKey: ['products'], // react-query use it for caching internally
        queryFn: getAllProducts, // our function to get all products
    });

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">Products</h3>
                <Button size={'sm'} onClick={onOpen}>
                    Add Product
                </Button>
                <ProductSheet />
            </div>

            {isError && <span className="text-red-500">Something went wrong.</span>}

            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="size-10 animate-spin" />
                </div>
            ) : (
                <DataTable columns={columns} data={products || []} />
            )}
        </>
    );
};

export default ProductsPage;