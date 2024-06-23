import { renderHook, act } from '@testing-library/react';
import OrdersOverlay from '../hooks/ordersOverlay';

jest.setTimeout(15000);

test('initial state of isOrdersOverlayOpen should be false', () => {
    const { result } = renderHook(() => OrdersOverlay()); 
    expect(result.current.isOrdersOverlayOpen).toBe(false);
});
  
test('toggleOrdersSlider should toggle isOrdersOverlayOpen', () => {
    const { result } = renderHook(() => OrdersOverlay());
    expect(result.current.isOrdersOverlayOpen).toBe(false);
    act(() => {
        result.current.toggleOrdersSlider();
    });
    expect(result.current.isOrdersOverlayOpen).toBe(true);
    act(() => {
        result.current.toggleOrdersSlider();
    });
    expect(result.current.isOrdersOverlayOpen).toBe(false);
});

test('setIsOrdersOverlayOpen should set isOrdersOverlayOpen correctly', () => {
    const { result } = renderHook(() => OrdersOverlay());
        expect(result.current.isOrdersOverlayOpen).toBe(false);
        act(() => {
        result.current.setIsOrdersOverlayOpen(true);
    });
    expect(result.current.isOrdersOverlayOpen).toBe(true);
    act(() => {
      result.current.setIsOrdersOverlayOpen(false);
    });
    expect(result.current.isOrdersOverlayOpen).toBe(false);
});
  