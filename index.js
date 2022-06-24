const app = require('./app');
const http = require('http');

const PORT = process.env.PORT || 8888;


http.createServer(app).listen(PORT,() => {
    console.log(`Server is running on ${PORT}`)
})