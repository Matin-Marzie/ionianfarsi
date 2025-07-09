import path from 'path'
import express from 'express';

const router = express.Router()

router.get('^/$|index.(.html)?', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'subdir', 'index.html'))
})

router.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'subdir', 'test.html'))
})

export default router;