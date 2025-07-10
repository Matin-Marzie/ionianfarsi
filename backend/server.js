import express from 'express'
import path from 'path'
import cors from 'cors'
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
import cookieParser from 'cookie-parser'
import 'dotenv/config';

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
// import Joi from 'joi';
// import { resolve } from 'path';

// import mysql from 'mysql';




// // ||-------------------------------------------------------DATABSE-------------------------------------------------------||
// let db;

// function handleDisconnect() {
//     db = mysql.createConnection({
//         host: process.env.DATABASE_HOST,
//         user: process.env.DATABASE_USER,
//         password: process.env.DATABASE_PASSWORD,

//         // The name of the database
//         database: process.env.DATABASE_NAME
//     });

//     db.connect((err) => {
//         if (err) {
//             console.error('Database connection error:', err);
//             setTimeout(handleDisconnect, 2000);
//         } else {
//             console.log('Connected to MySQL');
//         }
//     });

//     db.on('error', (err) => {
//         console.error('MySQL error', err);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
//             console.log('Reconnecting to MySQL...');
//             handleDisconnect();
//         } else {
//             throw err;
//         }
//     });
// }

// handleDisconnect();

// // ||-------------------------------------------------------AUTHENTICATION-------------------------------------------------------||
// // ||--------------------Register-page----------||

// //         const sql_query = 'INSERT INTO users (`username`, `email`, `password`) VALUES (?)';

// //         db.query(sql_query, [values], (err, result) => {
// //             if (err) return res.json({ Error: "Insertion Data error" });
// //             return res.json({ Status: "Success" });
// //         })


// // ||-------------------------------------------------------REST-API-------------------------------------------------------||
// // ||-----------------Testing-if-api-works-----------------||
// app.get("/api/ok", (req, res) => {
//     res.send('ok');
//     console.log('GET /api/ok');
//     handleDisconnect();
// })


// // ||-----------------letters----------||
// // get letter sounds
// app.get("/letters/pronounciation", (req, res) => {
//     console.log('GET /letters/pronounciation');

//     const sql_query = `SELECT letter.writing_style AS written_form, letter.audio_url FROM letter WHERE 1;`;

//     db.query(sql_query, (err, results) => {
//         if (err) {
//             console.error("Error fetching letters:", err);
//             return res.status(500).json({ error: "Error fetching lessons" });
//         }
//         res.json(results);
//     });
// });


// // ||-----------------Vocabulary-page----------||
// // Get words of each lesson of firststep book
// // Use Query params
// // Input: lesson_id
// app.get("/vocabulary", (req, res) => {
//     console.log(`GET /vocabulary/?id=${req.query.id}`);

//     const schema = Joi.object({
//         id: Joi.number().integer().min(1).max(17).required()
//     })

//     const Joi_validation_result = schema.validate({ id: req.query.id });

//     if (Joi_validation_result.error) {
//         res.status(400).send(Joi_validation_result.error.details[0].message);
//         return;
//     }

//     const lesson_number = [req.query.id];

//     // In each firststep book lesson, some Farsi Letters are being tought 
//     // Query to get letter IDs for the specified lesson
//     const query1 = 'SELECT letter.id FROM letter, firststep_lesson WHERE letter.lesson_id = firststep_lesson.number AND firststep_lesson.number = ? ORDER BY letter.id';

//     db.query(query1, lesson_number, (err, letters) => {
//         if (err) {
//             console.error("Error fetching letters:", err);
//             return res.status(500).json({ error: "Error fetching letters" });
//         }

//         // With each letter some words being taught, we get that words from db
//         // Map over the letter IDs and create a promise for each secondary query
//         const letterQueries = letters.map(letter => {
//             const query2 = `
//                 SELECT w.*
//                 FROM word w
//                 JOIN letters_taught_in_firststep_lesson t ON t.word_id = w.id
//                 JOIN letter l ON t.letter_id = l.id
//                 WHERE l.id = ?;
//             `;

//             return new Promise((resolve, reject) => {
//                 db.query(query2, [letter.id], (err, words) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve({ letter_id: letter.id, words });
//                     }
//                 });
//             });
//         });

//         // Run all letter queries and collect the results
//         Promise.all(letterQueries)
//             .then(results => res.json(results))
//             .catch(error => {
//                 console.error("Error fetching words Promise:", error);
//                 res.status(500).json({ error: "Error fetching words" });
//             });
//     });
// });

// // ||--------------------Lessons-----------------||
// // Returns all information about lessons exists in firststep book
// app.get('/firststep/lessons', (req, res) => {
//     console.log('GET /lessons');

//     const sql_query = 'SELECT * FROM firststep_lesson';

//     db.query(sql_query, (err, results) => {
//         if (err) {
//             console.error("Error fetching lessons:", err);
//             return res.status(500).json({ error: "Error fetching lessons" });
//         }
//         res.json(results);
//     });
// });



