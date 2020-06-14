const http = require('http')
const app = require('./api/app')
const dotenv = require('dotenv')
dotenv.config()
const server = http.createServer(app)
const port = process.env.PORT

server.listen(port, () => {
    console.log(`server is up on port ${port}`);

})