const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes')
const session = require('express-session');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const multer = require('multer');
const { s3Uploadv2 } = require('./s3Service');
require("dotenv").config();

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*serve by templates*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*serve static files*/
app.use(express.static("assets"));
app.use(express.static("uploads"));
app.use(express.static("proofs"));

/*for user*/
app.use('/', routes);
app.use('/apply', routes);
app.use('/register', routes);
/*for admin*/
app.use('/dashboard', routes);
app.use('/admin_form', routes);
app.use('/admin_apply', routes);
app.use('/data_analytics', routes);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype.split("/")[0] === "image"){
//         cb(null, true);
//     }
//     else{
//         cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
//     }
// }

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 1000000000, files: 2 }
//  });

// app.post("/update_user_by_id", upload.array("file"), async (req, res) => {
//     // const file = req.file;
//     console.log(req.files)
//     // const result = await s3Uploadv2(file);
//     res.json({ status: "success"});
// });

app.listen(port, () => {
    console.log('http://localhost:3000');
})