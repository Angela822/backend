var express = require('express');
var router = express.Router();
//var mysql = require('mysql');

//------------------
// 載入資料庫連結
//-----------------
var pool = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
   pool.query('select * from book', function (error, results, fields) {
        if (error){
            res.render('discuss', {data:[]});
        }else{
            res.render('discuss', {data:results});
        }       
    });
});

module.exports = router;
