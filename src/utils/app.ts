export const classNames = (...classes: any): string => {
  return classes.filter(Boolean).join(" ");
};

export const calculatePercentage = (
  target_donation_amount: number,
  donated_amount: number
): number => {
  const percentage = (donated_amount / target_donation_amount) * 100;
  return Math.round(percentage);
};

export const generateNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
