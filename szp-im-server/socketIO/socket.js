const  {ChatModel} = require('../db/models')
module.exports = function (server) {
  const io = require('socket.io')(server)

  // 监视客户端与服务器的连接
  io.on('connection', (socket) => {
    console.log('socket connect success')
    socket.on('sendMsg', ({from, to, content}) => {
      // 准备数据&&保存消息
      const chat_id = [from, to].sort().join('_')
      const create_time = Date.now()
      new ChatModel({from, to, content, chat_id, create_time}).save((err, chatMsg) => {
        // 向客户端发送消息
        io.emit('receiveMsg', chatMsg)
      })
    })
  })
}