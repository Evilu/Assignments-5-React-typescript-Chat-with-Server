"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const GroupsToGroups_1 = require("../../models/GroupsToGroups");
const router = express.Router();
router.get('/', (req, res) => {
    GroupsToGroups_1.groupsInGroups.getGroupstoGroups()
        .then(() => {
        res.json();
    });
});
router.post('/', (req, res) => {
    GroupsToGroups_1.groupsInGroups.createGroupInGroup(req.body)
        .then(() => {
        res.json();
    });
});
// router.get ('/:id', (req,res) => {
//     res.send(`messages Fetched: ${req.params.id}`)
//
// });
//
// router.delete('/:id', (req,res) => {
//     res.send(`messages deleted ${req.params.id}`)
// });
exports.default = router;
//# sourceMappingURL=index.js.map