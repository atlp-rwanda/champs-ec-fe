// src/__tests__/RootLayout.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '../app/layout';
import ClientProvider from '../app/clientProvider';
import Providers from '../app/providers';
jest.mock('../app/clientProvider', () => ({ children }: { children: React.ReactNode }) => (
  <div data-testid="client-provider">{children}</div>
));
jest.mock('../app/providers', () => ({ children }: { children: React.ReactNode }) => (
  <div data-testid="providers">{children}</div>
));
describe('RootLayout', () => {
  it('renders children and includes Providers and ClientProvider', () => {
    const { getByText, getByTestId } = render(
        <RootLayout>
          <div>Test Child</div>
        </RootLayout>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
    expect(getByTestId('providers')).toBeInTheDocument();
    expect(getByTestId('client-provider')).toBeInTheDocument();
  });
});
