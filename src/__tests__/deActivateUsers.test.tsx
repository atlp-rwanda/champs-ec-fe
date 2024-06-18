import React from 'react';
import { render } from '@testing-library/react';
import ReactQueryProvider from '../utils/ReactQueryProvider';
import '@testing-library/jest-dom';

describe('ReactQueryProvider', () => {
  it('renders children within QueryClientProvider', () => {
    const TestComponent: React.FC = () => <div>Test Component</div>;
    const { getByText } = render(
      <ReactQueryProvider>
        <TestComponent />
      </ReactQueryProvider>
    );
    expect(getByText('Test Component')).toBeInTheDocument();
  });
});
