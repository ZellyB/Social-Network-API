const {Users, Thoughts} = require(`../models`)

module.exports = {
   // Get all users
   getUsers(req, res) {
    Users.find()
      .populate({path: `thoughts`, select: `-__v`})
      .populate({path: `friends`, select: `-__v`})
      .select(`-__v`)
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //get user by id (single user)
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.userId })
      .populate({path: `thoughts`, select: `-__v`})
      .populate({path: `friends`, select: `-__v`})
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  } ,
     // create a new user
  createUser(req, res) {
    Users.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  //update user by id
  updateUser(req, res){
    Users.findOneAndUpdate({_id: req.params.userId},
      { $set: req.body },
      { runValidators: true, new: true })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user))
  },
  //delete user by id ---
  deleteUser(req, res) {
    Users.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thoughts.deleteMany({ _id: { $in: user.thoughts } }) // bonus: Delete associated thoughts
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  //add a friend to User
  addFriend (req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'No user found with this id!' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err))
  },
  deleteFriend (req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      {new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'No user found with this id!' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err))
  }
} 