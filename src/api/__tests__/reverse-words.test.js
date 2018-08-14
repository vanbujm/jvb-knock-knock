import reverseWords from '../reverse-words';

const req = {
  query: undefined,
};

const status = jest.fn();
const json = jest.fn();
const send = jest.fn();
const header = jest.fn();
const res = {
  status,
  json,
  send,
  header
};

describe('reverseWords', () => {

  beforeEach(() => {
    status.mockReturnValue(res);
    json.mockReturnValue(res);
    send.mockReturnValue(res);
    header.mockReturnValue(res);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it returns an empty string when sentence is undefined', () => {
    req.query = { sentence: undefined };
    reverseWords(req, res);
    expect(json.mock.calls[0][0]).toBe('');
  });

  test('it reverses a single word', () => {
    req.query = { sentence: 'test' };
    reverseWords(req, res);
    expect(json.mock.calls[0][0]).toBe('tset');
  });

  test('it reverses multiple words but preserves word order', () => {
    req.query = { sentence: 'test word' };
    reverseWords(req, res);
    expect(json.mock.calls[0][0]).toBe('tset drow');
  });

  test('it 404s after 1508 characters', () => {
    let bigString = '';
    for(let i=0; i < 1508; i++) {
      bigString += 'a'
    }
    bigString += 'a';
    req.query = { sentence: bigString };
    reverseWords(req, res);
    expect(status.mock.calls[0][0]).toBe(404);
    expect(header.mock.calls[0][0]).toEqual({ 'Content-Type': 'text/html' });
    expect(send.mock.calls[0][0]).toBe('The resource you are looking for has been removed, had its name changed, or is temporarily unavailable.');
  });
});