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

    // Group by unit → repetition → lessons
    const unitsMap = lessons.reduce((acc, lesson) => {
      const uOrder = lesson.unit_order;
      const rOrder = lesson.repetition_order;

      if (!acc[uOrder]) {
        acc[uOrder] = {
          unit_order: uOrder,
          unit_title: lesson.unit_title || `Unit ${uOrder}`,
          repetitions: {}
        };
      }

      if (!acc[uOrder].repetitions[rOrder]) {
        acc[uOrder].repetitions[rOrder] = {
          repetition_order: rOrder,
          lessons: []
        };
      }

      acc[uOrder].repetitions[rOrder].lessons.push(lesson);
      return acc;
    }, {});

    // Convert to sorted array
    const units = Object.values(unitsMap)
      .sort((a, b) => a.unit_order - b.unit_order)
      .map(unit => ({
        ...unit,
        repetitions: Object.values(unit.repetitions)
          .sort((a, b) => a.repetition_order - b.repetition_order)
      }));

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