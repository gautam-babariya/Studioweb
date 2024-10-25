const express = require("express");
const app = express();
const port = 5500;
const Addvideo = require('./model/addvideo');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload')
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const addvideo = require("./model/addvideo");
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// cors code 
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// mongo connection..........................
const mongourl = process.env.MONGODB_DATABASE_URL;
const connect = async () => {
    try {
        const database = await mongoose.connect(mongourl)
        console.log("mongo conneted!");
    } catch (error) {
        console.log("error mongo" + error);
    }
}
connect();

// cloudinary configuration 
const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const cloud_key = process.env.CLOUDINARY_API_KEY;
const cloud_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
    cloud_name: cloud_name,
    api_key: cloud_key,
    api_secret: cloud_secret
});


app.use(fileupload({
    useTempFiles: true
}))
app.get('/getvideo', async (req, res) => {
    Addvideo.find().then(productdata => res.json(productdata.reverse()))
        .catch(err => console.log(err))
})
app.get('/', async (req, res) => {
    res.send("done");
})

app.post('/addvideo', async (req, res) => {
    try {
        const title = req.body.title;
        const type = req.body.type;
        const description = req.body.description;
        const video = req.body.video;
        const poster = req.body.poster;
        var addvideo = new Addvideo({
            type,
            video,
            title,
            poster,
            description,
        });
        await addvideo.save();
        res.status(201).json(1);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Servers Error');
    }
});

// listening port..........................
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

