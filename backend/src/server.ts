// import env from "dotenv";
// env.config();
import app  from "./app";
import "dotenv/config";
import mongoose from "mongoose";
import env from "./util/validateEnv";

const port = env.PORT || 6000;

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
  console.log("Mongoose Connected");
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}).catch((err) => {
  console.log(err);
});
