const express = require("express");
const http = require("http");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

const { verifyJWT } = require("./middleware/tokenMiddleware");

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const authRoute = require("./routes/authRoutes");
const { connectDB } = require("./dbConnection");

app.use(helmet());
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  const publicRoutes = ["/login", "/callback"];
  if (publicRoutes.includes(req.path)) return next();
  return verifyJWT(req, res, next);
});

app.use("/", authRoute);

connectDB();

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
