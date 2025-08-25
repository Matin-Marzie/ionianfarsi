import db from '../config/db.js'

export const getVocabularyFromDb = async (req, res) => {
    // const lesson_number = [req.query.id];

    // const query1 = `
    //     SELECT letter.id 
    //     FROM letter
    //     JOIN firststep_lesson ON letter.lesson_id = firststep_lesson.number
    //     WHERE firststep_lesson.number = ?
    //     ORDER BY letter.id
    // `;

    // const [letters] = await db.execute(query1, lesson_number);

    //     const results = await Promise.all(
    //         letters.map(async (letter) => {
    //             const query2 = `
    //                 SELECT w.*
    //                 FROM word w
    //                 JOIN letters_taught_in_firststep_lesson t ON t.word_id = w.id
    //                 JOIN letter l ON t.letter_id = l.id
    //                 WHERE l.id = ?;
    //             `;

    //             const [words] = await db.execute(query2, [letter.id]);
    //             return { letter_id: letter.id, words };
    //         })
    //     );
    
    //     return results;

    const query = `SELECT * FROM words;`;

    const results = await db.execute(query);
    return results;
}