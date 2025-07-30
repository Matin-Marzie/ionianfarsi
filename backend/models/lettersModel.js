import db from '../config/db.js'

export const getLetterPronunciationFromDB = async (req, res) => {

    const sql_query = `SELECT letter.writing_style AS written_form, letter.audio_url FROM letter WHERE 1;`;

    const [results] = await db.execute(sql_query);
    return results;
}