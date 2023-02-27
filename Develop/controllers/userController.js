const getUsers = (req, res) => {
    res.status(200).json({message: 'Get Users'});
}

const getSingleUser = (req, res) => {
    res.status(200).json({message: `Get User ${req.params.id}`});
}

const createUser = (req, res) => {
    if(!req.body.text) {
        res.status(400).json({message: 'Please create user'});
    }
    
    res.status(200).json({message: 'Create User'});
}

const updateUser = (req, res) => {
    res.status(200).json({message: `Update User ${req.params.id}`});
}

const deleteUser = (req, res) => {
    res.status(200).json({message: `Delete User ${req.params.id}`});
}

module.exports = {
   getUsers,
   getSingleUser,
   createUser,
   updateUser,
   deleteUser,
}