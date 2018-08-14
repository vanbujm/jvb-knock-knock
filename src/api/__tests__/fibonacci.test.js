import fibonacci from '../fibonacci';

const req = {
  query: undefined,
};

const status = jest.fn();
const json = jest.fn();
const send = jest.fn();
const res = {
  status,
  json,
  send,
};

describe('fibonacci', () => {

  beforeEach(() => {
    status.mockReturnValue(res);
    json.mockReturnValue(res);
    send.mockReturnValue(res);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it returns 1 when n is 1', () => {
    req.query = {n: '1'};
    fibonacci(req, res);
    expect(send.mock.calls[0][0]).toBe('1');
  });

  test('it returns an invalid request if n is not a number', () => {
    req.query = {n: 'foo'};
    fibonacci(req, res);
    expect(status.mock.calls[0][0]).toBe(400);
    expect(json.mock.calls[0][0]).toEqual({"message": "The request is invalid."});
  });

  test('it returns an invalid request if n is a double', () => {
    req.query = {n: '13.0'};
    fibonacci(req, res);
    expect(status.mock.calls[0][0]).toBe(400);
    expect(json.mock.calls[0][0]).toEqual({"message": "The request is invalid."});
  });

  test('it returns a large int', () => {
    req.query = {n: '92'};
    fibonacci(req, res);
    expect(send.mock.calls[0][0]).toBe('7540113804746346429');
  });

  test('it 400s after 92', () => {
    req.query = {n: '93'};
    fibonacci(req, res);
    expect(status.mock.calls[0][0]).toBe(400);
    expect(send.mock.calls[0][0]).toBe();
  });

  test('it alternates the sign when n is below 0', () => {
    req.query = {n: '-1'};
    fibonacci(req, res);
    expect(send.mock.calls[0][0]).toBe('1');

    req.query = {n: '-2'};
    fibonacci(req, res);
    expect(send.mock.calls[1][0]).toBe('-1');

    req.query = {n: '-3'};
    fibonacci(req, res);
    expect(send.mock.calls[2][0]).toBe('2');
  })
});