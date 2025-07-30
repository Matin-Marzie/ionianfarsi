import { getLetterPronunciationFromDB } from "../models/lettersModel.js";

export const getLetterPronunciation = async (req, res) => {
    try {
        const results = await getLetterPronunciationFromDB();
        res.json(results);
    } catch (err) {
        console.error("Error fetching letters pronunciaction: ", err);
        res.status(500).json({ error: "Error fetching letters pronunciation" });
    }
}