const jwt = require('jsonwebtoken'),
          crypto = require('crypto'),
          User = require('../models/user').User,
          config = require('../config/main'),
          validator = require('../utility/validation'),
          setUserInfo = require('../helpers').setUserInfo;


function generateToken(user){
  return jwt.sign(user, config.secret, {
    expiresIn: 10080
  })
}

const login = (req, res, next) =>{
  let userInfo = setUserInfo(req.user);
  res.status(200)
    .json({
      token: `JWT ${generateToken(userInfo)}`,
      user: userInfo
    })
}

const register = (req, res, next) =>{
  validator.register(req.body, function(err){
    if (err){
      return res.status(422).send(err);
    }

    User.findOne({email: req.body.email}, (err, existingUser) => {
      if (err) { return next(err)};

      if (existingUser){
        return res.status(422).send({error: `User with email ${req.body.email} already exists`})
      }
      console.log('i am here....');
      let user = new User({
        email: req.body.email,
        password: req.body.password,
        profile: {
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }
      })
      user.save((err, user) =>{
        console.log(err);
        console.log('error');
        if (err) { return next(err);}
        let userInfo = setUserInfo(user);
        return res.status(201).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        })
      })
    })
  })
}

// Role authorization check
var roleAuthorization = function(role) {
  return function(req, res, next) {
    const user = req.user;

    User.findById(user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (foundUser.role == role) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    })
  }
}

module.exports.login = login;
module.exports.register = register;
module.exports.roleAuthorization = roleAuthorization;

  // validator.login(req.body, function(err){
  //   if (err){
  //     return res.status(422).send(err);
  //   }
  //   // check the user
  //   User.findOne({email:req.body.email}, function(err, existingUser){
  //     if (err) { return next(err);};
  //
  //     // If user isnot unique, return error
  //     if (existingUser){
  //       return
  //     }
  //   })
