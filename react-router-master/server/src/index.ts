import * as http from 'http';
import * as express from "express";
import * as cors from "cors";
import socket from './services/SocketIO'
import userRouter from './routes/users';
import groupRouter from './routes/groups';
import messageRouter from './routes/messages';
import treeRouter from './routes/Tree'
import groupToGroupRouter from './routes/GroupsToGroups'
import groupToUserRouter from './routes/UsersToGroups'
const serverApp = express();
const httpServer = http.createServer(serverApp);


socket(httpServer);
serverApp.use(express.json());
serverApp.use(cors());
serverApp.get ("/", (req,res) => {
    res.send ('Avast Ye sailor, server is running! time to travel Briny Deep');
} );

serverApp.use('/users', userRouter);
serverApp.use('/groups', groupRouter);
serverApp.use('/messages',messageRouter);
serverApp.use('/tree', treeRouter);
serverApp.use('/groupToGroup',groupToGroupRouter);
serverApp.use('/GroupsToUsers',groupToUserRouter);



httpServer.listen(4000, function(){
    console.log('server is running on:' +
        'http://localhost:4000/');
});
