require('dotenv').config();
const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
})