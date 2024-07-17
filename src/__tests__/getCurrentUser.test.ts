// eslint-disable-next-line import/extensions
import { getCurrentUser } from '../utils/getCurrentUser';

describe('getCurrentUser', () => {
  it('should return the user id when profile is in localStorage', () => {
    const mockProfile = { id: 'user123' };
    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue(JSON.stringify(mockProfile)),
    };

    // Mocking localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      configurable: true,
      writable: true,
    });

    const userId = getCurrentUser();
    expect(userId).toEqual(mockProfile.id);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('profile');
  });

  it('should return null when profile is not in localStorage', () => {
    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue(null),
    };

    // Mocking localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      configurable: true,
      writable: true,
    });

    const userId = getCurrentUser();
    expect(userId).toBeNull();
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('profile');
  });
});
