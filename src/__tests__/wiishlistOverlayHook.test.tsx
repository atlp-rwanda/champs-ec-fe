// WishlistOverlay.test.js

import { renderHook, act } from '@testing-library/react';
import useWishlistOverlay from '@/hooks/wishlistOverlay';

describe('useWishlistOverlay', () => {
  it('should initialize with isOpen as false', () => {
    const { result } = renderHook(() => useWishlistOverlay());
    
    expect(result.current.isWishlistOverlayOpen).toBe(false);
  });

  it('should toggle isOpen when toggleWishlistSlider is called', () => {
    const { result } = renderHook(() => useWishlistOverlay());

    expect(result.current.isWishlistOverlayOpen).toBe(false);

    act(() => {
      result.current.toggleWishlistSlider();
    });

    expect(result.current.isWishlistOverlayOpen).toBe(true);

    act(() => {
      result.current.toggleWishlistSlider();
    });

    expect(result.current.isWishlistOverlayOpen).toBe(false);
  });
});
