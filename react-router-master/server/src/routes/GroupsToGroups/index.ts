import * as express from 'express'
import {groupsInGroups} from '../../models/GroupsToGroups'
const router = express.Router();


router.get ('/', (req, res) => {
    groupsInGroups.getGroupstoGroups()
        .then(()=>{
            res.json();
        });
});

router.post('/', (req, res) => {
    groupsInGroups.createGroupInGroup(req.body)
        .then(()=> {
            res.json();
        })
});

// router.get ('/:id', (req,res) => {
//     res.send(`messages Fetched: ${req.params.id}`)
//
// });
//
// router.delete('/:id', (req,res) => {
//     res.send(`messages deleted ${req.params.id}`)
// });


export default router
