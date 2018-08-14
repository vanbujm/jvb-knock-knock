import { uniq } from 'lodash/array'
import { isADecimal, isNaN } from '../util/number-parsing';
import { invalidRequest } from '../util/error-handling';

export const isTriangle = (aNum, bNum, cNum) => {
  return (aNum + bNum > cNum) && (aNum + cNum > bNum) && (bNum + cNum > aNum)
};

export const calcTriangleType = (aNum, bNum, cNum) => {
  switch (uniq([aNum, bNum, cNum]).length)  {
    case 1:
      return "Equilateral";
    case 2:
      return "Isosceles";
    case 3:
      return "Scalene";
  }
};

export const triangleType = (req, res) => {
  const {a: aSide, b: bSide, c: cSide} = req.query;
  const invalid = [aSide, bSide, cSide].some((side) => isADecimal(side) || isNaN(side));

  if(invalid) return invalidRequest(res);

  const aNum = Number(aSide);
  const bNum = Number(bSide);
  const cNum = Number(cSide);

  const sideTooBig = [aNum, bNum, cNum].some((num) => !Number.isSafeInteger(num));
  if(sideTooBig) return invalidRequest(res);

  if(!isTriangle(aNum, bNum, cNum)) return res.json('Error');

  return res.json(calcTriangleType(aNum, bNum, cNum))
};

export default triangleType;
