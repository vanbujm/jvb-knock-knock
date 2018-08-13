import fibonacciCalculator from './fibonacci-cache';

const fibonacci = (req, res) => {
  let nValue = Number(req.query.n);
  const isANumber = !Number.isNaN(nValue);
  if (!isANumber) return res.status(400).json({ 'message': 'The request is invalid.' });
  if (Math.abs(nValue) > 92) return res.status(400).send();
  // the number could be a big int, got to convert the stringified json into a number as JS can't handle it
  return res.send(JSON.stringify(fibonacciCalculator(nValue)).replace(/"/g, ''));
};

export default fibonacci;
