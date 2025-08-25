import express from 'express'
import verifyJWT from '../../middleware/verifyJWT.js';
import { getLessonsOfSection, getLesson } from '../../controllers/lessonsController.js';

const router = express.Router();

//      /api/lessons?lesson_id          return the lesson with lesson_id
//      /api/lessons?section_id         return all lessons in a section
router.route('/')
  .get((req, res, next) => {
    if (req.query.lesson_id) {
        getLesson(req, res);
    } else if (req.query.section_id) {
      getLessonsOfSection(req, res);
    } else {
      return res.status(400).json({ error: 'Missing required query parameter: section_id or lesson_id' });
    }
  });

export default router;