import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import SideBar from "@/components/Side"
import Provider from '@/app/providers';
import Page from '@/app/products/page';

const queryClient = new QueryClient();
const ProductListTest = () => {
  const { data } = useQuery<any>({
    queryKey: ['test'],
    queryFn: () => 'test',
  });
  return <div>{data}</div>;
};

describe('ProductList', () => {

  it('renders without crashing', async () => {
    const { findByText } = render(
        <Provider>
          <ProductListTest />
        </Provider>
    );
    expect(await findByText('test')).toBeInTheDocument();
});
});
