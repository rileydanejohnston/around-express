// pull in the users model
const Users = require('../models/user');

// get all users
module.exports.getUsers = (req, res) => {
  // grab all users from the Users model
  Users.find({})
  .then(users => res.status(200).send({ data: users }))
  .catch(err => res.status(500).send({ message: 'There was a server error.'}));
}

// controller function - create new user in database from post request
module.exports.createUser = (req, res) => {
  // get user info from request body
  const { name, about, avatar } = req.body;

  // create a new document in db -> pass name, about, avatar
  Users.create({ name, about, avatar })
  // if successful, we get send the user back with 200 status
  .then(user => res.status(200).send({ data: user }))
  // if failure, we send error message back with 500 status
  .catch(err => res.status(500).send({ message: 'There was a server error.'}));
}