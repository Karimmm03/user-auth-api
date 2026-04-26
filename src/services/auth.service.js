const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require('../utils/jwt.utils');
const {sendResetPasswordEmail} = require('../utils/email.utils');

const register = async ({name, email, password}) => {
    const existingUser = await User.findOne({email});
    if(existingUser){
        const error = new Error('Email already in use');
        error.statusCode = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const payload = {id: user.id, email: user.email};
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    return{
        accessToken,
        refreshToken,
        user: {id: user._id.toString(), name: user.name, email: user.email}
    };
};

const login = async ({email, password}) => {
    const user = await User.findOne({email});
    
    if(!user || !(await bcrypt.compare(password, user.password))){
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }

    const payload = {id: user.id, email: user.email};

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    return{
        accessToken,
        refreshToken,
        user: {id: user.id, name: user.name, email: user.email}
    };
};

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
        if (user){
            user.refreshToken = null;
            await user.save();
        }
        const error = new Error('Refresh token reuse detected — all sessions terminated');
        error.statusCode = 401;
        throw error;
    }

    const payload = {id: user.id, email: user.email};
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    user.refreshToken = newRefreshToken;
    await user.save();

    return{
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
};

const logout = async (userId) => {
    await User.findByIdAndUpdate(userId, {refreshToken: null});
};

const forgotPassword = async ({email}) => {
    const user = await User.findOne({email});

    if (!user) return;

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`;
    await sendResetPasswordEmail({to: user.email, resetUrl});
};

const resetPassword = async ({token, newPassword}) => {
    if (!token){
        const error = new Error('Reset token is required');
        error.statusCode = 400;
        throw error;
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()}
    });

    if (!user){
        const error = new Error('Reset token is invalid or has expired');
        error.statusCode = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    user.refreshToken = null;

    await user.save();
};

module.exports = {register, login, refresh, logout, forgotPassword, resetPassword};