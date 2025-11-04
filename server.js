import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try{
        const response = await axios.get("https://api.frankfurter.dev/v1/latest?symbols=USD,EUR,JPY,GBP,AUD,CAD,CHF,MXN,HKD,NZD");
        res.render("index.ejs", {content: response.data});
    } catch(error){
        console.log(error.response.data);
        res.status(500);
    }
})

app.listen(port, (req, res) => {
    console.log(`Listening at port ${port}`);
})