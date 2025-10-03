import db from '../config/db.js'

// Main lesson fetchers
export const getLessonsOfSectionFromDB = async (req, res) => {
    const query_parameters = [req.query.section_id];
    const get_lessons_query = `
        SELECT  units.section_id as section_id,
        units.id as unit_id, units.title as unit_title, units.description as unit_description, units.unit_order,
        repetitions.id as repetition_id, repetitions.titile as repetition_title, repetitions.repetition_type, repetitions.repetition_order,
        lessons.id as lesson_id, lessons.title as lesson_title, lessons.lesson_order
        
        FROM lessons
        JOIN repetitions ON lessons.repetition_id = repetitions.id
        JOIN units ON repetitions.unit_id = units.id
        WHERE units.section_id = ?
        ORDER BY units.unit_order, repetitions.repetition_order, lessons.lesson_order;
    `;
    const [lessons] = await db.execute(get_lessons_query, query_parameters);
    return lessons;
}



// Utility: fetch challenge_match content
async function fetchChallengeMatch(challenge_id) {
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
    `;
    const [rows] = await db.execute(query, [challenge_id]);
    const content = {
        match_type: rows[0]?.match_type || null,
        words: [],
        sentences: []
    };
    rows.forEach(row => {
        if (row.word_id) {
            content.words.push({
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
            content.sentences.push({
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
    return content;
}

// Utility: fetch challenge_select content
async function fetchChallengeSelect(challenge_id) {
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
            sentences.transliteration AS sentence_transliteration,
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
    const [rows] = await db.execute(querySelect, [challenge_id]);
    const content = {
        select_type: rows[0]?.select_type,
        question: rows[0]?.question,
        correct: rows[0]?.correct,
        options: []
    };
    rows.forEach(row => {
        if (row.word_id) {
            content.options.push({
                type: 'word',
                correct: row.correct,
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
            content.options.push({
                type: 'sentence',
                correct: row.correct,
                id: row.sentence_id,
                written_form: row.sentence_written_form,
                written_form2: row.sentence_written_form2,
                written_form3: row.sentence_written_form3,
                english_equivalent: row.sentence_english_equivalent,
                transliteration: row.sentence_transliteration,
                image_url: row.sentence_image_url,
                audio_url: row.sentence_audio_url
            });
        }
    });
    return content;
}

// Utility: fetch challenge_sort content
async function fetchChallengeSort(challenge_id) {
    const querySort = `
        SELECT
            challenge_sort.sort_type,

            sentences.id AS sentence_id,
            sentences.written_form AS sentence_written_form,
            sentences.written_form2 AS sentence_written_form2,
            sentences.written_form3 AS sentence_written_form3,
            sentences.english_equivalent AS sentence_english_equivalent,
            sentences.transliteration AS sentence_transliteration,
            sentences.image_url AS sentence_image_url, 
            sentences.audio_url AS sentence_audio_url,

            words.id AS word_id,
            words.written_form AS word_written_form,
            words.english_equivalent AS word_english_equivalent,
            words.transliteration AS word_transliteration,
            words.category AS word_category,
            words.image_url AS word_image_url,
            words.audio_url AS word_audio_url

        FROM challenge_sort
        LEFT JOIN sentences ON challenge_sort.sentence_id = sentences.id
        LEFT JOIN words ON challenge_sort.word_id = words.id
        WHERE challenge_sort.challenge_id = ?;
    `;
    const [rows] = await db.execute(querySort, [challenge_id]);
    const content = {
        sort_type: rows[0]?.sort_type || null,
        sentence: null,
        sentence_words: [],
        word: null
    };
    if (rows[0]?.sentence_id) {
        content.sentence = {
            id: rows[0].sentence_id,
            written_form: rows[0].sentence_written_form,
            written_form2: rows[0].sentence_written_form2,
            written_form3: rows[0].sentence_written_form3,
            english_equivalent: rows[0].sentence_english_equivalent,
            transliteration: rows[0].sentence_transliteration,
            image_url: rows[0].sentence_image_url,
            audio_url: rows[0].sentence_audio_url
        };
        // fetch sentence words in order
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
        content.sentence_words = sentenceWords;
    }
    if (rows[0]?.word_id) {
        content.word = {
            id: rows[0].word_id,
            written_form: rows[0].word_written_form,
            english_equivalent: rows[0].word_english_equivalent,
            transliteration: rows[0].word_transliteration,
            category: rows[0].word_category,
            image_url: rows[0].word_image_url,
            audio_url: rows[0].word_audio_url
        };
    }
    return content;
}


// Utility: fetch dialogue content with full challenge objects
async function fetchDialogue(dialogue_id) {
    // Fetch dialogue and video info
    const [dialogueData] = await db.execute(`
    SELECT d.id AS dialogue_id, v.id AS video_id, v.url AS video_url,
           v.thumbnail AS video_thumbnail, v.title AS video_title
    FROM dialogues d
    JOIN videos v ON d.video_id = v.id
    WHERE d.id = ?
  `, [dialogue_id]);

    if (!dialogueData[0]) return null;

    // Fetch dialogue lines + challenge ids
    const [dialogueLines] = await db.execute(`
    SELECT 
      l.id AS line_id, l.start_time_ms, l.end_time_ms,
      l.character_id, c.name AS character_name,
      l.sentence_id, s.written_form AS sentence_written_form, s.english_equivalent AS sentence_english_equivalent,
      l.challenge_id
    FROM dialogue_lines l
    LEFT JOIN characters c ON l.character_id = c.id
    LEFT JOIN sentences s ON l.sentence_id = s.id
    WHERE l.dialogue_id = ?
    ORDER BY l.start_time_ms
  `, [dialogue_id]);

    // Enrich each line: if it has a challenge, fetch the challenge with utilities
    const enrichedLines = await Promise.all(dialogueLines.map(async (l) => {
        let challenge = null;
        if (l.challenge_id) {
            // fetch challenge meta
            const [chRows] = await db.execute(
                `SELECT * FROM challenges WHERE id = ?`,
                [l.challenge_id]
            );
            if (chRows[0]) {
                const ch = chRows[0];
                challenge = {
                    id: ch.id,
                    media_question: ch.question,
                    media_type: ch.media_type,
                    challenge_type: ch.challenge_type,
                    word_id: ch.word_id,
                    sentence_id: ch.sentence_id,
                    content: {}
                };

                // fetch proper content
                switch (challenge.challenge_type) {
                    case 'match':
                        challenge.content = await fetchChallengeMatch(ch.id);
                        break;
                    case 'select':
                        challenge.content = await fetchChallengeSelect(ch.id);
                        break;
                    case 'sort':
                        challenge.content = await fetchChallengeSort(ch.id);
                        break;
                    default:
                        challenge.content = {};
                }
            }
        }

        let sentenceWords = [];
        if (l.sentence_id) {
            const [wordsRows] = await db.execute(
                `SELECT words.id, words.written_form, words.english_equivalent, 
                        words.transliteration, words.category,
                        words.image_url, words.audio_url, words_in_sentence.position
                 FROM words_in_sentence
                 JOIN words ON words_in_sentence.word_id = words.id
                 WHERE words_in_sentence.sentence_id = ?
                 ORDER BY words_in_sentence.position;`,
                [l.sentence_id]
            );
            sentenceWords = wordsRows;
        }

        return {
            start_time_ms: l.start_time_ms,
            end_time_ms: l.end_time_ms,
            character: l.character_id ? { id: l.character_id, name: l.character_name } : null,
            sentence: l.sentence_id
                ? {
                    id: l.sentence_id,
                    written_form: l.sentence_written_form,
                    english_equivalent: l.sentence_english_equivalent,
                    words: sentenceWords
                }
                : null,
            challenge
        };
    }));

    return {
        id: dialogueData[0].dialogue_id,
        video: {
            id: dialogueData[0].video_id,
            url: dialogueData[0].video_url,
            thumbnail: dialogueData[0].video_thumbnail,
            title: dialogueData[0].video_title
        },
        lines: enrichedLines
    };
}



export const getLessonFromDB = async (req, res) => {
    const lessonId = req.query.lesson_id;

    // get lesson data
    const lessonQuery = `
        SELECT lessons.id AS lesson_id, lessons.title AS lesson_title, lessons.type as lesson_type, lessons.lesson_order
        FROM lessons
        WHERE lessons.id = ?
    `
    const [lessonData] = await db.execute(lessonQuery, [lessonId]);

    if (lessonData[0].lesson_type === "challenges") {

        // Get all the challenges in the lesson
        const queryChallenges = `
        SELECT 
            challenges.*,
            challenges_in_lesson.challenge_order,

            -- word fields
            words.id AS word_id,
            words.written_form AS word_written_form,
            words.english_equivalent AS word_english_equivalent,
            words.transliteration AS word_transliteration,
            words.category AS word_category,
            words.image_url AS word_image_url,
            words.audio_url AS word_audio_url,

            -- sentence fields
            sentences.id AS sentence_id,
            sentences.written_form AS sentence_written_form,
            sentences.written_form2 AS sentence_written_form2,
            sentences.written_form3 AS sentence_written_form3,
            sentences.english_equivalent AS sentence_english_equivalent,
            sentences.transliteration AS sentence_transliteration,
            sentences.image_url AS sentence_image_url,
            sentences.audio_url AS sentence_audio_url

        FROM lessons
        JOIN challenges_in_lesson 
            ON challenges_in_lesson.lesson_id = lessons.id
        JOIN challenges 
            ON challenges_in_lesson.challenge_id = challenges.id

        -- join words/sentences directly via foreign keys on challenges
        LEFT JOIN words 
            ON challenges.word_id = words.id
        LEFT JOIN sentences 
            ON challenges.sentence_id = sentences.id

        WHERE lessons.id = ?
        ORDER BY challenges_in_lesson.challenge_order;
    `;

        const [rows] = await db.execute(queryChallenges, [lessonId]);

        const enriched = await Promise.all(rows.map(async row => {
            let challenge = {
                id: row.id,
                media_question: row.question,
                media_type: row.media_type,
                challenge_type: row.challenge_type,
                challenge_order: row.challenge_order,
                word: row.word_id ? {
                    id: row.word_id,
                    written_form: row.word_written_form,
                    english_equivalent: row.word_english_equivalent,
                    transliteration: row.word_transliteration,
                    category: row.word_category,
                    image_url: row.word_image_url,
                    audio_url: row.word_audio_url
                } : null,
                sentence: row.sentence_id ? {
                    id: row.sentence_id,
                    written_form: row.sentence_written_form,
                    written_form2: row.sentence_written_form2,
                    written_form3: row.sentence_written_form3,
                    english_equivalent: row.sentence_english_equivalent,
                    transliteration: row.sentence_transliteration,
                    image_url: row.sentence_image_url,
                    audio_url: row.sentence_audio_url
                } : null,
                content: {}
            };

            // If media_type is dialogue, fetch dialogue and lines
            if (row.media_type === 'dialogue' && row.dialogue_id) {
                challenge.dialogue = await fetchDialogue(row.dialogue_id);
            }

            switch (challenge.challenge_type) {
                case 'match':
                    challenge.content = await fetchChallengeMatch(challenge.id);
                    break;
                case 'select':
                    challenge.content = await fetchChallengeSelect(challenge.id);
                    break;
                case 'sort':
                    challenge.content = await fetchChallengeSort(challenge.id);
                    break;
                default:
                    challenge.content = [];
            }
            return challenge;
        }));
        return { ...lessonData[0], challenges: enriched };

    } else if (lessonData[0].lesson_type === "watch_video") {
        // find the dialogue id linked to this lesson
        const [dialogueRow] = await db.execute(
            `SELECT d.id AS dialogue_id
     FROM dialogues d
     WHERE d.lesson_id = ?`,
            [lessonId]
        );

        if (!dialogueRow[0]) return { ...lessonData[0], dialogue: null };

        const dialogue = await fetchDialogue(dialogueRow[0].dialogue_id);

        return {
            ...lessonData[0],
            dialogue
        };

    }
    else {
        return "no challenge type";
    }
}