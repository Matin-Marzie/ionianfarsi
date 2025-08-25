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

            switch (challenge.type) {

                // --------------------challenge_match--------------------
                case 'challenge_match': {
                    const query = `
                        SELECT challenge_match.type as match_type, word.* 
                        FROM challenge_match
                        JOIN words_in_challenge_match ON words_in_challenge_match.challenge_match_id = challenge_match.id
                        JOIN word ON words_in_challenge_match.word_id = word.id
                        WHERE challenge_match.challenge_id = ?;
                    `;
                    const [content] = await db.execute(query, [challenge.id]);
                    return { ...challenge, content };
                }

                // --------------------challenge_select--------------------
                case 'challenge_select': {
                    // Get challenge_select info
                    const querySelect = `
                        SELECT 
                            challenge_select.type AS select_type, 
                            challenge_select.question AS select_question, 
                            
                            word.written_form AS word_written_form,
                            word.english_equivalent AS word_english_equivalent,
                            word.image_url AS word_image_url, 
                            word.audio_url AS word_audio_url, 
                            
                            sentence.written_form AS sentence_written_form,
                            sentence.english_equivalent AS sentence_english_equivalent,
                            sentence.image_url AS sentence_image_url, 
                            sentence.audio_url AS sentence_audio_url
                        FROM challenge_select
                        LEFT JOIN word ON challenge_select.word_id = word.id
                        LEFT JOIN sentence ON challenge_select.sentence_id = sentence.id
                        WHERE challenge_select.challenge_id = ?
                        AND (challenge_select.word_id IS NOT NULL OR challenge_select.sentence_id IS NOT NULL);
                    `;
                    const [selectDetails] = await db.execute(querySelect, [challenge.id]);

                    // Get Challenge select options
                    const queryOptions = `
                        SELECT 
                            challenge_select_option.id AS option_id,
                            challenge_select_option.correct,
                            word.*
                        FROM challenge_select
                        JOIN options_in_challenge_select ON options_in_challenge_select.challenge_select_id = challenge_select.id
                        JOIN challenge_select_option ON options_in_challenge_select.challenge_select_option_id = challenge_select_option.id
                        JOIN word ON challenge_select_option.word_id = word.id
                        WHERE challenge_select.challenge_id = ?
                        ORDER BY RAND();
                    `;
                    const [options] = await db.execute(queryOptions, [challenge.id]);

                    return {
                        ...challenge,
                        ...selectDetails[0],
                        options
                    };
                }

                // --------------------challenge_sort--------------------
                case 'challenge_sort': {
                    // Get challenge_sort info
                    const querySort = `
                        SELECT
                            challenge_sort.type AS sort_type,

                            word.written_form AS word_written_form,
                            word.english_equivalent AS word_english_equivalent,
                            word.image_url AS word_image_url, 
                            word.audio_url AS word_audio_url, 
                            
                            sentence.written_form AS sentence_written_form,
                            sentence.written_form2 AS sentence_written_form2,
                            sentence.written_form3 AS sentence_written_form3,
                            sentence.english_equivalent AS sentence_english_equivalent,
                            sentence.image_url AS sentence_image_url, 
                            sentence.audio_url AS sentence_audio_url,
                            sentence.id AS sentence_id
                        FROM challenge_sort
                        LEFT JOIN sentence ON challenge_sort.sentence_id = sentence.id
                        LEFT JOIN word ON challenge_sort.word_id = word.id
                        WHERE challenge_sort.challenge_id = ?
                        AND (challenge_sort.sentence_id IS NOT NULL OR challenge_sort.word_id IS NOT NULL);
                    `;
                    const [sortContent] = await db.execute(querySort, [challenge.id]);

                    // If challenge_sort includes sentence → get the sentence words
                    if (sortContent[0]?.sentence_id) {
                        const queryWords = `
                            SELECT word.*
                            FROM sentence
                            JOIN words_in_sentence ON words_in_sentence.sentence_id = sentence.id
                            JOIN word ON words_in_sentence.word_id = word.id
                            WHERE sentence_id = ?;
                        `;
                        const [sentenceWords] = await db.execute(queryWords, [sortContent[0].sentence_id]);

                        return {
                            ...challenge,
                            ...sortContent[0],
                            sentence_words: sentenceWords
                        };
                    }

                    // If only word-related challenge_sort
                    return {
                        ...challenge,
                        ...sortContent[0]
                    };
                }

                // --------------------Default: Unknown type--------------------
                default:
                    return { ...challenge, content: [] };
            }
        }));
        return enrichedChallenges;
}