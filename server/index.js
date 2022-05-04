const express = require("express");
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/connection");
const routes = express.Router();
const cors = require("cors");
const path = require("path");
// eslint-disable-next-line no-unused-vars
const authRoutes = require("./routes")(routes);

const app = express();

config();
dbConnect();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(express.json());

app.use("/api", routes);
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
