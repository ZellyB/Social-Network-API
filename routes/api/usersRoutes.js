const router = require(`express`).Router()

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require(`../../controllers/usersController`)
//route for /api/users get route, post route
router.route(`/`).get(getUsers).post(createUser)
// route for /api/users/:userId
router.route(`/:userId`).get(getSingleUser).put(updateUser).delete(deleteUser)
// route for /api/users/userId/friends/:friendId
router.route(`/:userId/friends/:friendId`).post(addFriend).delete(deleteFriend)
module.exports = router