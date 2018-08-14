const reverseWords = (req, res) => {
  const sentence = req.query.sentence;
  if (sentence === undefined) return res.json('');
  if (sentence.length > 1508) {
    return res
      .header({ 'Content-Type': 'text/html' })
      .status(404)
      .send('The resource you are looking for has been removed, had its name changed, or is temporarily unavailable.');
  }
  const reversedSentence = sentence.split(' ').map((word) => word.split('').reverse().join('')).join(' ');
  res.json(reversedSentence);
};

export default reverseWords;
