const dotenv = require("dotenv");
const path = require("path");

// Log the current environment
console.log(`Current Environment: ${process.env.NODE_ENV}`);

// Load the appropriate .env file based on the environment
if (process.env.NODE_ENV !== "prod") {
  const configFile = path.resolve(
    __dirname,
    `../../.env.${process.env.NODE_ENV}`
  );
  dotenv.config({ path: configFile });
} else {
  dotenv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
};
