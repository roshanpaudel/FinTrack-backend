import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({
    message: "We are Live",
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server Running at http://localhost:${PORT}`);
});
