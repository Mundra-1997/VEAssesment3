const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Error while connecting to the database', err.message);
  }
};

module.exports = Connection;
