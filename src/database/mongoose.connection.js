const mongoose = require("mongoose");

const connect = async () => {
  const connectionString = process.env.DB;
  if (connectionString) {
    try {
      await mongoose.connect(connectionString, {});
      console.log("db connected");
    } catch (error) {
      console.log("error while connecting to db", error);
    }
  } else {
    console.log("Connection string is missing.");
  }
};

connect();
