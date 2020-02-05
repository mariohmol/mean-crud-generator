import * as dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT || 8080;
export const DATABASE_URL = process.env.DATABASE_URL || (process.env.NODE_ENV === 'production' ? 'mongodb://localhost/meancrudprod' : 'mongodb://localhost/meancrud');
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:4200/';