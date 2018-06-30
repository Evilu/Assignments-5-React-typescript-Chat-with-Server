import * as express from 'express'
import {message} from '../../models/messages'
const router = express.Router();


router.get ('/', (req, res) => {
    message.getMessage()
        .then((groups)=>{
            res.json(groups);
        });
});

router.post('/', (req, res) => {
    message.createMessage(req.body)
        .then((message)=> {
            res.json(message);
        })
});

router.get ('/:id', (req,res) => {
    res.send(`messages Fetched: ${req.params.id}`)

});

router.delete('/:id', (req,res) => {
    res.send(`messages deleted ${req.params.id}`)
});


export default router

import {tree} from '../../models/Tree'

tree