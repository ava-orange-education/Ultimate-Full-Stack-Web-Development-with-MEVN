import * as http from "http";
import * as https from "https";
import fs from 'fs'
import App from "./app";
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
import dbConfiguration from './src/config/db.config'
import mongoose, { Connection, Mongoose } from "mongoose";
import { LoggerService } from './src/logger/api.logger'

console.log('process.env.NODE_ENV  ', process.env.NODE_ENV)

const port = process.env.PORT || 3080;

 // Reading the SSL certificate and key
 //const privateKey = fs.readFileSync('./ssl/server.key', 'utf8');
 //const certificate = fs.readFileSync('./ssl/server.cert', 'utf8');

 //const credentials = { key: privateKey, cert: certificate };

//const server = https.createServer(credentials, App); //http.createServer(App);
const server = http.createServer(App); //http.createServer(App);
server.listen(port);

const logger = new LoggerService();

server.on("listening", async () => {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr?.port}`;
    dbConfiguration.connectToDB();
    logger.info(`Express Server Listening on ${bind}`);
    mongoose.connection.on('connected', () => 
        logger.info(`Connected to MongoDB, Connection Name ${mongoose.Connection.name}`)
    );
    mongoose.connection.on('disconnected', () => 
        logger.info(`Disconnected, Connection Name ${mongoose.Connection.name}`)
    );
 });

module.exports = App;