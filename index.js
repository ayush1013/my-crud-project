const express = require("express");
const { connection } = require("./config/db");
const {userRouter } = require("./routes/userRoute");
const {notesRouter} = require("./routes/notesRouter");
const {authanticate} = require("./middlewares/authanticate");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome");
})

app.use("/user", userRouter);

app.use(authanticate);

app.use("/note", notesRouter)

// app.get("/data", (req, res) => {
//     const token = req.headers.token;
//     jwt.verify(token, "masai", (err, decoded)=>{
//         if(err){
//             res.send("Invalid token");
//             console.log(err);
//         }else{
//             res.send("Data...")
//         }
//     })
//     console.log(req.headers);
// })

// app.get("/cart", (req, res) => {
//     const token = req.headers.token;
//     jwt.verify(token, "masai", (err,decoded)=>{
//         if(err){
//             res.send("Invalid token");
//             console.log(err);
//         }else{
//             res.send("Data...")
//         }
//     })
// })

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to the database")
    } catch (err) {
        console.log("Error while connecting to the database");
        console.log(err);
    }
    console.log(`This server is running at port ${process.env.port}`)
})