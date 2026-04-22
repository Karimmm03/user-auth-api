const refreshService = require('../services/refresh.service');

const refresh = async (req, res) => {
    try{
        const data = await refreshService(req.body);
        res.status(200).json(data);
    } catch(error) {
        res.status(error.statusCode || 500).json({message: error.message});
    }
};

module.exports = refresh;