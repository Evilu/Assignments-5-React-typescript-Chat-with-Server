import * as express from "express";
import * as cors from "cors";
import userRouter from './routes/users';
import groupRouter from './routes/groups';
import messageRouter from './routes/messages';

const serverApp = express();

serverApp.use(express.json());
serverApp.use(cors());

serverApp.get ("/", (req,res) => {
    res.send ('Avast Ye sailor, server is running! time to travel Briny Deep');
} );

serverApp.use('/users', userRouter);
serverApp.use('/groups', groupRouter);
serverApp.use('/messages',messageRouter);


serverApp.listen(4000, function(){
    console.log('server is running on:' +
        'http://localhost:4000/');
});