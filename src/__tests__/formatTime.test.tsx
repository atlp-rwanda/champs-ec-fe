// eslint-disable-next-line import/extensions
import { formatTime } from '@/utils/formatTime';

describe('formatTime', () => {
  it('should format the time correctly for a valid Date object', () => {
    const date = new Date('2024-07-08T14:34:56Z');
    const formattedTime = formatTime(date);
    
    // Adjust the expected time based on your local time zone or set the date to UTC.
    const expectedHours = date.getUTCHours().toString().padStart(2, '0');
    const expectedMinutes = date.getUTCMinutes().toString().padStart(2, '0');
    const expectedSeconds = date.getUTCSeconds().toString().padStart(2, '0');
    const expectedTime = `${expectedHours}:${expectedMinutes}:${expectedSeconds}`;

    expect(formattedTime).toBe(expectedTime);
  });

  it('should return "NaN:NaN:NaN" for an invalid date string', () => {
    const invalidDate = 'invalid-date-string';
    const formattedTime = formatTime(invalidDate as any);
    expect(formattedTime).toBe('NaN:NaN:NaN');
  });

  it('should return "NaN:NaN:NaN" for a number input', () => {
    const invalidNumber = 12345;
    const formattedTime = formatTime(invalidNumber as any);
    expect(formattedTime).toBe('NaN:NaN:NaN');
  });

  it('should return "NaN:NaN:NaN" for null input', () => {
    const formattedTime = formatTime(null as any);
    expect(formattedTime).toBe('NaN:NaN:NaN');
  });

  it('should return "NaN:NaN:NaN" for undefined input', () => {
    const formattedTime = formatTime(undefined as any);
    expect(formattedTime).toBe('NaN:NaN:NaN');
  });
});
