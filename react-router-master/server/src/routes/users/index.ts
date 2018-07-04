import * as express from 'express';
import {users}  from '../../models/users'
import usersController from '../../services/users/usersController';
const router = express.Router();



router.get('/', usersController.getAllUsers);


router.post('/', async (req, res) => {
    if (req.query.login === "true") {
        const  afterAuth =  await users.authUser(req.body);
        if(afterAuth === true){
            res.status(200).json({result :afterAuth});
        }
        else{
            res.status(404).json({result :afterAuth});
        }
    }
    else {
        users.createUser(req.body)
            .then((users,) => {
                res.json(users);
            })
    }
});

router.get('/:id', (req, res) => {
    res.send(`User fetched: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    users.deleteUser(req.params.id)
        .then((users)=> {
            res.json(users);
        })
});

router.put('/', (req, res) => {
    users.updateUser(req.body)
        .then((users)=> {
            res.json(users);
        })
});

export default router;