import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ProfilePage from '@/app/(profile)/profile/page';
import UserProfileForm from '@/app/(profile)/profile-edit/page';
import { store } from '@/redux/store';

// Mock the useRouter function from next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const queryClient = new QueryClient();

describe('Profile Page Test', () => {


  it('renders the user profile form', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <UserProfileForm />
          </QueryClientProvider>
        </Provider>
      );
    });

    
  });
});
