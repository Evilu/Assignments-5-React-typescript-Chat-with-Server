const express1 = require('express');
export const groupsRouter = express1.Router();
import  {groups}  from './models/groups/index';

groupsRouter.put('/group', (req, res) => {
    groups.updateGroup(null)
        .then((groups)=>{
            res.json(groups);
        });
});


