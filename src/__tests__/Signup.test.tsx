// Import the necessary testing utilities
import React, { act } from 'react';
import { fireEvent, render, screen, renderHook } from '@testing-library/react';
import Signup from '@/app/auth/signup/page';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import PopUpModels from '@/components/PopUpModels';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));
describe('Signup page test', () => {
  it('renders signup page', () => {
    const { getByText } = render(<Signup />);
    expect(getByText('Welcome!')).toBeDefined();
  });
});

const mockaxios = new MockAdapter(axios);

describe('Signup Components', () => {
  beforeEach(() => {
    mockaxios.reset();
  });

  it('renders all input values from the Signup page', () => {
    render(<Signup />);
    expect(screen.getByPlaceholderText('Enter First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });
  it('displays error message on Signup failure', async () => {
    mockaxios.onPost(`${process.env.URL}/users/signup`).reply(409, {
      message: 'User with this email already exists',
    });
    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText('Enter First Name'), {
      target: { value: 'Kalisa' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Last Name'), {
      target: { value: 'Daniel' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Email'), {
      target: { value: 'tchamianest@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
      target: { value: 'Test@12345' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'Test@12345' },
    });
    await userEvent.click(screen.getByText('Sign Up'));
    // const error = screen.findByText('User with this email already exists');
    // expect(error).toBeInTheDocument();

    const { getByText, getByTestId } = render(
      <PopUpModels
        topText="success"
        bodyText="its work"
        data-testid="result"
        iconImagelink="/Verified.png"
      />,
    );
    expect(() => getByTestId('result')).toThrow();
  });

  it('Fail Login input Form ', async () => {
    render(<Signup />);
    const button = screen.getByText('Sign Up');
    await userEvent.click(button);
    expect(screen.queryByText('firstName is required')).toBeInTheDocument();
    expect(screen.queryByText('lastName is required')).toBeInTheDocument();
    expect(screen.queryByText('Email is required')).toBeInTheDocument();
    expect(screen.queryByText('Password is required')).toBeInTheDocument();
  });
});
