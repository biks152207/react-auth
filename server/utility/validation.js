const validator  = require( 'validator');

const register = (payload, cb)  => {

  const email = payload.email ? payload.email : null;
  const password = payload.password ? payload.password: null;
  const firstName = payload.firstName ? payload.firstName: null;
  const lastName = payload.lastName ? payload.lastName: null;
  console.log(email);
  if (!email){
    return cb({error: 'Please enter your email address'}, null);
  }
  if(!password){
    return cb({error: 'Please enter your password'}, null);
  }
  if (!firstName || !lastName){
    return cb({error: 'Enter your full name i.e First name and Last name'});
  }
  if (!validator.isEmail(email)){
    return cb({error: 'Invalid email address'})
  }

  console.log(firstName);
  console.log('first name');

  return cb(null);
}


module.exports.register = register;
