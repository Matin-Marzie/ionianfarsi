import express from 'express'
import authController from '../controllers/authController.js'
import verifyGoogleToken from '../middleware/verifyGoogleToken.js'

const router = express.Router()

router.post('/', authController.handleLogin)

router.post('/google', verifyGoogleToken, authController.handleGoogleLogin)

export default router;