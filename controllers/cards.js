const Cards = require('../models/card');

module.exports.dislikeCard = (req, res) =>
  Cards.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
  .then(likes => res.status(200).send({ data: likes }))
  .catch(err => {
    res.status(500).send({ message: err });
  });

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
  .then(likes => res.status(200).send({ data: likes }))
  .catch(err => {
    res.status(500).send({ message: err });
  });
}

module.exports.getCards = (req, res) => {
  Cards.find({})
  .orFail()
  .then(cards => res.status(200).send({ data: cards }))
  .catch(err => {
    if (err.name === 'DocumentNotFoundError'){
      res.status(404).send({ message: 'Could not find any cards.' });
    }
    res.status(500).send({ message: err });
  });
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Cards.create({ name, link, owner: _id })
  .then(card => res.status(201).send({ data: card }))
  .catch(err => {
    if (err.name === 'ValidationError'){
      res.status(400).send({ message: 'Invalid information was submitted.' })
    }
    res.status(500).send({ message: err })
  });
}

module.exports.deleteCard = (req, res) => {

  Cards.findByIdAndRemove(req.params.id)
  .then(card => res.status(200).send({ data: card }))
  .catch(err => {
    if (err.name === 'CastError'){
      res.status(404).send({ message: 'Invalid user ID.' });
    }
    res.status(500).send({ message: err });
  });
}
