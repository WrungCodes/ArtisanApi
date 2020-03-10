import model from '../models';

const { user } = model;

const findUser = async (key, value) => {
    const returnedUser = await user.findAndCountAll({
        where: {
            [key] : value,
        },
    });

    if (returnedUser.count < 1){
        return false;
    }
    if (returnedUser.count > 0){
        return returnedUser.rows[0].dataValues;
    }
}

const findProfile = async (key, value) => {
    const userProfile = await profile.findOne({
        where: {
            key: value.id
        },
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt','id'] },
    });
}

export default findUser;