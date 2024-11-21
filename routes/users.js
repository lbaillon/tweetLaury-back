var express = require('express');
var router = express.Router();
require('../models/connexion');

const uid2 = require('uid2');
const bcrypt = require('bcrypt');

const User = require("../models/users");
const { checkBody } = require('../modules/checkBody');

router.post('/signup', async (req, res) => {
  const username = await User.findOne({ username : req.body.username})
  if (checkBody(req.body, ['username', 'firstname', 'password'])) {
    if(! req.body.username|| !req.body.password){
      res.json({ result: false, error: 'Missing or empty fields'})
      return
    }else if( username !== null){
      res.json({result: false, error: 'User already exists'})
      return
    }else{
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        password: hash,
        token: uid2(32)
    })
      const newDoc = await newUser.save()
      res.json({result: true, user: newDoc})
    
    }
  } 
})

router.post('/signin', async (req, res) => {
  const data = await User.findOne({username: req.body.username})
  if (checkBody(req.body, ['username', 'password'])) {
    if(! req.body.username|| !req.body.password){
      res.json({ result: false, error: 'Missing or empty fields'})
      return
    }else if (data && bcrypt.compareSync(req.body.password, data.password)){
      res.json({ result: true, token: data.token });
    }else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  }
})


module.exports = router;
