// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import Page from "@/app/products/[id]/page";


// describe('sellerProductView', () => {
//   it('renders the loading state', () => {
//     render(<Page />);
//     expect(screen.getByText('Description:')).toBeInTheDocument();
//   });
// });
// function useFetchData(): any {
//   throw new Error('Function not implemented.');
// }

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductPage from '@/app/products/[id]/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductList from '@/components/ProductList';
import Providers from '@/app/providers';
// Test suite for the Home page
const queryClient = new QueryClient();

// const createTestQueryClient = () => {
//   return new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: false,
//       },
//     },
//   });
// };

// const renderWithClient = (ui: string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | React.JSX.Element | null | undefined) => {
//   const queryClient = createTestQueryClient();
//   return render(
//       <QueryClientProvider client={queryClient}>
//         <ProductList />
//       </QueryClientProvider>
//   );
// };

// test('fetches and displays product data', async () => {
//   renderWithClient(<ProductPage id="123" />);

//   expect(screen.getByText('Loading...')).toBeInTheDocument();

//   await waitFor(() => expect(screen.getByText('Sample Product')).toBeInTheDocument());

//   expect(screen.getByText('This is a sample product.')).toBeInTheDocument();
// });

// test('displays error message on fetch failure', async () => {
//   server.use(
//     rest.get('/api/product/:id', (req, res, ctx) => {
//       return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
//     })
//   );

//   renderWithClient(<ProductPage id="123" />);

//   await waitFor(() => expect(screen.getByText('Error: Error fetching product data')).toBeInTheDocument());
// });
describe('Home page', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
        <QueryClientProvider client={queryClient}>
         <Providers>
          <ProductList />
          </Providers> 
        </QueryClientProvider>
    );
  });
});