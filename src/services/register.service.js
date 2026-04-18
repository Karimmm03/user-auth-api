const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

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

    return{
        id: user._id.toString(),
        name: user.name,
        email: user.email
    };
};

module.exports = register;