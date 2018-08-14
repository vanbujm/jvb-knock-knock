import { isTriangle, calcTriangleType, triangleType } from '../triangle-type';

describe('isTriangle', () => {
  test('it returns true when sides make a triangle', () => {
    const aNum = 1;
    const bNum = 1;
    const cNum = 1;
    expect(isTriangle(aNum, bNum, cNum)).toBe(true);
  });

  test('it returns false when a side is too large', () => {
    const aNum = 1;
    const bNum = 100;
    const cNum = 1;
    expect(isTriangle(aNum, bNum, cNum)).toBe(false);
  });

  test('it returns false when a sides are negative', () => {
    const aNum = -1;
    const bNum = -1;
    const cNum = -1;
    expect(isTriangle(aNum, bNum, cNum)).toBe(false);
  });
});

describe('calcTriangleType', () => {
  test('it returns Equilateral all sides are equal', () => {
    const aNum = 1;
    const bNum = 1;
    const cNum = 1;
    expect(calcTriangleType(aNum, bNum, cNum)).toBe('Equilateral');
  });

  test('it returns Isosceles when only two sides are equal', () => {
    const aNum = 1;
    const bNum = 1;
    const cNum = 3;
    expect(calcTriangleType(aNum, bNum, cNum)).toBe('Isosceles');
  });

  test('it returns Scalene when no sides are equal', () => {
    const aNum = 1;
    const bNum = 2;
    const cNum = 3;
    expect(calcTriangleType(aNum, bNum, cNum)).toBe('Scalene');
  });
});

const req = {
  query: undefined,
};

const status = jest.fn();
const json = jest.fn();
const res = {
  status,
  json,
};

describe('triangleType', () => {

  beforeEach(() => {
    status.mockReturnValue(res);
    json.mockReturnValue(res);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it returns Equilateral when all sides are equal', () => {
    req.query = { a: '1', b: '1', c: '1' };
    triangleType(req, res);
    expect(json.mock.calls[0][0]).toBe('Equilateral');
  });

  test('it returns Scalene when all sides are different', () => {
    req.query = { a: '3', b: '4', c: '5' };
    triangleType(req, res);
    expect(json.mock.calls[0][0]).toBe('Scalene');
  });

  test('it returns Isosceles when only two sides are the same', () => {
    req.query = { a: '3', b: '2', c: '3' };
    triangleType(req, res);
    expect(json.mock.calls[0][0]).toBe('Isosceles');
  });

  test('it returns Error when lengths can not form a triangle', () => {
    req.query = { a: '1', b: '1', c: '100' };
    triangleType(req, res);
    expect(json.mock.calls[0][0]).toBe('Error');
  });

  test('it returns Error when lengths can not form a triangle', () => {
    const giantNumberString = `${Number.MAX_SAFE_INTEGER + 1}`;
    req.query = { a: giantNumberString, b: giantNumberString, c: giantNumberString };
    triangleType(req, res);
    expect(status.mock.calls[0][0]).toBe(400);
    expect(json.mock.calls[0][0]).toEqual({"message": "The request is invalid."});
  });
});