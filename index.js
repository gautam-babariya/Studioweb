const express = require("express");
const app = express();
const port = 5500;
const Addvideo = require('./model/addvideo');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const fileupload = require('express-fileupload')
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// cors code 
var cors = require('cors')
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

 

// mongo connection..........................
const connect = async () => {
    try {
        // const database = await mongoose.connect('mongodb+srv://sastaolx123:Vg9mi8oQk3rwIkIC@mycluster.ska5aw9.mongodb.net/project')
        const database = await mongoose.connect('mongodb+srv://gosaikaran:karangosai123@cluster0.gwppsu5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/webpage')
        console.log("mongo conneted!");
    } catch (error) {
        console.log("error mongo" + error);
    }
}
connect();

// cloudinary configuration 
cloudinary.config({
    cloud_name: 'dz5i819gv',
    api_key: '259874827789269',
    api_secret: 'WzTgb3gojP-ITl1T5-pU_Fa-tzc'
});

app.use(fileupload({
    useTempFiles: true
}))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/getvideo', async (req, res) => {
    Addvideo.find().then(productdata => res.json(productdata))
        .catch(err => console.log(err))
})
app.get('/', async (req, res) => {
   res.send("done");
})

app.post('/addvideo',async (req, res) => {
    try {
        const uniquePublicId = `video_${Date.now()}`;
        var video;
      await  cloudinary.uploader.upload(req.files.video.tempFilePath,
        { resource_type: "video",
          public_id: uniquePublicId
        }).then((data) => {
            video = data.secure_url;
            console.log(data.secure_url);
        }).catch((err) => {
          console.log(err)
        });

        const title = req.body.title;
        const type = req.body.type;
        const description = req.body.description;
        const addvideo = new Addvideo({
            type,
            video,
            title,
            description,
        });
        // await addvideo.save();
        res.status(201).json(1);
    } catch (error) {
        console.error(error);
        // res.status(500).send('Internal Server Error');
        res.send("ok");
    }
});



// listening port..........................
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
