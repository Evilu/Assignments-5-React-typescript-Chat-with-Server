import * as express from 'express'
import {tree} from '../../models/Tree'

const router = express.Router();

router.get ('/', (req, res) => {
    tree.getTree()
        .then((tree)=>{
          return  res.json(tree);
        });

});

router.post ('/', (req, res) => {
    tree.createTree(tree)
        .then((groups)=>{
            res.json(groups);
        });
});

//tree
export default router