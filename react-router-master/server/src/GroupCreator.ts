const express1 = require('express');
export const groupsRouter = express1.Router();
import  {groups}  from './models/groups/index';




groupsRouter.post('/group', (req, res) => {
    groups.createGroup(null)
        .then((groups)=>{
            res.json(groups);
        });
});

