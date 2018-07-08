"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const cors = require("cors");
const SocketIO_1 = require("./services/SocketIO");
const users_1 = require("./routes/users");
const groups_1 = require("./routes/groups");
const messages_1 = require("./routes/messages");
const Tree_1 = require("./routes/Tree");
const GroupsToGroups_1 = require("./routes/GroupsToGroups");
const UsersToGroups_1 = require("./routes/UsersToGroups");
const serverApp = express();
const httpServer = http.createServer(serverApp);
SocketIO_1.default(httpServer);
serverApp.use(express.json());
serverApp.use(cors());
serverApp.get("/", (req, res) => {
    res.send('Avast Ye sailor, server is running! time to travel Briny Deep');
});
serverApp.use('/users', users_1.default);
serverApp.use('/groups', groups_1.default);
serverApp.use('/messages', messages_1.default);
serverApp.use('/tree', Tree_1.default);
serverApp.use('/groupToGroup', GroupsToGroups_1.default);
serverApp.use('/GroupsToUsers', UsersToGroups_1.default);
httpServer.listen(4000, function () {
    console.log('server is running on:' +
        'http://localhost:4000/');
});
//# sourceMappingURL=index.js.map