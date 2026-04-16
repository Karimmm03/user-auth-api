require('dotenv').config();

const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const connectDB = require('./src/config/db');

const startServer = async () => {
    try{
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(error){
        console.error(`Failed to start server: ${error}`);
    }
};

startServer();