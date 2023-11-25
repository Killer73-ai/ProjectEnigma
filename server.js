const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

// Écoute d'événements de connexion des clients
server.on('connection', (socket) => {
    console.log('Nouvelle connexion WebSocket établie.');

    // Écoute d'événements de messages des clients
    socket.on('message', (message) => {
        console.log(`Message reçu : ${message}`);

        // Envoyer le message avec l'identifiant du client à tous les clients connectés
        server.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Gestion de la fermeture de la connexion
    socket.on('close', () => {
        console.log('Connexion WebSocket fermée.');
    });
});

console.log('Serveur WebSocket en écoute sur le port 3000.');

