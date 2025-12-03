import dotenv from 'dotenv';

dotenv.config({quiet: true});

export const config = {
    PORT : process.env.PORT,
    DB_HOST : process.env.DB_HOST,
    NODE_ENV : process.env.NODE_ENV,

}