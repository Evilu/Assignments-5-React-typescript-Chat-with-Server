import {users} from "./src/models/users";

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