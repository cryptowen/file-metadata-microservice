require('dotenv').config();
var express = require('express'),
    multer  = require('multer'),
    nunjucks = require("nunjucks");

var app = express()
app.use(multer({ dest: './uploads/'}).single('the-file'))

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

app.get('/', function(req, res) {
  res.render('index.html', {app_url: process.env.APP_URL});
});

app.post('/api/fileanalyse', function(req, res){
    console.log(req.body) // form fields
    console.log(req.file) // form files
    console.log(req.file.size) // form files
    // res.end(req.file.size.toString());
    res.json({ fileSize: req.file.size });
});

app.listen(process.env.PORT, function(){
  console.log('Server start, listen on ' + process.env
  .IP + ':' + process.env.PORT);
});
