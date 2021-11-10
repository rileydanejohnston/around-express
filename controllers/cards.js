const Cards = require('../models/card');

module.exports.getCards = (req, res) => {
  // find all cards, return them
  Cards.find({})
  // if successful, return cards
  .then(cards => res.status(200).send({ data: cards }))
  // if unsuccessful, return an error
  .catch(err => res.status(500).send({ message: err }));
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
  .catch(err => res.status(500).send({ message: err }));
}