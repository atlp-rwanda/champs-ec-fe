
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Page from '@/app/sellers/orders/page';
import { useQuery } from "@tanstack/react-query";
import Providers from "@/app/providers";
// Mock the SellerOrderList component
jest.mock("@/components/sellerOrder", () => () => <div>SellerOrderList Component</div>);



// Mock the SellerOrderList component
jest.mock("@/components/sellerOrder", () => () => <div>SellerOrderList Component</div>);
jest.mock('next/navigation', () => ({
    useRouter() {
      return {
        prefetch: () => null,
      };
    },
    useSearchParams: () => ({
        get: () => { }
      })
  }));
// Create a QueryClient instance for testing

const Test = () => {
    const { data } = useQuery<any>({
      queryKey: ['test'],
      queryFn: () => 'test',
    });
    return <div>{data}</div>;
  };
  
  it('renders children', async () => {
    const { findByText } = render(
      <Providers>
        <Test />
      </Providers>
    );
    expect(await findByText('test')).toBeInTheDocument();
  });



it("renders SellerOrderList component", () => {
  render(<Page />);
  const element = screen.getByText("SellerOrderList Component");
  expect(element).toBeInTheDocument();
});

