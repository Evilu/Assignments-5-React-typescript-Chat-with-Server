"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const users_1 = require("../../models/users");
const usersController_1 = require("../../services/users/usersController");
const router = express.Router();
router.get('/', usersController_1.default.getAllUsers);
router.post('/', async (req, res) => {
    if (req.query.login === "true") {
        const afterAuth = await users_1.users.authUser(req.body);
        if (afterAuth === true) {
            res.status(200).json({ result: afterAuth });
        }
        else {
            res.status(404).json({ result: afterAuth });
        }
    }
    else {
        users_1.users.createUser(req.body)
            .then((users) => {
            res.json(users);
        });
    }
});
router.get('/:id', (req, res) => {
    res.send(`User fetched: ${req.params.id}`);
});
router.delete('/:id', (req, res) => {
    users_1.users.deleteUser(req.params.id)
        .then((users) => {
        res.json(users);
    });
});
router.put('/', (req, res) => {
    users_1.users.updateUser(req.body)
        .then((users) => {
        res.json(users);
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map