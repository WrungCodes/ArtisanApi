import jwtDecode from 'jwt-decode';
import model from '../models';
import {StatusResponse, findUser} from '../helpers';

const { user, profile } = model;

/**
 * @description - Handles profile getting, editing/updating
 * @returns {class}
 */
class Profile {

    static async getProfile(req, res)
    {
        const { username } = req.body

        let foundUser;

        if(username){
            foundUser = await findUser('username', username);
        }
        try {
            if(foundUser){
                const user = await profile.findOne({
                    where: {
                        userId: foundUser.id
                    },
                    attributes: { exclude: ['userId', 'createdAt', 'updatedAt','id'] },
                });
                StatusResponse.success(res, {
                    status: 200,
                    data: {
                        message: `${username} profile returned successfully`,
                        data: user
                    }
                });
            }
            else{
                StatusResponse.notfound(res, {
                    status: 404,
                    data: {
                        message: `no user like ${username}`
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

    static async updateProfile(req, res){

        const { username, firstname, lastname, phone, location, image}  = req.body;

        const token = req.headers.authorization;

        if(username !== jwtDecode(token).username){

            console.log(jwtDecode(token))
            StatusResponse.unauthorized(res, {
                status: 401,
                data: {
                    error: "Unauthorized Action"
                }
            })
        }
        const userProfile = await profile.findOne({
            where: {
                email: jwtDecode(token).email
            },
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        });
        
        try {
            if(userProfile){
                const updatedUserProfile = await userProfile.update({
                    firstName: firstname ? firstname : userProfile.firstName,
                    lastName: lastname ? lastname : userProfile.lastName,
                    image: image ? image : userProfile.image,
                    phone: phone ? phone : userProfile.phone,
                    location: location ? location : userProfile.location,
                });

                StatusResponse.success(res, {
                    status: 200,
                    data: {
                        message: `${username} profile successfully updated`,
                        data: updatedUserProfile
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

export default Profile;
