// pull in the users model
const Users = require('../models/user');

// get all users
module.exports.getUsers = (req, res) => {
  // grab all users from the Users model
  Users.find({})
  .then(users => res.status(200).send({ data: users }))
  .catch(err => res.status(500).send({ message: 'There was a server error.'}));
}

// get specific user by their id
module.exports.getUser = (req, res) => {
  // get the id from the req params
  const { userId } = req.params;
  // search through the Users model for a user with the matching id
  Users.findById(userId)
  // if we find the user, send user info back with 200 status code
  .then(user => res.status(200).send({ data: user }))
  // if we can't find the user, send an error message with a 404 status code
  .catch(err => res.status(404).send({ message: 'A user with that ID was not found.' }))
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