import db from '../config/db.js'

export const getLetterPronunciationFromDB = async (req, res) => {

    const sql_query = `
        SELECT letters.writing_style AS written_form, letters.audio_url
        FROM letters;
    `;

    const [results] = await db.execute(sql_query);
    return results;
}