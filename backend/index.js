const mongoose = require('mongoose');
const app = require('./app');
const {
    IP_SERVER,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    API_VERSION,
} = require('./constants');

const PORT = process.env.PORT || 3977;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pruebasoraca`)
.then(() => {
    app.listen(PORT, () => {
        console.log(`connect to server: `);
        console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
        console.log('');
    })
})
.catch((err) => {
    if (err) throw err; 
});