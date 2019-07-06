// eslint-disable-next-line no-unused-vars
const handleInvalidToken = ((err, req, res, next) => {
  if (err) {
    console.error(err);
  }
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ status: 'invalid token' });
  }
  next();
});

module.exports = handleInvalidToken;
