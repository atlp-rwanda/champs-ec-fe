import { averageReviews } from '../utils/averageReviews'; // Adjust the path based on your project structure
import { ReviewType } from '@/types/Product'; // Assuming this is the correct path to your ReviewType definition

// Mock data for testing
const mockReviews: ReviewType[] = [
  { 
    buyerId: 'buyer1',
    rating: 4,
    feedback: 'Good product',
    userProfile: {
      firstName: 'John',
      lastName: 'Doe',
      profileImage: 'https://example.com/profile.jpg'
    }
  },
  { 
    buyerId: 'buyer2',
    rating: 5,
    feedback: 'Excellent service',
    userProfile: {
      firstName: 'Jane',
      lastName: 'Smith',
      profileImage: 'https://example.com/profile2.jpg'
    }
  },
  { 
    buyerId: 'buyer3',
    rating: 3,
    feedback: 'Could be better',
    userProfile: {
      firstName: 'Michael',
      lastName: 'Johnson',
      profileImage: 'https://example.com/profile3.jpg'
    }
  }
];

describe('averageReviews', () => {
  it('returns 0 for empty reviews array', () => {
    const result = averageReviews([]);
    expect(result).toBe(0);
  });

  it('returns the rating when there is only one review', () => {
    const singleReview = [{ 
      buyerId: 'buyer1',
      rating: 4,
      feedback: 'Good product',
      userProfile: {
        firstName: 'John',
        lastName: 'Doe',
        profileImage: 'https://example.com/profile.jpg'
      }
    }];
    const result = averageReviews(singleReview);
    expect(result).toBe(4);
  });

  it('calculates the average rating correctly', () => {
    const result = averageReviews(mockReviews);
    // Average of [4, 5, 3] is 4
    expect(result).toBe(4);
  });

  it('handles reviews with decimal ratings', () => {
    const reviewsWithDecimals: ReviewType[] = [
      { 
        buyerId: 'buyer1',
        rating: 3.5,
        feedback: 'Good but can improve',
        userProfile: {
          firstName: 'Alice',
          lastName: 'Jones',
          profileImage: 'https://example.com/profile4.jpg'
        }
      },
      { 
        buyerId: 'buyer2',
        rating: 4.5,
        feedback: 'Very satisfied',
        userProfile: {
          firstName: 'Bob',
          lastName: 'Brown',
          profileImage: 'https://example.com/profile5.jpg'
        }
      }
    ];
    const result = averageReviews(reviewsWithDecimals);
    // Average of [3.5, 4.5] is 4
    expect(result).toBe(4);
  });

  // Add more test cases as needed for edge cases
});
