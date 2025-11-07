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

app.post("/calculate", async (req, res) => {
    try{
        const from_currency = (req.body.from).toUpperCase();
        const first_response = await axios.get("https://api.frankfurter.dev/v1/latest?symbols=USD,EUR,JPY,GBP,AUD,CAD,CHF,MXN,HKD,NZD");
        const second_response = await axios.get(`https://api.frankfurter.dev/v1/latest?base=${from_currency}`);
        const to_currency = (req.body.to).toUpperCase();
        const from_amount = req.body.from_amount;
        const total = from_amount * second_response.data.rates[`${to_currency}`];
        res.render("index.ejs", {content: first_response.data, total:total});
    } catch (error){
        console.log("Error");
        res.status(500);
    }
})

app.listen(port, (req, res) => {
    console.log(`Listening at port ${port}`);
})