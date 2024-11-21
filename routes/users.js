const uid2 = require('uid2');
const bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
require('../models/connexion');

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
    newUser.save().then(newDoc => {
        res.json({result: true, user: newDoc})
    })
    }
  } 
})

module.exports = router;
