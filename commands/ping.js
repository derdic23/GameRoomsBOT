module.exports = {
    name: 'ping',
    despription: "Ovo je test komanda!",
    execute(message, args){
        message.channel.send('Pong!')
    }
}