const Cards = require('../models/card');

module.exports.getCards = (req, res) => {
  // find all cards, return them
  Cards.find({})
  .orFail()
  // if successful, return cards
  .then(cards => res.status(200).send({ data: cards }))
  // if unsuccessful, return an error
  .catch(err => {
    if (err.name === 'DocumentNotFoundError'){
      res.status(404).send({ message: 'Could not find any cards.' });
    }
    res.status(500).send({ message: err });
  });
}

module.exports.createCard = (req, res) => {
  // get card information from request
  const { name, link } = req.body;

  // get owner information from request
  const { _id } = req.user;

  // get user id
  // find all cards in the cards model
  Cards.create({ name, link, owner: _id })
  // if we find the cards, send them back with 200 response
  .then(card => res.status(200).send({ data: card }))
  // if we fail to get the cards, send an error msg with 500 response
  .catch(err => {
    if (err.name === 'ValidationError'){
      res.status(400).send({ message: 'Invalid information was submitted.' })
    }
    res.status(500).send({ message: err })
  });
}

module.exports.deleteCard = (req, res) => {
  // get id from request -> pass to delete method
  Cards.findByIdAndRemove(req.params.id)
  // if successful, return the card that was deleted?
  .then(card => res.status(200).send({ data: card }))
  // if unsuccessful, return error
  .catch(err => {
    if (err.name === 'CastError'){
      res.status(404).send({ message: 'Invalid user ID.' });
    }
    res.status(500).send({ message: err });
  });
}