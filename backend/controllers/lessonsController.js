import Joi from "joi";
import { getLessonFromDB, getLessonsOfSectionFromDB } from "../models/lessonsModel.js";


export const getLessonsOfSection = async (req, res) => {
    const schema = Joi.object({
        section_id: Joi.number().integer().min(1).max(100).required()
    });
    const joi_validation_result = schema.validate({ section_id: req.query.section_id });
    if (joi_validation_result.error) {
        res.status(400).send(joi_validation_result.error.details[0].message);
        return;
    }
    try {
        const lessons = await getLessonsOfSectionFromDB(req, res);
        res.json(lessons);
    } catch (err) {
        console.error("Error fetching Lessons of a section: ", err);
        res.status(500).json({ error: "Error fetching lessons of a section" });
    }
}


export const getLesson = async (req, res) => {
    // Parameters validation
    const schema = Joi.object({
        lesson_id: Joi.number().integer().min(1).max(15).required()
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