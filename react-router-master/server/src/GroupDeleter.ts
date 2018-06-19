const express1 = require('express');
export const groupsRouter = express1.Router();
import  {groups}  from './models/groups/index';



groupsRouter.delete('/group', (req, res) => {
    groups.deleteGroup(null)
        .then((groups)=>{
            res.json(groups);
        });
});


