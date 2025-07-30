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

import usersRouter from './routes/api/users.js'
import sectionsRouter from './routes/api/sections.js'
import lessonRouter from './routes/api/lessons.js'
import lettersRouter from './routes/api/letters.js'
import vocabularyRouter from './routes/api/vocabulary.js'

import verifyJWT from './middleware/verifyJWT.js'


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

app.use('/api/sections', sectionsRouter);

app.use('/api/lessons', lessonRouter);

app.use("/api/letters", lettersRouter);

app.use(verifyJWT); // AUTHENTICATION

app.use('/api/users', usersRouter);

app.use("/api/vocabulary", vocabularyRouter);

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
  console.log(`Server running at :${PORT}`);
});
