const User = require('../models/User');

const getUsers = (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    // res.status(200).json({message: 'Get Users'});
}

const getSingleUser = (req, res) => {
    User.findOne({ _id: req.params.userId})
        .select('-__v')
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        )
    .catch((err) => res.status(500).json(err));
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
    User.findOneAndRemove({ _id: req.params.userId })
        .then((err, user) => 
            !user
                ? res.status(404).json({ message: 'No user found with this id!' })
                : res.status(200).json({ message: 'User deleted!' })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })

    // res.status(200).json({message: `Delete User ${req.params.id}`});
}

module.exports = {
   getUsers,
   getSingleUser,
   createUser,
   updateUser,
   deleteUser,
}