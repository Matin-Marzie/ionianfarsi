import db from '../config/db.js';

export const getSectionsFromDb = async () => {
    const sql_query = 'SELECT * FROM section';

    const [results] = await db.execute(sql_query);
    return results;
}