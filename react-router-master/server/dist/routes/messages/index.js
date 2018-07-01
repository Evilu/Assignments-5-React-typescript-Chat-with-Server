"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const messages_1 = require("../../models/messages");
const router = express.Router();
router.get('/', (req, res) => {
    messages_1.message.getMessage()
        .then((groups) => {
        res.json(groups);
    });
});
router.post('/', (req, res) => {
    messages_1.message.createMessage(req.body)
        .then((message) => {
        res.json(message);
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