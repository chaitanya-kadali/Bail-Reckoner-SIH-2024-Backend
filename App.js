const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose=require('mongoose');
const path = require('path'); // to use __dirname
const session = require('express-session');

require('dotenv').config(); // to access the values .env file

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',  // Allows requests from this frontend url
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
 
// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// MongoDB Atlas Connection
const mongoUri = "mongodb+srv://aayushdb:Ayush123@cluster0.dbb2fbo.mongodb.net/aayushdb?retryWrites=true&w=majority&appName=Cluster0;"

if (!mongoUri) {
    console.error('MongoDB URI not defined in .env file.');
    process.exit(1);
}

mongoose.connect(mongoUri)
.then(() => {

    console.log('Connected to MongoDB Atlas CLOUD !!');

})
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

// mongoose.connect('mongodb://localhost:27017/aayushdb');


// importings of persons

// importing apis
  const chat = require("./routes/chatRoute");
  const district = require("./routes/districtRoute")
  const sendEmail = require("./routes/sendEmailRoute")
  const tokenVerify = require("./routes/tokenVerifyRoute");
  const status = require("./routes/statusRoute");
  const pdfQualityCheck=require("./routes/PdfQualityCheck");
  const verifyQuideline=require("./routes/VerifyQuidelineRoute");
  // const PeerForum=require("./routes/PeerForumRoute");
  const Pdfmanagement=require("./routes/pdfUploadingRoute");

// assigning the persons
  // app.use("/api",farmer);
  // app.use("/api",doctor);
  // app.use("/api",startup);
  // app.use("/api",licensingAuthority);
  // app.use("/api",drugInspector);

// assigning the apis
app.use("/api",chat);
app.use("/api",district);
app.use("/api",sendEmail);


app.use("/api",tokenVerify);
app.use("/api",status);
app.use("/api",pdfQualityCheck);
app.use("/api",verifyQuideline);
// app.use("/api",PeerForum);
app.use("/api",Pdfmanagement);

// Serve the static files (HTML, CSS, JS)
app.use(express.static('public'));
// to display (serve) by default html content ( to make sure that the server is running when HOSTED)
app.get(['/', '/api'], (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.listen(process.env.PORT , () =>{ 
console.log(`Server is running on port ${process.env.PORT}`);
});