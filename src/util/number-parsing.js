export const isADecimal = (numberString) => numberString.includes('.');
export const isNaN = (numberString) => Number.isNaN(Number(numberString));

export default { isADecimal, isNaN };