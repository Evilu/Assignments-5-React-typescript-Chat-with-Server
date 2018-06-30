"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const groups_1 = require("../../models/groups");
const router = express.Router();
router.get('/', (req, res) => {
    groups_1.groups.getGroups()
        .then((groups) => {
        res.json(groups);
    });
});
router.post('/', (req, res) => {
    groups_1.groups.createGroup(req.body)
        .then((groups) => {
        res.json(groups);
    });
});
router.get('/:id', (req, res) => {
    res.send(`Group Fetched: ${req.params.id}`);
});
router.delete('/:id', (req, res) => {
    groups_1.groups.deleteGroup(req.params.id)
        .then((groups) => {
        res.json(groups);
    });
});
router.patch('/', (req, res) => {
    groups_1.groups.updateGroup(req.body)
        .then((groups) => {
        res.json(groups);
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map