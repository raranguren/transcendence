export {};
/* let game_id: string = "";
//recuperer le game_id depuis le back
//en creant une game et en envoyant une requete post

const socket = new WebSocket(`wss://localhost:8080/ws/game/${game_id}`);

socket.addEventListener('open', () =>
{
    console.log('Connection');
    socket.send('Connecting');
});

socket.addEventListener('message', event =>
{
    const state = JSON.parse(event.data);
    console.log("Game state: ", state);
});

socket.addEventListener('close', () =>
{
    console.log('Deconnection');
});

document.addEventListener("keydown", (e) =>
{
    if (e.key === "ArrowUp")
    {
        socket.send(JSON.stringify({playerId: "p1", direction: "up"}))
    }
    if (e.code == 'KeyW')
    {
        socket.send(JSON.stringify({playerId: "p2", direction: "up"}))
    }

    if (e.key === "ArrowDown")
    {
        socket.send(JSON.stringify({playerId: "p1", direction: "down"}))
    }
    if (e.code == 'keyS')
    {
        socket.send(JSON.stringify({playerId: "p2", direction: "down"}))
    }
});

 */ 
//# sourceMappingURL=game_websocket.js.map