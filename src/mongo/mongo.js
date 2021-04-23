const mongoose = require('mongoose');
console.log(process.env.DB_CONNECTION)
module.exports = async () => {
  await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  return mongoose;
}