// Import the necessary testing utilities
import { render } from '@testing-library/react';
import Home from '../app/page'; // Assuming your homepage is in pages/index.js

// Test suite for the Home page
describe('Home page', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Home />);
    expect(getByText('This is champs e commerce Homepage')).toBeDefined();
  });
});
