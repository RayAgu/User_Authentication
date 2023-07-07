const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const router = require("./router/router")


const app = express();
app.use(express.json());
app.use(router)

const PORT = (process.env.PORT)

app.listen(PORT, () => {
    console.log( `app is listening to port ${PORT}`)
})

mongoose.connect(process.env.url).catch( (error) =>{
    console.log(error.message)
}).then( () =>{
    console.log("Connection to the database is successful")
})