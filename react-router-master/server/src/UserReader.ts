const express2 = require('express');
export const usersRouter = express2.Router();
import  {users}  from './models/users/index';

usersRouter.get('/user', (req, res) => {
    users.getUsers()
        .then((users)=>{
            res.json(users);
        });
});


