import * as socketIO from 'socket.io';


export default function socket(httpServer){
    const io = socketIO.listen(httpServer);
    io.on('connection', (socket)=>{
        console.log('a new socket connection was established',socket.id);
        socket.on('login', (username)=>{
            socket.username = username;

            console.log(`The User ${username} Is onLine`);
            socket.broadcast.emit('connections', username);
        });

        socket.on('join-group', (username, groupId)=>{
            console.log(`username: ${username} has joined ${groupId}`);
            socket.join(groupId);
        });

        socket.on('msg', (groupId, message, username, date)=>{
            io.to(groupId).emit('msg', {content:message, sender:username, date:new Date().toLocaleTimeString()} );
            console.log(` message ${message} was sent by ${username} to group id ${groupId} on ${date}  `)
        });

        socket.on('logOutGroup', (username, groupId)=>{
            socket.leave(groupId);
            console.log(`The User: ${username} Has Logged out group: ${groupId}`);
        });

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
}
