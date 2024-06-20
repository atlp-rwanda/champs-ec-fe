import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

jest.mock('next/link', () => {
    return ({ children, href }: any) => {
      return <a href={href}>{children}</a>;
    };
  });
  jest.mock('next/navigation', () => ({
    useRouter() {
      return {
        prefetch: () => null,
      };
    },
  }));

test('renders landing page text', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );
  const textElement = screen.getByText('This is champs e commerce Homepage');
  expect(textElement).toBeInTheDocument();
});

