import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT || 4000;
