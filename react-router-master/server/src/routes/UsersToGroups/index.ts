import * as express from 'express'
import {groupsInUsers} from '../../models/GroupsToUsers'
const router = express.Router();


router.get ('/', (req, res) => {
    groupsInUsers.getGroupstoUsers()
        .then(()=>{
            res.json();
        });
});

router.post('/', (req, res) => {
    groupsInUsers.createGroupInUsers(req.body)
        .then(()=> {
            res.json();
        })
});

router.get ('/:id', (req,res) => {
    res.send(`messages Fetched: ${req.params.id}`)

});

router.delete('/:id', (req,res) => {
    res.send(`messages deleted ${req.params.id}`)
});

export default router