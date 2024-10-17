export const convertBaseToTarget = (
  amount: number,
  currentRate: number
): string => {
  return currentRate ? (amount * currentRate).toFixed(2) : '';
};

export const convertTargetToBase = (
  amount: number,
  currentRate: number
): string => {
  return currentRate ? (amount / currentRate).toFixed(2) : '';
};
