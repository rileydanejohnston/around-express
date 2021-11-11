// pull in the users model
const Users = require('../models/user');

// update profile information
module.exports.updateProfile = (req, res) => {
  // get information request body
  const { name, about } = req.body;
  // find the user by id/update info
    // pass id, object of info to update
  Users.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // then handler receives updated document
    runValidators: true // validate data before update
  })
  // if successful, send the user back... updated user?
  .then(user => res.status(200).send({ data: user }))
  // if unsuccessful, send error
  .catch(err => {
    if (err.name === 'ValidationError'){
      res.status(400).send({ message: 'Invalid information was submitted.' })
    }
    res.status(500).send({ message: err });
  });
}

// get all users
module.exports.getUsers = (req, res) => {
  // grab all users from the Users model
  Users.find({})
  .orFail()
  .then(users => res.status(200).send({ data: users }))
  .catch(err => {
    if (err.name === 'DocumentNotFoundError'){
      res.status(404).send({ message: 'Could not find any users.' });
    }
    res.status(500).send({ message: err });
  });
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
  .catch(err => {
    if (err.name === 'CastError'){
      res.status(404).send({ message: 'Invalid user ID.' });
    }
    res.status(500).send({ message: err });
  });
}

// controller function - create new user in database from post request
module.exports.createUser = (req, res) => {
  // get user info from request body
  const { name, about, avatar } = req.body;

  // create a new document in db -> pass name, about, avatar
  Users.create({ name, about, avatar })
  // if successful, we get send the user back with 200 status
  .then(user => res.status(201).send({ data: user }))
  // if failure, we send error message back with 500 status
  .catch(err => {
    if (err.name === 'ValidationError'){
      res.status(400).send({ message: 'Invalid information was submitted.' })
    }
    res.status(500).send({ message: err })
  });
}