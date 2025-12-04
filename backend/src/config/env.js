import dotenv from 'dotenv';

dotenv.config({quiet: true});

export const config = {
    PORT : process.env.PORT,
    DB_HOST : process.env.DB_HOST,
    DB_NAME : process.env.DB_NAME,
    DB_PASS : process.env.DB_PASS,
    DB_USER : process.env.DB_USER,
    NODE_ENV : process.env.NODE_ENV,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,

}