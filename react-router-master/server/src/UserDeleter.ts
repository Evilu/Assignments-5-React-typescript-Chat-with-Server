const express2 = require('express');
export const usersRouter = express2.Router();
import  {users}  from './models/users/index';



usersRouter.delete('/user', (req, res) => {
    users.deleteUser(null)
        .then((users)=>{
            res.json(users);
        });
});


