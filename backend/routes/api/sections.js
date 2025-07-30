import express from 'express'
import { getSections } from '../../controllers/sectionsController.js';

const router = express.Router();

//      /api/sections
router.route('/')
    .get(getSections);


export default router;