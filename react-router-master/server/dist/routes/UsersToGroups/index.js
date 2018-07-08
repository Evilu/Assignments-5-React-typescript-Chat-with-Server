"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const GroupsToUsers_1 = require("../../models/GroupsToUsers");
const router = express.Router();
router.get('/', (req, res) => {
    GroupsToUsers_1.groupsInUsers.getGroupstoUsers()
        .then(() => {
        res.json();
    });
});
router.post('/', (req, res) => {
    GroupsToUsers_1.groupsInUsers.createGroupInUsers(req.body)
        .then(() => {
        res.json();
    });
});
router.get('/:id', (req, res) => {
    res.send(`messages Fetched: ${req.params.id}`);
});
router.delete('/:id', (req, res) => {
    res.send(`messages deleted ${req.params.id}`);
});
exports.default = router;
//# sourceMappingURL=index.js.map