require("dotenv").config();
const config = require("./config/config")[
  process.env.NODE_ENV || "development"
];
const app = require("./src/app");

app.listen(config.APP_PORT, () => {
  console.log("server running on http://localhost:5000");
});
