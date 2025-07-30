import express from 'express'
import { getLetterPronunciation } from '../../controllers/letterController.js';

const router = express.Router();

//      /api/letters/pronunciation
router.route('/pronunciation')
    .get(getLetterPronunciation);

export default router;