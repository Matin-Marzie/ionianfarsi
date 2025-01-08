import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import express, { response } from 'express';

const app = express();
const PORT = 8081;

// It is used for bcrypt
const SALT = 9;

//To parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// The public folder will be accessible to everyone
app.use(express.static('public'));

let db;

function handleDisconnect() {
    db = mysql.createConnection({
        host: "sql7.freemysqlhosting.net",
        user: "sql7751703",
        // Password has been deleted
        password: "",

        // The name of the database
        database: "sql7751703"
    });

    db.connect((err) => {
        if (err) {
            console.error('Database connection error:', err);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('Connected to MySQL');
        }
    });

    db.on('error', (err) => {
        console.error('MySQL error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            console.log('Reconnecting to MySQL...');
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

// Testing if api works
app.get("/api/ok", (req, res) => {
    res.send('ok');
    console.log('GET /api/ok');
})

// ||--------------------Register-page----------||

app.post("/register", (req, res) => {
    console.log('POST /register');
    // We save hash of password
    bcrypt.hash(req.body.password.toString(), SALT, (err, hashed_password) => {
        if (err) return res.json({ Error: "Error while hashing the password" });
        const values = [
            req.body.name,
            req.body.email,
            hashed_password
        ]
        const sql_query = 'INSERT INTO users (`name`, `email`, `password`) VALUES (?)';

        db.query(sql_query, [values], (err, result) => {
            if (err) return res.json({ Error: "Insertion Data error" });
            return res.json({ Status: "Success" });
        })
    });
});

// ||--------------------Used-for-Vocabulary-page----------||
// Input: lesson_id
app.post('/vocabulary', (req, res) => {
    console.log('POST /vocabulary');

    const lesson_number = [req.body.lesson_id];

    // In each lesson some Farsi Letters are being tought 
    // First query to get letter IDs for the specified lesson
    const query1 = 'SELECT Letter.id FROM Letter, Lesson WHERE Letter.lesson_id = Lesson.number AND Lesson.number = ? ORDER BY Letter.id';

    db.query(query1, lesson_number, (err, letters) => {
        if (err) {
            console.error("Error fetching letters:", err);
            return res.status(500).json({ error: "Error fetching letters" });
        }

        // With each letter some words being taught, we get that words from db
        // Map over the letter IDs and create a promise for each secondary query
        const letterQueries = letters.map(letter => {
            const query2 = `
                SELECT w.*
                FROM Word w
                JOIN letter_taught_with t ON t.word_id = w.id
                JOIN Letter l ON t.letter_id = l.id
                WHERE l.id = ?
            `;

            return new Promise((resolve, reject) => {
                db.query(query2, [letter.id], (err, words) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ letter_id: letter.id, words });
                    }
                });
            });
        });

        // Run all letter queries and collect the results
        Promise.all(letterQueries)
            .then(results => res.json(results))
            .catch(error => {
                console.error("Error fetching words Promise:", error);
                res.status(500).json({ error: "Error fetching words" });
            });
    });
});

// ||--------------------Lessons-----------------||
// Returns all lessons
app.get('/lessons', (req, res) => {
    console.log('GET /lessons');
    const sql_query = 'SELECT * FROM Lesson';

    db.query(sql_query, (err, results) => {
        if (err) {
            console.error("Error fetching lessons:", err);
            return res.status(500).json({ error: "Error fetching lessons" });
        }
        res.json(results);
    });
});

// ||-------------------Exercise-page------------------||
// Returns 6 random words from the given lesson_id
app.post('/six-random-words', (req, res) => {
    console.log('POST /six-random-words');

    const sql_query = `SELECT Word.*
                        FROM
                        	Word
                        JOIN
                        	letter_taught_with ON letter_taught_with.word_id = Word.id
                        JOIN
                        	Letter ON letter_taught_with.letter_id = Letter.id
                        WHERE Letter.lesson_id = ?
                        ORDER BY RAND()
                        LIMIT 6;`;
    const lesson_id = req.body.lesson_id;

    db.query(sql_query, lesson_id, (db_err, words) => {
        if (db_err) {
            return res.status(500).json({ error: 'Database query Error' });
        }
        res.json(words);
    })
})

// بزن بریم
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});