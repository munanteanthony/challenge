const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port= 3000  || process.env.PORT ;
const app = express();


app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/routes.js")(app);


app.listen(port, () => {
  console.log(`Server funcionando en el puerto ${port}.Presione Ctrl+C para detenerlo.`);
});
