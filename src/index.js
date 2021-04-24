require('dotenv').config();
const app = require('./app');
const port  = process.env.PORT || 3012

app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
})