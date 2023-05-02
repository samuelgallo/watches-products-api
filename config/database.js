const mongoose = require("mongoose");

const uri = process.env.MONGO_URL;
const dbServer = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected successfully");
};

dbServer().catch((err) => console.log(err));

module.exports = dbServer;
