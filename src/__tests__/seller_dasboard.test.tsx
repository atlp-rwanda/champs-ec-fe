

// Import the necessary testing utilities
import "@testing-library/jest-dom";
import { fireEvent, render, screen , waitFor} from "@testing-library/react";
import SellerDashboard from '../app/sellers/page'; // Assuming your homepage is in pages/index.js

// Test suite for the Home page
describe('seller dashboard', () => {
  it('it renders seller welcome page', () => {
    const { getByText } = render(<SellerDashboard />);
    expect(getByText('Welcome to champs e commerce Seller Dashboard')).toBeDefined();
  });
});

