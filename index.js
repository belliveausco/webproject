var express = require('express');
var router = express.Router();
var path = require('path');

// Pass Server-side PORT number to Client-side
router.get('/chat', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public','chat.html'));
});

router.get('/port', function(req, res, next) {
  console.log(process.env.PORT || 3000);
  res.json({port: process.env.PORT || 3000});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
