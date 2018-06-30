"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const users_1 = require("./routes/users");
const groups_1 = require("./routes/groups");
const messages_1 = require("./routes/messages");
const serverApp = express();
serverApp.use(express.json());
serverApp.use(cors());
serverApp.get("/", (req, res) => {
    res.send('Avast Ye sailor, server is running! time to travel Briny Deep');
});
serverApp.use('/users', users_1.default);
serverApp.use('/groups', groups_1.default);
serverApp.use('/messages', messages_1.default);
// serverApp.use('/Tree', )
serverApp.listen(4000, function () {
    console.log('server is running on:' +
        'http://localhost:4000/');
});
//# sourceMappingURL=index.js.map