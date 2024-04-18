const config = require("./utlis/config");
const mongoose = require("mongoose");
const app = require("./server");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("connected to DB successfully...");
    app.listen(config.PORT, () =>
      console.log(`Server running at http://localhost:${config.PORT}`)
    );
  })
  .catch((err) => {
    console.log("DB connection failed...", err);
  });
