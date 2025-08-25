import Joi from 'joi';
import { getVocabularyFromDb } from '../models/vocabularyModel.js';

export const getVocabulary = async (req, res) => {

    // const schema = Joi.object({
    //     // need change
    //     id: Joi.number().integer().min(1).max(17).required()
    // });

    // const Joi_validation_result = schema.validate({ id: req.query.id });

    // if (Joi_validation_result.error) {
    //     res.status(400).send(Joi_validation_result.error.details[0].message);
    //     return;
    // }

    try {
        const results = await getVocabularyFromDb(req, res);
        res.json(results);
    } catch (err) {
        console.error("Error fetching vocabulary:", err);
        res.status(500).json({ error: "Error fetching vocabulary" });
    }
}