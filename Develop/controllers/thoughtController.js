const Thought = require('../models/Thought');

const getThought = (req, res) => {
    Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
}

const getSingleThought = (req, res) => {
    Thought.findOne({ _id: req.params.thoughtId})
        .select('-__v')
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
        )
    .catch((err) => res.status(500).json(err));
}

const createThought = (req, res) => {
    Thought.create(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
}

const updateThought = (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
}

const deleteThought = (req, res) => {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((err, thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found with this id!' })
                : res.status(200).json({ message: 'Thought deleted!' })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
}

const addReacion = (req, res) => {
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
}

const removeReaction = (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { thoughtId: req.params.thoughtId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
}

module.exports = {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReacion,
    removeReaction
}