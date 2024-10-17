import { convertBaseToTarget, convertTargetToBase } from './conversionUtils';

describe('Currency Conversion Functions', () => {
  describe('convertBaseToTarget', () => {
    test('should convert base amount correctly', () => {
      const baseAmount = 100;
      const currentRate = 1.5;

      const result = convertBaseToTarget(baseAmount, currentRate);

      expect(result).toBe('150.00');
    });

    test('should return empty string when currentRate is 0', () => {
      const baseAmount = 100;
      const currentRate = 0;

      const result = convertBaseToTarget(baseAmount, currentRate);

      expect(result).toBe('');
    });
  });

  describe('convertTargetToBase', () => {
    test('should convert target amount correctly', () => {
      const targetAmount = 150;
      const currentRate = 1.5;

      const result = convertTargetToBase(targetAmount, currentRate);

      expect(result).toBe('100.00');
    });

    test('should return empty string when currentRate is 0', () => {
      const targetAmount = 150;
      const currentRate = 0;

      const result = convertTargetToBase(targetAmount, currentRate);

      expect(result).toBe('');
    });
  });
});
