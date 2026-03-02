import app from "./app.js";

const PORT = process.env.PORT || 8000;

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server Running at http://localhost:${PORT}`);
});
