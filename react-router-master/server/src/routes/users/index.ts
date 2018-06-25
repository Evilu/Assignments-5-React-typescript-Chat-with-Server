import * as express from 'express';
import {users}  from '../../models/users'
import usersController from '../../../usersController';
const router = express.Router();

router.get('/', usersController.getAllUsers)

router.post('/', (req, res) => {
    users.createUser(req.body)
        .then((users)=> {
            res.json(users);
        })
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