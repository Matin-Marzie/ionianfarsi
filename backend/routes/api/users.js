import express from 'express'
import verifyJWT from '../../middleware/verifyJWT.js';
import { getUser, updateUser, changePassword, changeUsername, deleteUser, getPublicUserProfile, getAllUsersPublicProfile } from '../../controllers/usersController.js'

const router = express.Router()

router.route('/me') // private profile
    .get(verifyJWT, getUser)
    .put(verifyJWT, updateUser)
    .delete(verifyJWT, deleteUser)

router.route('/me/changeusername')
    .put(verifyJWT, changeUsername)
router.route('/me/changepassword')
    .put(verifyJWT, changePassword)

router.route('/')
    .get(getAllUsersPublicProfile); // list all public profiles

router.route('/:username')
    .get(getPublicUserProfile)


export default router