// // ||-------------------Exercise-page------------------||
// // Returns 6 random words from the given lesson_id of firststep book.
// app.post('/six-random-words', (req, res) => {
//     console.log('POST /six-random-words');

//     if (!req.body.lesson_id) {
//         res.status(400).send('Lesson id is required.');
//         return;
//     }

//     const sql_query = `SELECT word.*
//                         FROM
//                         	word
//                         JOIN
//                         	letters_taught_in_firststep_lesson ON letters_taught_in_firststep_lesson.word_id = word.id
//                         JOIN
//                         letter ON letters_taught_in_firststep_lesson.letter_id = letter.id
//                         WHERE letter.lesson_id = ?
//                         ORDER BY RAND()
//                         LIMIT 6;`;
//     const lesson_id = req.body.lesson_id;

//     db.query(sql_query, lesson_id, (db_err, words) => {
//         if (db_err) {
//             return res.status(500).json({ error: 'Database query Error' });
//         }
//         res.json(words);
//     })
// })


// // ||--------------------Sections-----------------||
// // Returns all sections
// app.get('/sections', (req, res) => {
//     console.log('GET /sections');
//     const sql_query = 'SELECT * FROM section';

//     db.query(sql_query, (err, results) => {
//         if (err) {
//             console.error("Error fetching sections:", err);
//             return res.status(500).json({ error: "Error fetching sections" });
//         }
//         res.json(results);
//     });
// });

// // ||-------------------Lessons---------------------||
// // Input: section id
// app.get('/lessons', (req, res) => {
//     console.log(`GET /lessons?section_id=${req.query.section_id}`)

//     const schema = Joi.object({
//         section_id: Joi.number().integer().min(1).max(100).required()
//     })

//     const joi_validation_result = schema.validate({ section_id: req.query.section_id })

//     if (joi_validation_result.error) {
//         res.status(400).send(joi_validation_result.error.details[0].message);
//         return;
//     }

//     const query_parametes = [req.query.section_id];
//     const sql_query = `SELECT lesson.*, unit.title as unit_title, unit.unit_order
//                        FROM lesson
//                        JOIN unit ON lesson.unit_id = unit.id
//                        WHERE unit.section_id = ?
//                        ORDER BY lesson.unit_id, lesson.lesson_order;`;


//     db.query(sql_query, query_parametes, (err, lessons) => {
//         if (err) {
//             console.error("Error fetching Lessons: ", err);
//             return res.status(500).json({ error: "Error fetching lessons" });
//         }

//         res.json(lessons);

//     });
// })


// // ||-------------------Lessons---------------------||
// // Input: lesson id
// app.get('/lesson', (req, res) => {
//     console.log(`GET /lesson?lesson_id=${req.query.lesson_id}`)

//     // Parameters validation
//     const schema = Joi.object({
//         lesson_id: Joi.number().integer().min(1).max(15).required()
//     })

//     const joi_validation_result = schema.validate({ lesson_id: req.query.lesson_id })

//     if (joi_validation_result.error) {
//         res.status(400).send(joi_validation_result.error.details[0].message);
//         return;
//     }

//     const query_get_challenges_params = [req.query.lesson_id];
//     const query_get_challenges = `SELECT challenge.*
//                                   FROM lesson
//                                   JOIN challenges_in_lesson ON challenges_in_lesson.lesson_id = lesson.id
//                                   JOIN challenge ON challenges_in_lesson.challenge_id = challenge.id
//                                   WHERE lesson.id = ?
//                                   ORDER BY challenge.challenge_order;`

//     // Get all the challenges(data) in the lesson
//     db.query(query_get_challenges, query_get_challenges_params, (err, challenges) => {
//         if (err) {
//             console.error("Error fetching letters:", err);
//             return res.status(500).json({ error: "Error fetching letters" });
//         }

//         // Get the content of each challenge
//         const promised_output = challenges.map((challenge) => {


//             switch (challenge.type) {
//                 // --------------------challenge_match--------------------
//                 case 'challenge_match':
//                     return new Promise((resolve, reject) => {
//                         const query_get_challenge_content = `SELECT challenge_match.type as match_type, word.* 
//                                                    FROM challenge_match
//                                                    JOIN words_in_challenge_match ON words_in_challenge_match.challenge_match_id = challenge_match.id
//                                                    JOIN word ON words_in_challenge_match.word_id = word.id
//                                                    WHERE challenge_match.challenge_id = ?;`;
//                         db.query(query_get_challenge_content, [challenge.id], (err, challenge_content) => {
//                             if (err) {
//                                 reject(err);
//                             } else {
//                                 resolve({ ...challenge, content: challenge_content });
//                             }
//                         })

//                     })


