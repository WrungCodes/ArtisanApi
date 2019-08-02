import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


/**
 * @description - generates token
 * @param {string} email 
 * @param {string} username 
 * @return {string} - token
 */
const generateToken = (email, username) => {
    const token = jwt.sign(
        {
            email,
            username
        },
        process.env.SECRET_KEY,
        {
            expiresIn: 86400
        }
    );

    return token
}

export default generateToken;
