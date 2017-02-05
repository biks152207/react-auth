var setUserInfo = function (request){
  const getUserInfo = {
    _id:request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
    role: request.role
  }
  return getUserInfo;
}

module.exports.setUserInfo = setUserInfo;
