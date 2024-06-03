export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatNumber = (number) => {
  const formattedNumber = number.toFixed(2);
  return formattedNumber

}