// WishlistOverlay.test.js

import { renderHook, act } from '@testing-library/react';
import ReviewPopup from '@/hooks/reviewPopup';

describe('ReviewPopup', () => {
  it('should initialize with isOpen as false', () => {
    const { result } = renderHook(() => ReviewPopup());
    
    expect(result.current.isReviewPopupOpen).toBe(false);
  });

  it('should toggle isOpen when toggleReviewPopup is called', () => {
    const { result } = renderHook(() => ReviewPopup());

    expect(result.current.isReviewPopupOpen).toBe(false);

    act(() => {
      result.current.toggleReviewPopup();
    });

    expect(result.current.isReviewPopupOpen).toBe(true);

    act(() => {
      result.current.toggleReviewPopup();
    });

    expect(result.current.isReviewPopupOpen).toBe(false);
  });
});
