import io from 'socket.io-client'

// 连接服务器
const socket = io('ws://localhost:4000')


socket.on('receiveMsg', (data)=>{
  console.log(data)
})


//send message

socket.emit('sendMsg', {msg: 'hello server'})

