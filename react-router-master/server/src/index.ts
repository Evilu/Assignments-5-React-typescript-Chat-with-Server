import * as express from "express";
import * as cors from "cors";
const socket = require('socket.io')
import userRouter from './routes/users';
import groupRouter from './routes/groups';
import messageRouter from './routes/messages';
import treeRouter from './routes/Tree'
import groupToGroupRouter from './routes/GroupsToGroups'
import groupToUserRouter from './routes/UsersToGroups'
const serverApp = express();



serverApp.use(express.json());
serverApp.use(cors());
serverApp.get ("/", (req,res) => {
    res.send ('Avast Ye sailor, server is running! time to travel Briny Deep');
} );

serverApp.use('/users', userRouter);
serverApp.use('/groups', groupRouter);
serverApp.use('/messages',messageRouter);
serverApp.use('/tree', treeRouter);
serverApp.use('/groupToGroup', groupToGroupRouter);
serverApp.use('/groupToUserRouter',groupToUserRouter);



let server = serverApp.listen(4000, function(){
    console.log('server is running on:' +
        'http://localhost:4000/');
});
let io = socket(server);
io.on ('connection', function(socket){
    console.log('socket connected')
})