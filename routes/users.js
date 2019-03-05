var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.get('/created', (req, res, next) => {
  res.render('created', {
    data: res
  });
});

module.exports = router;
