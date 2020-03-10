import bcrypt from 'bcryptjs';
import model from '../models'
import dotenv from 'dotenv';
import { generateToken, StatusResponse, findUser, sendMails, generateUuid } from '../helpers'

const { user, profile } = model;
dotenv.config();


/**
 * @description - Takes Care of authenticating a users for sign up, sign in, logout
 * @returns {class}
 */
class Auth
{
    /**
     * @description Signs up a user
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {JSON} users data
     */
    static async signUp(req, res)
    {
        const {username, email, password} = req.body;

        //Generate a bcrypt salt and hash the password with the salt 
        const genSalt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, genSalt);
        
        try {
            //generate verification building
            const uuid = generateUuid('xxxx-xxxx-xxxx-xxxx');
            const token = generateToken(username, email);
            const randToken = token + uuid;

            //Create a new User
            const newUser = await user.create({
                verify_token: randToken,
                username,
                email,
                password: hashedPassword,
                
            });
            
            let link = `${process.env.API_URL}/user/verify?id=${randToken}`;
            let subject = 'Artisan Email Verification';
            let message = `Hello ${username}, please verify your account`;
            let html = `<a href=${link}> Click Here </a>`;

            //send mail to useremail
            const verificationemail = sendMails(email, subject, message, html);
            
            //Generate Token using Username and email
            const payload = {
                status: 201,
                data: {
                    message: `hello ${username}, An email has been sent to ${email} please verify it is your email`,
                    // token,
                }
            };
            StatusResponse.created(res, payload);

        } catch (error) {
            StatusResponse.internalServerError(res, {
                status: StatusResponse.CODE_NOT_FOUND,
                data: {
                    error: [`internal server error: ${error}`]
                }
            })
        }
    }


    /**
     * @description - generate a token for the user 
     * @param {object} req 
     * @param {object} res 
     * @returns {JSON} user data
     */
    static async logIn(req, res)
    {
        const {email, username, password} = req.body;

        let foundUser;
        if (email){
            foundUser = await findUser('email', email);
        }
        else{
            foundUser = await findUser('username', username);
        }

        try {
            if(foundUser && !bcrypt.compareSync(password, foundUser.password)){
                StatusResponse.unauthorized(res, {
                    status: 401,
                    data: {
                        message: email ? 'Invalid Email or Password' : 'Invalid Username or Password'
                    }
                })
            }
            else if(foundUser && foundUser.verify_token !== null){
                StatusResponse.unauthorized(res, {
                    status: 401,
                    data: {
                        message: `Please verify your account at ${foundUser.email} before login`
                    }
                })
            }
            else{
                StatusResponse.success(res, {
                    status: 200,
                    data: {
                        message: `Welcome ${foundUser.username}`,
                        token: generateToken(foundUser.email, foundUser.username),
                    }
                })
            }
        } catch (error) {
            StatusResponse.internalServerError(res, {
                status: 500,
                data: {
                    error: [`internal server error: ${error}`]
                }
            })
        }
    }

    /**
     * @description - verify the user email 
     * @param {object} req 
     * @param {object} res 
     * @returns {JSON} json response and redirect link
     */
    static async verify(req, res)
    {
        const id = req.query.id;

        let foundUser;
        if (id){
            foundUser = await findUser('verify_token', id);
        }
        
        if(!foundUser){
            StatusResponse.notfound(res, {
                status: 404,
                data: {
                    message: 'invalid verification token'
                }
            });
        }

        try {
            if(foundUser){
                const current_user = await user.findOne({
                    where: {
                        verify_token: id
                    }
                })

                //Create a new User Profile
                const newUserProfile = await profile.create({
                    email: foundUser.email,
                    userId: foundUser.id
                });

                const updatedUsersService = await current_user.update({verify_token: null})

                StatusResponse.success(res, {
                    status: 200,
                    data: {
                        message: `Welcome ${foundUser.username}, Your account has been verified, you can login now`,
                    }
                });
            }

        } catch (error) {
            StatusResponse.internalServerError(res, {
                status: 500,
                data: {
                    error: [`internal server error: ${error}`]
                }
            })
        }

    }
}

export default Auth;