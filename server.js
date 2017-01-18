var express = require("express");
var path = require("path");
var fs = require("fs");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.post('/file-size', upload.single('Choose File'), function (req, res, next) {
    res.status(200).json({size: req.file.size, mimetype: req.file.mimetype, encoding: req.file.encoding});
    
    // Delete the file after sending metadata
    fs.unlink(path.join(__dirname, req.file.path));
});

app.listen(process.env.PORT || 8080);