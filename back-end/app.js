var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require("body-parser");
const multer = require('multer');
fs = require('fs');
const EasyDocx = require('node-easy-docx');

var passport = require('passport');

require('./config/passport')(passport);

var usersRouter = require('./routes/users');
var loginRouter = require('./routes/loginRoute');
var registerRouter = require('./routes/registerRoute');
var config = require('./config/config');
var docxRouter = require('./routes/docxRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(config.MongoUri, {useNewUrlParser: true})
.then(() => console.log('Conected to MogonDB'))
.catch(err => console.log('Error in connectin to MongoDB'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('disk storage!!!!!!!!!!', file)
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Request-Method", "*");
  next();
});


app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/docx-convert', docxRouter);


app.post('/uploadfile', upload.single('profile'), (req, res, next) => {
  const file = req.file;
  // path.extname('index.html');
  // let filepath = fs.readFileSync(req.file.path);
  // console.log('@@@@@@@@@@@@ file path @@@@@@@@@@@@', path.extname(file.originalname));
  // // req.file.filename = req.file.filename + path.extname(file.originalname);
  // console.log('@@@@@@@@@@@@ file path @@@@@@@@@@@@', file);
   console.log('session object#############', req.session);
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)

  }
  var parseDocxPath = 'D:/Masters-UMKC/ASE/Project/Express/ASE_Project/back-end/uploads/' + file.filename;
  // console.log('%%%%%%$$$$$$$$$$$$$$', parseDocxPath);
  getJson(parseDocxPath);
  // function parseDocx(value) {
    const easyDocx = new EasyDocx({
      path: parseDocxPath
      // path: 'C:/Users/resume.docx'
      // path: 'https://testbucketase5.s3.us-east-2.amazonaws.com/resume.docx' D:\Masters-UMKC\ASE\Project\Express\ASE_Project\back-end\uploads
    })

    // console.log('easy docx..........%%%%%%$$$$$$$$$$$$$$', easyDocx);
     
    easyDocx.parseDocx()
      .then(data => {
        // JSON data as result
        // console.log('JSON data2222222222!!!!!!!!', data);
        res.send(data);
      })
      .catch(err => {
        console.error(err)
      })
  // }
    //res.send(file)
 
})

function getJson(params) {

  // console.log('easy docx..........%%%%%%$$$$$$$$$$$$$$', params);

  var urlPath = params;
  const easyDocx = new EasyDocx({
    path: urlPath
  })
   
  easyDocx.parseDocx()
    .then(data => {
      // JSON data as result
      // console.log('JSON data2222222222!!!!!!!!', data);
      res.send(data);
    })
    .catch(err => {
      console.error(err)
    })
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
