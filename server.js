require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Blog CMS Server is Running...");
});

app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});