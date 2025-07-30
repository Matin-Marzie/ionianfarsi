import express from 'express'
import { getUser, updateUser, deleteUser, getPublicUserProfile, getAllUsers } from '../../controllers/usersController.js'

const router = express.Router()

//      /api/users          → All users
//      /api/users?username → Private profile
router.route('/')
    .get((req, res) => {
        if (req.query.username) {
            return getUser(req, res); // private view
        } else {
            return getAllUsers(req, res); // all users
        }
    })
    .put(updateUser)
    .delete(deleteUser)

// GET /api/users/:username → Public profile
router.route('/:username')
    .get(getPublicUserProfile)

export default router
