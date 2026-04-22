const User = require('../models/user.model');
const {
    generateAccessToken,
    verifyRefreshToken,
} = require('../utils/jwt.utils');

const refresh = async ({refreshToken}) => {
    if(!refreshToken){
        const error = new Error('Refresh token required');
        error.statusCode = 401;
        throw error;
    }

    let decodedToken;
    try{
        decodedToken = verifyRefreshToken(refreshToken);
    } catch{
        const error = new Error('Invalid or expired refresh token');
        error.statusCode = 401;
        throw error;
    }

    const user = await User.findById(decodedToken.id);
    if(!user || user.refreshToken !== refreshToken){
        const error = new Error('Refresh token not recognized');
        error.statusCode = 401;
        throw error;
    }

    const accessToken = generateAccessToken({id: user.id, email: user.email});
    return {accessToken};
};

module.exports = refresh;