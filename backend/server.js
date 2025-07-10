import express from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config';

import corsOptions from './config/corsOptions.js'
import credentials from './middleware/credentials.js'
import { logger } from './middleware/logEvents.js'
import errorHandler from './middleware/errorHandler.js'

import rootRouter from './routes/root.js'
import subdirRouter from './routes/subdir.js'
import registerRouter from './routes/register.js'
import authRouter from './routes/auth.js'
import refreshRouter from './routes/refresh.js'
import logoutRouter from './routes/logout.js'

import verifyJWT from './middleware/verifyJWT.js'
import db from './config/db.js'


const app = express()
const PORT = process.env.PORT || 3500

// custom middleware logger
app.use(logger)

app.use(credentials);
app.use(cors(corsOptions))

// build-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// build-in middleware for json
app.use(express.json())

// build-in middleware for cookies
app.use(cookieParser())

// server static files
app.use('/', express.static('public'));

app.use('/', rootRouter)
app.use('/subdir', subdirRouter)
app.use('/register', registerRouter)
app.use('/auth', authRouter)
app.use('/refresh', refreshRouter)
app.use('/logout', logoutRouter)

// app.use(verifyJWT);


// ######################################--UNCHANGED--IONIANFARSI--#######################################################

// // joi: Validates api parameters
import Joi from 'joi';
// import { resolve } from 'path';


// // ||-------------------------------------------------------REST-API-------------------------------------------------------||

// ||-----------------letters----------||
// get letter sounds
app.get("/letters/pronounciation", async (req, res) => {
    console.log('GET /letters/pronounciation');

    const sql_query = `SELECT letter.writing_style AS written_form, letter.audio_url FROM letter WHERE 1;`;

    try {
        const [results] = await db.execute(sql_query);
        res.json(results);
    } catch (err) {
        console.error("Error fetching letters:", err);
        res.status(500).json({ error: "Error fetching lessons" });
    }
});



// // ||-----------------Vocabulary-page----------||
// // Get words of each lesson of firststep book
// // Use Query params
// // Input: lesson_id

app.get("/vocabulary", async (req, res) => {
    console.log(`GET /vocabulary/?id=${req.query.id}`);

    const schema = Joi.object({
        id: Joi.number().integer().min(1).max(17).required()
    });

    const Joi_validation_result = schema.validate({ id: req.query.id });

    if (Joi_validation_result.error) {
        res.status(400).send(Joi_validation_result.error.details[0].message);
        return;
    }

    const lesson_number = [req.query.id];

    const query1 = `
        SELECT letter.id 
        FROM letter
        JOIN firststep_lesson ON letter.lesson_id = firststep_lesson.number
        WHERE firststep_lesson.number = ?
        ORDER BY letter.id
    `;

    try {
        const [letters] = await db.execute(query1, lesson_number);

        const results = await Promise.all(
            letters.map(async (letter) => {
                const query2 = `
                    SELECT w.*
                    FROM word w
                    JOIN letters_taught_in_firststep_lesson t ON t.word_id = w.id
                    JOIN letter l ON t.letter_id = l.id
                    WHERE l.id = ?;
                `;

                const [words] = await db.execute(query2, [letter.id]);
                return { letter_id: letter.id, words };
            })
        );

        res.json(results);
    } catch (err) {
        console.error("Error fetching vocabulary:", err);
        res.status(500).json({ error: "Error fetching vocabulary" });
    }
});


// // ||--------------------Lessons-----------------||
// // Returns all information about lessons exists in firststep book
app.get('/firststep/lessons', async (req, res) => {
    console.log('GET /firststep/lessons');

    const sql_query = 'SELECT * FROM firststep_lesson';

    try {
        const [results] = await db.execute(sql_query);
        res.json(results);
    } catch (err) {
        console.error("Error fetching lessons:", err);
        res.status(500).json({ error: "Error fetching lessons" });
    }
});




// // ||-------------------Exercise-page------------------||
// // Returns 6 random words from the given lesson_id of firststep book.
app.post('/six-random-words', async (req, res) => {
    console.log('POST /six-random-words');

    const lesson_id = req.body.lesson_id;
    if (!lesson_id) {
        return res.status(400).send('Lesson id is required.');
    }

    const sql_query = `
        SELECT word.*
        FROM word
        JOIN letters_taught_in_firststep_lesson ON letters_taught_in_firststep_lesson.word_id = word.id
        JOIN letter ON letters_taught_in_firststep_lesson.letter_id = letter.id
        WHERE letter.lesson_id = ?
        ORDER BY RAND()
        LIMIT 6;
    `;

    try {
        const [words] = await db.execute(sql_query, [lesson_id]);
        res.json(words);
    } catch (err) {
        console.error('Database query Error:', err);
        res.status(500).json({ error: 'Database query Error' });
    }
});



// // ||--------------------Sections-----------------||
// // Returns all sections
app.get('/sections', async (req, res) => {
    console.log('GET /sections');

    const sql_query = 'SELECT * FROM section';

    try {
        const [results] = await db.execute(sql_query);
        res.json(results);
    } catch (err) {
        console.error("Error fetching sections:", err);
        res.status(500).json({ error: "Error fetching sections" });
    }
});


// // ||-------------------Lessons---------------------||
// // Input: section id
app.get('/lessons', async (req, res) => {
    console.log(`GET /lessons?section_id=${req.query.section_id}`);

    const schema = Joi.object({
        section_id: Joi.number().integer().min(1).max(100).required()
    });

    const joi_validation_result = schema.validate({ section_id: req.query.section_id });

    if (joi_validation_result.error) {
        res.status(400).send(joi_validation_result.error.details[0].message);
        return;
    }

    const query_parameters = [req.query.section_id];
    const sql_query = `
        SELECT lesson.*, unit.title as unit_title, unit.unit_order
        FROM lesson
        JOIN unit ON lesson.unit_id = unit.id
        WHERE unit.section_id = ?
        ORDER BY lesson.unit_id, lesson.lesson_order;
    `;

    try {
        const [lessons] = await db.execute(sql_query, query_parameters);
        res.json(lessons);
    } catch (err) {
        console.error("Error fetching Lessons: ", err);
        res.status(500).json({ error: "Error fetching lessons" });
    }
});



// // ||-------------------Lessons---------------------||
// // Input: lesson id

app.get('/lesson', async (req, res) => {
    console.log(`GET /lesson?lesson_id=${req.query.lesson_id}`);

    // Parameters validation
    const schema = Joi.object({
        lesson_id: Joi.number().integer().min(1).max(15).required()
    });

    const { error } = schema.validate({ lesson_id: req.query.lesson_id });

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const lessonId = req.query.lesson_id;

    // Get all the challenges(data) in the lesson
    const queryChallenges = `
        SELECT challenge.*
        FROM lesson
        JOIN challenges_in_lesson ON challenges_in_lesson.lesson_id = lesson.id
        JOIN challenge ON challenges_in_lesson.challenge_id = challenge.id
        WHERE lesson.id = ?
        ORDER BY challenge.challenge_order;
    `;

    try {
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

        res.json(enrichedChallenges);

    } catch (err) {
        console.error("Error in /lesson:", err);
        res.status(500).json({ error: "Error fetching lesson data" });
    }
});


// // ################################################################################################################


// Route not found
app.all('*', (req, res) => {
    if (req.accepts('html')) {
        res.status(404).sendFile(path.join(process.cwd(), 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 not found" });
    } else {
        res.type('txt').send("404 not found");
    }
})

// custom error handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})