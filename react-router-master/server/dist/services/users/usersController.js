"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/users/index");
class UsersController {
    getAllUsers(req, res) {
        index_1.users.getUsers()
            .then((users) => {
            res.json(users);
        });
    }
}
const usersController = new UsersController();
exports.default = usersController;
//# sourceMappingURL=usersController.js.map