import express from 'express'
import { getVocabulary } from '../../controllers/vocabularyController.js';

const router = express.Router();

router.route('/')
    .get(getVocabulary)

export default router;