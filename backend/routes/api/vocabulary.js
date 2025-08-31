import express from 'express'
import verifyJWT from '../../middleware/verifyJWT.js';
import { getVocabulary } from '../../controllers/vocabularyController.js';

const router = express.Router();

router.route('/')
    .get(verifyJWT, getVocabulary)

export default router;