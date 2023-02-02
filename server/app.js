const express = require('express');
const app = express();
const { urlencoded, json } = require('body-parser');
const errorMiddleWare = require('./middleWare/error');
const cors = require('cors');
const fileUpload = require("express-fileupload");

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(json())
app.use(urlencoded({ extended: true}));
app.use(fileUpload({
    useTempFiles: true
}));

const employee = require("./controllers/employee/employee.route.js");
const team = require("./controllers/team/team.routes.js");

app.use("/api/employee", employee);
app.use("/api/team", team);

app.use(errorMiddleWare);

module.exports = app;