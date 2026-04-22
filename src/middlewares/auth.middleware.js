const {verifyAccessToken} = require('../utils/jwt.utils');

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: 'No token, authorization denied'});
    }

    const token = authHeader.split(' ')[1];
    try{
        const decodedToken = verifyAccessToken(token);
        req.user = decodedToken;
        next();
    } catch(error){
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({ message: 'Token expired', expired: true });
        }
        return res.status(401).json({message: 'Token is invalid'});
    }
};

module.exports = {protect};