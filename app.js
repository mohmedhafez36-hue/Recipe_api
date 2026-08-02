require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./config/db");
const morgan = require("morgan");

const routes = require("./routes/index");

const PORT = process.env.PORT || 3000

const errorHandler = require("./middlewares/error");

app.use(express.json());
app.use(morgan("dev"));

connectDB();


app.use("/api", routes);
app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
});

app.use(errorHandler);



