import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import jwtDecode from 'jwt-decode';
import { StatusResponse } from '../helpers';

dotenv.config();

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;

    const token = req.headers.authorization;

    if(!authorization){
        StatusResponse.badRequest(res, {
            status: 400,
            data: {
                error: {
                    token: !authorization ? 'No token Provided' : ''
                }
            }
        })
    }
    else{
        try {
            var decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log('done')
            return next();
          } catch(error) {
            console.log('failed')
            StatusResponse.internalServerError(res, {
                status: 500,
                data: {
                    error: [`internal server error: ${error}`]
                }
            })
          }
    }
};

export default validateToken;