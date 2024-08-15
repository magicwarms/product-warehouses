export default () => ({
    port: parseInt(process.env.APP_PORT, 9000) || 3000,
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 27018) || 27017,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
});