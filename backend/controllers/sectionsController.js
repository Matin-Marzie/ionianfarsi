import { getSectionsFromDb } from "../models/sectionsModel.js";

export const getSections = async (req, res) => {
        try{
            const sections = await getSectionsFromDb();
            res.json(sections);

        } catch (err) {
        console.error("Error fetching sections:", err);
        res.status(500).json({ error: "Error fetching sections" });
    }
    };