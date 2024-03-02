// Express imports.
const router = require('express').Router();

// User controller query functions imports.
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// Route setup, example: http://localhost:3001/api/users/...
router
.route('/')
.get(getAllUsers)
.post(createUser);

router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

//Express export.
module.exports = router;