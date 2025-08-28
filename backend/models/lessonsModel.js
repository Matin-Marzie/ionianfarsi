import db from '../config/db.js'

export const getLessonsOfSectionFromDB = async (req, res) => {
    const query_parameters = [req.query.section_id];
    const sql_query = `
        SELECT lessons.*, units.title as unit_title, units.unit_order, repetitions.repetition_order
        FROM lessons
        JOIN repetitions ON lessons.repetition_id = repetitions.id
        JOIN units ON repetitions.unit_id = units.id
        WHERE units.section_id = ?
        ORDER BY repetitions.unit_id, lessons.repetition_id, lessons.lesson_order;
    `;
    const [lessons] = await db.execute(sql_query, query_parameters);
    return lessons;
}


export const getLessonFromDB = async (req, res) => {
    const lessonId = req.query.lesson_id;

    // Get all the challenges in the lesson
    const queryChallenges = `
        SELECT challenges.*
        FROM lessons
        JOIN challenges_in_lesson ON challenges_in_lesson.lesson_id = lessons.id
        JOIN challenges ON challenges_in_lesson.challenge_id = challenges.id
        WHERE lessons.id = ?
        ORDER BY challenges_in_lesson.challenge_order;
    `;

    const [challenges] = await db.execute(queryChallenges, [lessonId]);

    // Get the content of each challenge
    const enrichedChallenges = await Promise.all(challenges.map(async (challenge) => {

        switch (challenge.challenge_type) {

            // --------------------challenge_match--------------------
            case 'match': {
                const query = `
                    SELECT 
                        challenge_match.match_type,

                        words.id AS word_id,
                        words.written_form AS word_written_form,
                        words.english_equivalent AS word_english_equivalent,
                        words.transliteration AS word_transliteration,
                        words.category AS word_category,
                        words.image_url AS word_image_url,
                        words.audio_url AS word_audio_url,

                        sentences.id AS sentence_id,
                        sentences.written_form AS sentence_written_form,
                        sentences.written_form2 AS sentence_written_form2,
                        sentences.written_form3 AS sentence_written_form3,
                        sentences.english_equivalent AS sentence_english_equivalent,
                        sentences.image_url AS sentence_image_url,
                        sentences.audio_url AS sentence_audio_url

                    FROM challenge_match
                    JOIN challenge_match_items 
                        ON challenge_match_items.challenge_match_id = challenge_match.id
                    LEFT JOIN words 
                        ON challenge_match_items.word_id = words.id
                    LEFT JOIN sentences 
                        ON challenge_match_items.sentence_id = sentences.id
                    WHERE challenge_match.challenge_id = ?
                    ;
                    `;
                const [rows] = await db.execute(query, [challenge.id]);
                res = {
                    ...challenge,
                    content: {
                        match_type: rows[0]?.match_type || null,
                        words: [],
                        sentences: []
                    }
                };

                rows.forEach(row => {
                    if (row.word_id) {
                        res.content.words.push({
                            id: row.word_id,
                            written_form: row.word_written_form,
                            english_equivalent: row.word_english_equivalent,
                            transliteration: row.word_transliteration,
                            category: row.word_category,
                            image_url: row.word_image_url,
                            audio_url: row.word_audio_url
                        });
                    }

                    if (row.sentence_id) {
                        res.content.sentences.push({
                            id: row.sentence_id,
                            written_form: row.sentence_written_form,
                            written_form2: row.sentence_written_form2,
                            written_form3: row.sentence_written_form3,
                            english_equivalent: row.sentence_english_equivalent,
                            image_url: row.sentence_image_url,
                            audio_url: row.sentence_audio_url
                        });
                    }
                });

                return res;
            }

            // --------------------challenge_select--------------------
            case 'select': {
                // Get challenge_select info
                const querySelect = `
                SELECT 
                    challenge_select.select_type,
                    challenge_select.question,
                    challenge_select_options.correct,

                    words.id AS word_id,
                    words.written_form AS word_written_form,
                    words.english_equivalent AS word_english_equivalent,
                    words.transliteration AS word_transliteration,
                    words.category AS word_category,
                    words.image_url AS word_image_url,
                    words.audio_url AS word_audio_url,

                    sentences.id AS sentence_id,
                    sentences.written_form AS sentence_written_form,
                    sentences.written_form2 AS sentence_written_form2,
                    sentences.written_form3 AS sentence_written_form3,
                    sentences.english_equivalent AS sentence_english_equivalent,
                    sentences.image_url AS sentence_image_url,
                    sentences.audio_url AS sentence_audio_url

                FROM challenge_select
                LEFT JOIN challenge_select_options 
                    ON challenge_select.id = challenge_select_options.challenge__select_id
                LEFT JOIN words 
                    ON challenge_select_options.word_id = words.id
                LEFT JOIN sentences 
                    ON challenge_select_options.sentence_id = sentences.id
                WHERE challenge_select.challenge_id = ?
                `;
                const [rows] = await db.execute(querySelect, [challenge.id]);

                res = {
                    ...challenge,
                    content: {
                        select_type: rows[0]?.select_type,
                        question: rows[0]?.question,
                        correct: rows[0]?.correct,
                        words: [],
                        sentences: []
                    }
                };

                // loop rows and add words / sentences
                rows.forEach(row => {
                    if (row.word_id) {
                        res.content.words.push({
                            id: row.word_id,
                            written_form: row.word_written_form,
                            english_equivalent: row.word_english_equivalent,
                            transliteration: row.word_transliteration,
                            category: row.word_category,
                            image_url: row.word_image_url,
                            audio_url: row.word_audio_url
                        });
                    }

                    if (row.sentence_id) {
                        res.content.sentences.push({
                            id: row.sentence_id,
                            written_form: row.sentence_written_form,
                            written_form2: row.sentence_written_form2,
                            written_form3: row.sentence_written_form3,
                            english_equivalent: row.sentence_english_equivalent,
                            image_url: row.sentence_image_url,
                            audio_url: row.sentence_audio_url
                        });
                    }
                });

                return res;
            }

            // --------------------challenge_sort--------------------
            case 'sort': {
                // Get challenge_sort info
                const querySort = `
                    SELECT
                        challenge_sort.sort_type,

                        sentences.id AS sentence_id,
                        sentences.written_form AS sentence_written_form,
                        sentences.written_form2 AS sentence_written_form2,
                        sentences.written_form3 AS sentence_written_form3,
                        sentences.english_equivalent AS sentence_english_equivalent,
                        sentences.image_url AS sentence_image_url, 
                        sentences.audio_url AS sentence_audio_url

                    FROM challenge_sort
                    LEFT JOIN sentences ON challenge_sort.sentence_id = sentences.id
                    WHERE challenge_sort.challenge_id = ?;

                    `;

                const [rows] = await db.execute(querySort, [challenge.id]);

                res = {
                    ...challenge,
                    content: {
                        sort_type: rows[0]?.sort_type || null,
                        sentence: null,
                        sentence_words: []
                    }
                };

                if (rows[0]?.sentence_id) {
                    res.content.sentence = {
                        id: rows[0].sentence_id,
                        written_form: rows[0].sentence_written_form,
                        written_form2: rows[0].sentence_written_form2,
                        written_form3: rows[0].sentence_written_form3,
                        english_equivalent: rows[0].sentence_english_equivalent,
                        image_url: rows[0].sentence_image_url,
                        audio_url: rows[0].sentence_audio_url
                    };

                    // fetch words in that sentence (ordered)
                    const querySentenceWords = `
        SELECT words.id, words.written_form, words.english_equivalent, 
               words.transliteration, words.category,
               words.image_url, words.audio_url, words_in_sentence.position
        FROM words_in_sentence
        JOIN words ON words_in_sentence.word_id = words.id
        WHERE words_in_sentence.sentence_id = ?
        ORDER BY words_in_sentence.position;
    `;
                    const [sentenceWords] = await db.execute(querySentenceWords, [rows[0].sentence_id]);
                    res.content.sentence_words = sentenceWords;
                }

                console.log(res);
                return res;
            }

            // --------------------Default: Unknown type--------------------
            default:
                // return { ...challenge, content: [] };
                return {}
        }
    }));
    return enrichedChallenges;
}
// FETCHING CHALLENGES IN A LESSON WITH ONLY ONE QUERY:
// SELECT challenges.*,
//        challenge_match.id as match_id, 
//        challenge_match.match_type,
//        challenge_match_items.word_id as match_word_id,
//        challenge_match_items.sentence_id as match_sentence_id,
//        challenge_select.id as select_id,
//        challenge_select.select_type,
//        challenge_select.question as select_question,
//        challenge_select_options.word_id as select_word_id,
//        challenge_select_options.sentence_id as select_sentence_id,
//        challenge_select_options.correct as select_correct,
//        challenge_sort.id as sort_id,
//        challenge_sort.sort_type,
//        challenge_sort.sentence_id as sort_sentence_id,
//        challenge_sort.word_id as sort_word_id,
//        words.id as word_id,
//        words.written_form,
//        words.english_equivalent,
//        words.transliteration,
//        words.category,
//        words.image_url,
//        words.audio_url,
//        sentences.id as sentence_id,
//        sentences.written_form,
//        sentences.written_form2,
//        sentences.written_form3,
//        sentences.english_equivalent,
//        sentences.image_url as sentence_image_url,
//        sentences.audio_url as sentence_audio_url
// FROM challenges
// LEFT JOIN challenge_match ON challenge_match.challenge_id = challenges.id
// LEFT JOIN challenge_match_items ON challenge_match_items.challenge_match_id = challenge_match.id
// LEFT JOIN challenge_select ON challenge_select.challenge_id = challenges.id
// LEFT JOIN challenge_select_options ON challenge_select_options.challenge__select_id = challenge_select.id
// LEFT JOIN challenge_sort ON challenge_sort.challenge_id = challenges.id
// LEFT JOIN words ON words.id = challenge_match_items.word_id OR words.id = challenge_select_options.word_id OR words.id = challenge_sort.word_id
// LEFT JOIN sentences ON sentences.id = challenge_match_items.sentence_id OR sentences.id = challenge_select_options.sentence_id OR sentences.id = challenge_sort.sentence_id
// WHERE challenges.id IN (
//     SELECT challenge_id 
//     FROM challenge_in_lesson
//     WHERE lesson_id = ?
// )
// ORDER BY challenges.id, challenge_in_lesson.challenge_order;