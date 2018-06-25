import * as express from 'express'
import {groups} from '../../models/groups'
const router = express.Router();


router.get ('/', (req, res) => {
    groups.getGroups()
      .then((groups)=>{
          res.json(groups);
      });
});

router.post ('/', (req, res) => {
    groups.createGroup(req.body)
      .then((groups)=>{
         res.json(groups);
      });
});

router.get ('/:id', (req,res) => {
    res.send(`Group Fetched: ${req.params.id}`)

});

router.delete('/:id', (req, res) => {
    groups.deleteGroup(req.params.id)
        .then((groups)=> {
            res.json(groups);
        })
});

router.patch('/', (req, res) => {
    groups.updateGroup(req.body)
        .then((groups)=> {
            res.json(groups);
        })
});


export default router