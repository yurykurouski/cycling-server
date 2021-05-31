module.exports = (res, error) => {
  res.status(404).json({
    success: false,
    message: error.message ? error.message : error
  });
}