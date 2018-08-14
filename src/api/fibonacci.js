import fibonacciCalculator from './fibonacci-cache';

const convertIntStringToJsonInt = (intString) => JSON.stringify(intString).replace(/"/g, '');

const fibonacci = (req, res) => {
  const nValue = Number(req.query.n);
  const isNaN = Number.isNaN(nValue);
  const isADecimal = req.query.n.includes('.');
  const inValidRequest = res.status(400).json({ 'message': 'The request is invalid.' });

  if (isADecimal) return inValidRequest;
  if (isNaN) return inValidRequest;
  if (Math.abs(nValue) > 92) return res.status(400).send();
  // the number could be a big int, got to convert the stringified json into a number as JS can't handle it
  const potentialBigInt = convertIntStringToJsonInt(fibonacciCalculator(nValue));
  return res.send(potentialBigInt);
};

export default fibonacci;
