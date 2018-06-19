const express = require('express');
export const usersRouter = express.Router();
import  {users}  from './models/users/index';


usersRouter.post('/user', (req, res) => {
    users.createUser(null)
        .then((users)=>{
            res.json(users);
        });
});


