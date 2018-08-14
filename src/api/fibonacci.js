import { isADecimal, isNaN } from '../util/number-parsing';
import { invalidRequest } from '../util/error-handling';
import fibonacciCalculator from './fibonacci-cache';

const convertIntStringToJsonInt = (intString) => JSON.stringify(intString).replace(/"/g, '');

const fibonacci = (req, res) => {
  const { n } = req.query;
  const nValue = Number(n);

  if (isNaN(n)) return invalidRequest(res);
  if (isADecimal(n)) return invalidRequest(res);
  if (Math.abs(nValue) > 92) return res.status(400).send();
  // the number could be a big int, got to convert the stringified json into a number as JS can't handle it
  const potentialBigInt = convertIntStringToJsonInt(fibonacciCalculator(nValue));
  return res.send(potentialBigInt);
};

export default fibonacci;
