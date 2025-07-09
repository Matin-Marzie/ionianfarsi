// date-fns: Change dates format, ex: format(new Date(), 'yyyyMMdd\tHH:mm:ss')
import { format } from 'date-fns';

// uuid: generated unique ids, v4 is a specific version of uuid, ex: uuid() returns 8002e729-7ae5-47e6-b765-78b02310a15f
import { v4 as uuid } from 'uuid';

// fs: abbreviation of filesystem which provides functions for manipulation of files in the system, ex: fs.readFile(), fs.writeFile()
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
const logs_Path = path.join(process.cwd(), 'logs');


export const logEvents = async (message, fileName) => {
    // ex. 28/06/2025      09:37:00        69cdbc69-6c6d-4f78-9f16-7d65e269004d    username:Matin-Marzie Logged in
    const eventLine = `${format(new Date(), 'dd/MM/yyyy\tHH:mm:ss')}\t${uuid()}\t${message}\n`

    try {
        // Check if logs folder exists
        if (!fs.existsSync(path.join(logs_Path))) {
            // Create folder if it doesn't exists
            await fsPromises.mkdir(path.join(logs_Path))
        }
        await fsPromises.appendFile(path.join(logs_Path, fileName), eventLine);
    } catch (error) {
        console.error(error)
    }
}


export const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'requestsLog.txt')
    console.log(`${req.method}\t${req.path}`)
    next()
}