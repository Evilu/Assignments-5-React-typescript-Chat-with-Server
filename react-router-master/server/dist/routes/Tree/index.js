"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Tree_1 = require("../../models/Tree");
const router = express.Router();
router.get('/', (req, res) => {
    Tree_1.tree.getTree()
        .then((tree) => {
        return res.json(tree);
    });
});
router.post('/', (req, res) => {
    Tree_1.tree.createTree(Tree_1.tree)
        .then((groups) => {
        res.json(groups);
    });
});
//tree
exports.default = router;
//# sourceMappingURL=index.js.map