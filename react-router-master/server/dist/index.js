"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const socket = require('socket.io');
const users_1 = require("./routes/users");
const groups_1 = require("./routes/groups");
const messages_1 = require("./routes/messages");
const Tree_1 = require("./routes/Tree");
// import groupToGroupRouter from './routes/GroupsToGroups'
// import groupToUserRouter from './routes/UsersToGroups'
const serverApp = express();
serverApp.use(express.json());
serverApp.use(cors());
serverApp.get("/", (req, res) => {
    res.send('Avast Ye sailor, server is running! time to travel Briny Deep');
});
serverApp.use('/users', users_1.default);
serverApp.use('/groups', groups_1.default);
serverApp.use('/messages', messages_1.default);
serverApp.use('/tree', Tree_1.default);
let server = serverApp.listen(4000, function () {
    console.log('server is running on:' +
        'http://localhost:4000/');
});
let io = socket(server);
io.on('connection', function (socket) {
    console.log('socket connected');
});
//# sourceMappingURL=index.js.map