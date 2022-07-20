import './pre-start/index.js';
import app from './app.js';
import http from "http";

const port = (process.env.PORT || 8080);
const httpServer = http.createServer(app);

httpServer.listen(port, () => {
    console.log(`Express is working on port ${port}`);
})