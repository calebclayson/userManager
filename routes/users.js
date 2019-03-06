var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
let userAry = [];

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users');
});

router.post('/created', (req, res) => {
  (!req.body.id) ? req.body.id = 1: req.body.id = req.body.id;
  for(let i = 0; i < userAry.length; i++) {
    if(req.body.id == userAry[i].id) {
      req.body.id++;
      i--;
    }
  }
  res.render('created', {
    email: req.body.email,
    name: req.body.name,
    id: req.body.id,
    age: req.body.age
  });
  userAry.push(req.body);
});

router.get('/all', (req, res) => {
  res.render('userList', {data: userAry});
});

router.get('/edit/:id', (req, res) => {
  let currentUser;
  for(let i = 0; i < userAry.length; i++) {
    if(req.params.id == userAry[i].id) {
      currentUser = userAry[i];
    }
  }
  console.log(currentUser);
  res.render('edit', {
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
    age: currentUser.age
  });
});

router.post('/editted', (req, res) => {
  res.render('created', {
    email: req.body.email,
    name: req.body.name,
    id: req.body.id,
    age: req.body.age
  });
  for(let i = 0; i < userAry.length; i++) {
    if(req.body.id == userAry[i].id) {
      userAry[i].email = req.body.email;
      userAry[i].name = req.body.name;
      userAry[i].age = req.body.age;
    }
  }
});

router.get('/delete/:id', (req, res) => {
  let currentUser;
  console.log(`Trying to delete ${req.params.id} from`);
  console.log(userAry);
  for(let i = 0; i < userAry.length; i++) {
    if(userAry[i].id == req.params.id) {
      userAry.splice(i, 1);
    }
  }
  console.log(`Let's see if gone`);
  console.log(userAry);
  res.render('delete');
});

module.exports = router;
