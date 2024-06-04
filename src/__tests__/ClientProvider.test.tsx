// /test/ClientProvider.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientProvider from '../app/clientProvider';

describe('ClientProvider', () => {
  it('renders children and includes Provider and ToastContainer', () => {
    const { getByText, container } = render(
      <ClientProvider>
        <div>Test Child</div>
      </ClientProvider>
    );

    // Check if the child is rendered
    expect(getByText('Test Child')).toBeInTheDocument();

    // Check if ToastContainer is in the document
    const toastContainer = container.querySelector('.Toastify__toast-container');
    expect(toastContainer).toBeDefined
  });
});
