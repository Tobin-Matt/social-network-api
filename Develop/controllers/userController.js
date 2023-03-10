const { User, Thought } = require('../models');

const getUsers = (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    // res.status(200).json({message: 'Get Users'});
}

const getSingleUser = (req, res) => {
    User.findOne({ _id: req.params.userId})
        .select('-__v')
        .populate('thoughts')
        .then((user) => {
            console.log(user)
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        })
    .catch((err) => {console.log(err)
    res.status(500).json(err)});
    // res.status(200).json({message: `Get User ${req.params.id}`});
}

const createUser = (req, res) => {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
    
    // if(!req.body.text) {
    //     res.status(400).json({message: 'Please create user'});
    // }
    
    // res.status(200).json({message: 'Create User'});
}

const updateUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    
    // res.status(200).json({message: `Update User ${req.params.id}`});
}

const deleteUser = (req, res) => {
    console.log(req.params);
    User.findOneAndRemove({ _id: req.params.userId })
        .then((user) => {
            console.log(user);
            !user
                ? res.status(404).json({ message: 'No user found with this id!' })
                : res.status(200).json({ message: 'User deleted!' })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })

    // res.status(200).json({message: `Delete User ${req.params.id}`});
}

const addFriend = (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
}

const removeFriend = (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends:req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
}

module.exports = {
   getUsers,
   getSingleUser,
   createUser,
   updateUser,
   deleteUser,
   addFriend,
   removeFriend
}