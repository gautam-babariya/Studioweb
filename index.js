// const express = require("express");
// const app = express();
// const port = 5500;
// const Addvideo = require('./model/addvideo');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const fileupload = require('express-fileupload')
// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const addvideo = require("./model/addvideo");

// // cors code 
// var cors = require('cors');
// app.use(cors())
// // app.use((req, res, next) => {
// //     res.header('Access-Control-Allow-Origin', '*');
// //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// //     res.header('Access-Control-Allow-Headers', 'Content-Type');
// //     next();
// //   });
//   app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
//     res.setHeader('Access-Control-Max-Age', 2592000);
//     next();
// });
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

 

// // mongo connection..........................
// const connect = async () => {
//     try {
//         // const database = await mongoose.connect('mongodb+srv://sastaolx123:Vg9mi8oQk3rwIkIC@mycluster.ska5aw9.mongodb.net/project')
//         const database = await mongoose.connect('mongodb+srv://gosaikaran:karangosai123@cluster0.gwppsu5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/webpage')
//         console.log("mongo conneted!");
//     } catch (error) {
//         console.log("error mongo" + error);
//     }
// }
// connect();

// // cloudinary configuration 
// cloudinary.config({
//     cloud_name: 'dz5i819gv',
//     api_key: '259874827789269',
//     api_secret: 'WzTgb3gojP-ITl1T5-pU_Fa-tzc'
// });

// app.use(fileupload({
//     useTempFiles: true
// }))
// app.get('/getvideo', async (req, res) => {
//     Addvideo.find().then(productdata => res.json(productdata))
//         .catch(err => console.log(err))
// })
// app.get('/', async (req, res) => {
//    res.send("done");
// })

// app.post('/addvideo',async (req, res) => {
//     try {
//         const uniquePublicId = `video_${Date.now()}`;
//         var video;
//       await  cloudinary.uploader.upload(req.files.video.tempFilePath,
//         { resource_type: "video",
//           public_id: uniquePublicId
//         }).then((data) => {
//             video = data.secure_url;
//         }).catch((err) => {
//           console.log(err)
//         });

//         const title = req.body.title;
//         const type = req.body.type;
//         const description = req.body.description;
//         var addvideo = new Addvideo({
//             type,
//             video,
//             title,
//             description,
//         });
//         await addvideo.save();
//         res.status(201).json(1);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Servers Error');
//     }
// });



// // listening port..........................
// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));



// checking my bug

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const path = require('path');


// Cloudinary configuration

cloudinary.config({
    cloud_name: 'delde3vvw',
    api_key: '677662562595255',
    api_secret: 'OtKmdP9jhhYIXObdsuUmVbDCuV4'
});

// Create a new Express application
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// const imageSchema = new mongoose.Schema({
//   url: String,
//   public_id: String,
// });

// const Image = mongoose.model('Image', imageSchema);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Error connecting to MongoDB:', err);
// });

app.get('/', (req, res) => {
    res.send('Hello World!');
  });
// API endpoint for image uploads
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        url = result.secure_url,
            public_id = result.public_id,
            console.log(url);
        console.log(public_id);
        res.json("done he bhai");
    } catch (err) {
        res.status(500).send(err);
    }
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
