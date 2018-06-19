const express1 = require('express');
export const groupsRouter = express1.Router();
import  {groups}  from './models/groups/index';



groupsRouter.get('/group', (req, res) => {
    groups.getGroups()
        .then((groups)=>{
            res.json(groups);
        });
});


