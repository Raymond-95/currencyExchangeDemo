export const getDateRange = (monthsToDeduct: number) => {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setMonth(today.getMonth() - monthsToDeduct);

  // Format as YYYY-MM-DD
  return {
    startDate: pastDate.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
  };
};
