import mysql from 'mysql2/promise';

export const handler = async (event) => {

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,      // your RDS endpoint
        user: process.env.DB_USER,      // your DB username
        password: process.env.DB_PASS,  // your DB password
        database: process.env.DB_NAME,  // "Recipe_Roulette_DB"
        port: 3306
    });

    if (event.path === "/api/get_accounts") {
        try {
            // Example: get all users
            const [rows] = await connection.execute('SELECT * FROM Users');
            await connection.end();

            return {
                statusCode: 200,
                body: JSON.stringify(rows)
            };
        } catch (error) {
            console.error('Database error:', error);
            return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
            };
        }
    }

    if (event.path === "/api/create_account") {

    }
}