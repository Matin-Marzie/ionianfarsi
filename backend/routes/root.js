import path from 'path'
import express from 'express';

const router = express.Router()

// (.html)?   => make .html optional
router.get('^/$|index.(.html)?', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'index.html'))
})

router.get('/ionianfarsi', (req, res) => {
    res.redirect(301, '/');       // 302 by default
})

export default router;