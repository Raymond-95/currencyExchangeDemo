import { getDateRange } from './dateUtils';

describe('getDateRange', () => {
  test('should return correct date range for 6 months deduction', () => {
    const monthsToDeduct = 6;
    const { startDate, endDate } = getDateRange(monthsToDeduct);

    const today = new Date();
    const expectedEndDate = today.toISOString().split('T')[0];

    const pastDate = new Date(today);
    pastDate.setMonth(today.getMonth() - monthsToDeduct);
    const expectedStartDate = pastDate.toISOString().split('T')[0];

    expect(startDate).toBe(expectedStartDate);
    expect(endDate).toBe(expectedEndDate);
  });
});
