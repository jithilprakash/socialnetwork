const express = require("express");
const app = express();
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

//Connect DB
connectDB();

//apply middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API RUNNING");
});

//Define Routes

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
