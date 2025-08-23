import express from 'express'
import { getUser, updateUser, changePassword, changeUsername, deleteUser, getPublicUserProfile, getAllUsersPublicProfile } from '../../controllers/usersController.js'

const router = express.Router()

router.route('/')
    .get(getAllUsersPublicProfile); // list all public profiles

router.route('/me') // private profile
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/me/changeusername')
    .put(changeUsername)
router.route('/me/changepassword')
    .put(changePassword)



export default router
