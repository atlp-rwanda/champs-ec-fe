import React from 'react';
import { render } from '@testing-library/react';
import ProductList from '@/components/ProductList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // Adjust the import based on your project structure

const queryClient = new QueryClient();

describe('Home page', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ProductList searchResults={[]} />
        </QueryClientProvider>
      </Provider>
    );

    // Add any assertions or further interactions with the rendered component if needed
  });
});
