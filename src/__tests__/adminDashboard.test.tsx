import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';
import { useQuery } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import Providers from '@/app/providers';

jest.mock('../components/DashboardHeader', () => jest.fn(() => <div>Mocked DashboardHeader</div>));
jest.mock('../components/UsersAdmin', () => jest.fn(() => <div>Mocked UsersPageAdmin</div>));

const Test = () => {
  const { data } = useQuery<any>({
    queryKey: ['test'],
    queryFn: () => 'test',
  });
  return <div>{data}</div>;
};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: () => ({
    get: () => { }
  })
}));

describe('Testing ReactQueryProvider', () => {
  // it('renders children', async () => {
  //   const { findByText } = render(
  //     <ReactQueryProvider>
  //       <Test />
  //     </ReactQueryProvider>
  //   );
  //   expect(await findByText('test')).toBeInTheDocument();
  // });
  it('renders children', async () => {
    const { findByText } = render(
      <Providers>
        <Test />
      </Providers>
    );
    expect(await findByText('test')).toBeInTheDocument();
  });
});


describe('Dashboard', () => {
  it('renders Dashboard with mocked components', () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText('Mocked DashboardHeader')).toBeInTheDocument()
    expect(getByText('Dashboard')).toBeInTheDocument();
  });

  it('toggles sidebar visibility', () => {
    render(<Dashboard />);
    userEvent.click(screen.getByAltText('Control Button'));
    expect(screen.queryByText('Champs Bay')).toBeInTheDocument();
  });

  // it('handles menu item clicked', () => {
  //   const mockRouter = useRouter();
  //   const { getByText } = render(<Dashboard />);
  //   const userMenuItem = getByText('Users');
  //   userEvent.click(userMenuItem);
  //   expect(AdminDashboard().handleItemClick).toHaveBeenCalledWith(1);
  //   expect(mockRouter.push).toHaveBeenCalledWith('/?page=Users');
  // });
});
