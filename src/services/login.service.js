const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../utils/jwt.utils');

const login = async ({email, password}) => {
    const user = await User.findOne({email});
    
    if(!user || !(await bcrypt.compare(password, user.password))){
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken({id: user.id, email: user.email})

    return{
        token,
        user: {id: user.id, name: user.name, email: user.email}
    };
};

module.exports = login;