//                 // --------------------challenge_select--------------------
//                 case 'challenge_select':
//                     return new Promise((resolve, reject) => {
//                         // Get challenge_select info
//                         const query_challenge_select = `
// SELECT 
//     challenge_select.type AS select_type, 
//     challenge_select.question AS select_question, 
    
//     word.written_form AS word_written_form,
//     word.english_equivalent AS word_english_equivalent,
//     word.image_url AS word_image_url, 
//     word.audio_url AS word_audio_url, 
    
//     sentence.written_form AS sentence_written_form,
//     sentence.english_equivalent AS sentence_english_equivalent,
//     sentence.image_url AS sentence_image_url, 
//     sentence.audio_url AS sentence_audio_url
   
// FROM challenge_select
// LEFT JOIN word ON challenge_select.word_id = word.id
// LEFT JOIN sentence ON challenge_select.sentence_id = sentence.id
// WHERE challenge_select.challenge_id = ?
// AND (challenge_select.word_id IS NOT NULL OR challenge_select.sentence_id IS NOT NULL);
// `;

//                         db.query(query_challenge_select, [challenge.id], (err, challenge_select) => {
//                             if (err) {
//                                 return reject(err);
//                             }

//                             if (challenge_select.length === 0) {
//                                 return resolve({ options: [] }); // No challenge_select found
//                             }

//                             // Get Challenge select options
//                             const query_select_options = `
// SELECT 
// 	challenge_select_option.id AS option_id,
//     challenge_select_option.correct,
//     word.*
// FROM challenge_select
// JOIN options_in_challenge_select ON options_in_challenge_select.challenge_select_id = challenge_select.id
// JOIN challenge_select_option ON options_in_challenge_select.challenge_select_option_id = challenge_select_option.id
// JOIN word ON challenge_select_option.word_id = word.id
// WHERE challenge_select.challenge_id = ?
// ORDER BY RAND();`;

//                             db.query(query_select_options, [challenge.id], (err, challenge_select_options) => {
//                                 if (err) {
//                                     return reject(err);
//                                 }

//                                 resolve({
//                                     ...challenge,
//                                     ...challenge_select[0],
//                                     options: challenge_select_options
//                                 });
//                             });
//                         });
//                     });


//                 // --------------------challenge_sort--------------------
//                 case 'challenge_sort':
//                     return new Promise((resolve, reject) => {
//                         const query_get_challenge_sort = `
// SELECT
// challenge_sort.type AS sort_type,

// 	word.written_form AS word_written_form,
//     word.english_equivalent AS word_english_equivalent,
//     word.image_url AS word_image_url, 
//     word.audio_url AS word_audio_url, 
    
//     sentence.written_form AS sentence_written_form,
//     sentence.written_form2 AS sentence_written_form2,
//     sentence.written_form3 AS sentence_written_form3,
//     sentence.english_equivalent AS sentence_english_equivalent,
//     sentence.image_url AS sentence_image_url, 
//     sentence.audio_url AS sentence_audio_url,
//     sentence.id AS sentence_id


// FROM challenge_sort
// LEFT JOIN sentence ON challenge_sort.sentence_id = sentence.id
// LEFT JOIN word ON challenge_sort.word_id = word.id

// WHERE challenge_sort.challenge_id = ?
// 		AND 
//       (challenge_sort.sentence_id IS NOT NULL OR challenge_sort.word_id IS NOT NULL);`;

//                         db.query(query_get_challenge_sort, [challenge.id], (err, challenge_sort) => {
//                             if (err) {
//                                 reject(err);
//                             } else {

//                                 if (challenge_sort[0].sentence_id) {
//                                     const query_get_words_in_sentence = `
// SELECT word.*
// FROM sentence
// 	JOIN words_in_sentence ON words_in_sentence.sentence_id = sentence.id
//     JOIN word ON words_in_sentence.word_id = word.id
// WHERE sentence_id = ?;`
//                                     db.query(query_get_words_in_sentence, [challenge_sort[0].sentence_id], (err, sentence_words) => {
//                                         if (err) {
//                                             reject(err);
//                                         }
//                                         else {
//                                             resolve({
//                                                 ...challenge,
//                                                 ...challenge_sort[0],
//                                                 sentence_words: sentence_words
//                                             });
//                                         }
//                                     });
//                                 }
//                                 else {

//                                     resolve({
//                                         ...challenge,
//                                         ...challenge_sort[0]
//                                     });
//                                 }
//                             }
//                         })

//                     })


//                 default:
//                     return resolve({ ...challenge, content: [] });
//             }
//         })

//         Promise.all(promised_output)
//             .then(results => res.json(results))
//             .catch(error => {
//                 console.error("Error fetching challenge_content Promises:", error);
//                 res.status(500).json({ error: "Error fetching words" })
//             });


//     })
// })

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