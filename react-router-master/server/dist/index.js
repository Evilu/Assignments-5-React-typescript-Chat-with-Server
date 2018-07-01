"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const users_1 = require("./routes/users");
const groups_1 = require("./routes/groups");
const messages_1 = require("./routes/messages");
const Tree_1 = require("./routes/Tree");
const GroupsToGroups_1 = require("./routes/GroupsToGroups");
const UsersToGroups_1 = require("./routes/UsersToGroups");
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
serverApp.use('/groupsToGroups', GroupsToGroups_1.default);
serverApp.use('/groupsToUsers', UsersToGroups_1.default);
serverApp.listen(4000, function () {
    console.log('server is running on:' +
        'http://localhost:4000/');
});
//# sourceMappingURL=index.js.map