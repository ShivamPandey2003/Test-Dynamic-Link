import mongoose from "mongoose";
import { DB_URI } from ".";

const ConnectToMongo = () => {
  mongoose.connect(DB_URI);
  mongoose.connection.once("open", () => {
    console.log("connect to DataBase");
  });
  mongoose.connection.on("error", () => {
    console.log("something is wrong to connect with database");
    process.exit();
  });
};

export default ConnectToMongo;
