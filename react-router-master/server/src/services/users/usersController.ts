import {users} from "../../models/users/index";

class UsersController {
    getAllUsers(req, res){
        users.getUsers()
            .then((users)=>{
                res.json(users);
            })
    }
}

const usersController = new UsersController();

export default usersController