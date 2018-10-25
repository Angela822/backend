var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/mangerIndex');
var usersRouter = require('./routes/users');

//-------------------------------------------------------
// 增加以下的require(後端)
//-------------------------------------------------------
var moment = require('moment');
var mangerRules = require('./routes/mangerRules');
var OneRule = require('./routes/OneRule');
var ruleDelete = require('./routes/ruleDelete');
var ruleModifyForm = require('./routes/ruleModifyForm');
var ruleModify = require('./routes/ruleModify');
var ruleAddForm = require('./routes/ruleAddForm');
var ruleAdd = require('./routes/ruleAdd');

var bookAddForm = require('./routes/bookAddForm');
var bookAdd = require('./routes/bookAdd');
var bookListByPage = require('./routes/bookListByPage');
var bookListSearchByName = require('./routes/bookListSearchByName');
var bookOneItem = require('./routes/bookOneItem');
var bookUpdateForm = require('./routes/bookUpdateForm');
var bookUpdate = require('./routes/bookUpdate');
var bookDelete = require('./routes/bookDelete');

var mangerAddForm = require('./routes/mangerAddForm');
var mangerAdd = require('./routes/mangerAdd');
var mangerListByPage = require('./routes/mangerListByPage');
var mangerListSearchByName = require('./routes/mangerListSearchByName');
var mangerUpdateForm = require('./routes/mangerUpdateForm');
var mangerUpdate = require('./routes/mangerUpdate');
var mangerDelete = require('./routes/mangerDelete');

var login = require('./routes/login');
var loginSuccess = require('./routes/loginSuccess');
var loginFail = require('./routes/loginFail');
var logout = require('./routes/logout');
//-------------------------------------------------------


var app = express();

//-----------------------------------------
// 增加使用session及uuid
//-----------------------------------------
var session=require('express-session');
var uuid=require('uuid');

app.use(session({
    genid:function(req){
        return uuid.v1();
    },
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
}));
//-----------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//-------------------------------------------------------
// 增加以下的app.use() 後端
//-------------------------------------------------------
app.use('/mangerRules', mangerRules);
app.use('/OneRule', OneRule);
app.use('/ruleDelete', ruleDelete);
app.use('/ruleModifyForm', ruleModifyForm);
app.use('/ruleModify', ruleModify);
app.use('/ruleAddForm', ruleAddForm);
app.use('/ruleAdd', ruleAdd);

app.use('/bookAddForm', bookAddForm);
app.use('/bookAdd', bookAdd);
app.use('/bookListByPage', bookListByPage);
app.use('/bookListSearchByName', bookListSearchByName);
app.use('/bookOneItem', bookOneItem);
app.use('/bookUpdateForm', bookUpdateForm);
app.use('/bookUpdate', bookUpdate);
app.use('/bookDelete', bookDelete);

app.use('/mangerAddForm', mangerAddForm);
app.use('/mangerAdd', mangerAdd);
app.use('/mangerListByPage', mangerListByPage);
app.use('/mangerListSearchByName', mangerListSearchByName);
app.use('/mangerUpdateForm', mangerUpdateForm);
app.use('/mangerUpdate', mangerUpdate);
app.use('/mangerDelete', mangerDelete);

app.use('/login', login);
app.use('/loginSuccess', loginSuccess);
app.use('/loginFail', loginFail);
app.use('/logout', logout);

//-------------------------------------------------------


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

//-------------------------------------------------------
// 增加以下的function
//-------------------------------------------------------
app.locals.myDateFormat = function(date){
  return moment(date).format('YYYY-MM-DD');
};

module.exports = app;
