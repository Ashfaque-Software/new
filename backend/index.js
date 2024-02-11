// index.js
const express = require("express");
const cors= require("cors")
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { noteRouter } = require("./routes/noteRoutes");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", noteRouter);

app.get("/", (req, res) => {
    res.send("Home Page");
});

connection
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error("MongoDB connection failed:", error.message);
    });
