import { getFormattedDate, getDateMinusDays } from '../util/date'; // Replace with the correct path

describe('Date Utility Functions', () => {
  describe('getFormattedDate', () => {
    it('should return the formatted date string in yyyy-mm-dd format', () => {
      const date = new Date('2023-10-20T12:00:00.000Z');
      const formattedDate = getFormattedDate(date);
      expect(formattedDate).toBe('2023-10-20');
    });

    it('should handle dates with different timezones', () => {
      const date = new Date('2023-10-20T00:00:00.000Z'); // UTC midnight
      const formattedDate = getFormattedDate(date);
      expect(formattedDate).toBe('2023-10-20');
    });
  });

});
