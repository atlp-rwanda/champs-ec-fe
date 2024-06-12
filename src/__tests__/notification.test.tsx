import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));
