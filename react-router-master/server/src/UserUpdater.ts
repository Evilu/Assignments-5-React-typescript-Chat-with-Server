const express2 = require('express');
export const usersRouter = express2.Router();
import  {users}  from './models/users/index';



usersRouter.put('/user', (req, res) => {
    users.updateUser(null)
        .then((users)=>{
            res.json(users);
        });
});


