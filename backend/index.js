"use strict";

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

//Connection mongodb
connectDB();

const readRoute = require("./Routes/Read");
const createRout = require("./Routes/Create");
const updateRoute = require("./Routes/Update");
const DeleteRoute = require("./Routes/Delete");
//Initialisation d'express
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json());
app.use("/bulletin/update", updateRoute);
app.use("/bulletin/read", readRoute);
app.use("/bulletin/create", createRout);
app.use("/bulletin/delete", DeleteRoute);

//Utilisation des fichiers statiques
app.use("/image", express.static(path.resolve(__dirname, "Images")));
app.use("/fichier", express.static(path.resolve(__dirname, "Fichiers")));

// Error Handler  ()
app.use(function(err, req, res, next){
    console.log(err);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server running " + PORT));
