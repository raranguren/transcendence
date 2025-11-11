//websocket
const socket = new WebSocket(`wss://localhost:8080/ws/chat`);
socket.addEventListener('open', () => {
    console.log('Connection');
    socket.send('Connecting');
});
socket.addEventListener('message', event => {
    const state = JSON.parse(event.data);
    console.log("message: ", state);
});
socket.addEventListener('close', () => {
    console.log('Deconnection');
});
export {};
//renvoyer un message ?
//# sourceMappingURL=chat.js.map