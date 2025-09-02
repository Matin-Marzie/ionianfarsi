import Joi from "joi";
import { getLessonsOfSectionFromDB, getLessonFromDB } from "../models/lessonsModel.js";

export const getLessonsOfSection = async (req, res) => {
  const schema = Joi.object({
    section_id: Joi.number().integer().min(1).max(100).required()
  });

  const { error } = schema.validate({ section_id: req.query.section_id });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const lessons = await getLessonsOfSectionFromDB(req, res);

    // Group by unit -> repetition -> lessons as arrays
    const units = lessons.reduce((unitsAcc, row) => {
      // Find or create unit
      let unit = unitsAcc.find(u => u.unit_id === row.unit_id);
      if (!unit) {
        unit = {
          unit_id: row.unit_id,
          unit_title: row.unit_title,
          unit_description: row.unit_description,
          unit_order: row.unit_order,
          repetitions: []
        };
        unitsAcc.push(unit);
      }

      // Find or create repetition inside unit
      let repetition = unit.repetitions.find(r => r.repetition_id === row.repetition_id);
      if (!repetition) {
        repetition = {
          repetition_id: row.repetition_id,
          repetition_title: row.repetition_title,
          repetition_type: row.repetition_type,
          repetition_order: row.repetition_order,
          lessons: []
        };
        unit.repetitions.push(repetition);
      }

      // Find or create lesson inside repetition
      let lesson = repetition.lessons.find(l => l.lesson_id === row.lesson_id);
      if (!lesson) {
        lesson = {
          lesson_id: row.lesson_id,
          lesson_title: row.lesson_title,
          lesson_order: row.lesson_order
        };
        repetition.lessons.push(lesson);
      }

      return unitsAcc;
    }, []);


    res.json(units);
  } catch (err) {
    console.error("Error fetching Lessons of a section:", err);
    res.status(500).json({ error: "Error fetching lessons of a section" });
  }
};


export const getLesson = async (req, res) => {
  // Parameters validation
  const schema = Joi.object({
    lesson_id: Joi.number().integer().min(1).max(500).required()
  });
  const { error } = schema.validate({ lesson_id: req.query.lesson_id });

  if (error) return res.status(400).send(error.details[0].message);
  try {
    const lesson = await getLessonFromDB(req, res);
    res.json(lesson);
  } catch (err) {
    console.error("Error in /lesson:", err);
    res.status(500).json({ error: "Error fetching lesson data" });
  }
};