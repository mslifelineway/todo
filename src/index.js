const dotEnv = require("dotenv");

dotEnv.config();

const bodyParser = require("body-parser");
require("./database/mongoose.connection");

const taskRouter = require("./routes/task.route");
const authRouter = require("./routes/user.route");

const express = require("express");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/tasks", taskRouter);
app.use("/auth", authRouter);

app.listen(port, (req, res) => {
  console.log(`server is listening on ${port}`);
});
