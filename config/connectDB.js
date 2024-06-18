// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('MongoDB Connected');
//   } catch (err) {
//     console.error('MongoDB Connection Failed', err.message);
//     // Exit process with failure
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Thay vì poolSize, sử dụng maxPoolSize
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB Connected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB Connection Error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB Disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB Connection Closed');
      process.exit(0);
    });

  } catch (err) {
    console.error('MongoDB Connection Failed', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

