require("dotenv").config();

const config = {
  database: {
    url: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  server: {
    port: process.env.PORT || 5000,
    host: "localhost"
  },
  cors: {
    origin: "http://localhost:5000",
    credentials: true
  }
};

module.exports = config;
