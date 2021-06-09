module.exports = function (data) {
  if (!data || !Array.isArray(data)) return [data];
  return data;
}
