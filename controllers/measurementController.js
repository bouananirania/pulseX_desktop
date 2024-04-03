
const User = require('../models/User');
const userserv =require('../services/usersrvc');
const { patientDB } = require('../config/db');
const notifier = require('node-notifier');

exports.sendLatestBpmToClient = async (io) => {
   io.on('connection', (socket) => {
    console.log('Client connecté');
     socket.on('arduinoData', async (data) => {
      try {
        const { idPulse, latestBpm } = data;
        io.emit(`latestBpmData_${idPulse} : `,latestBpm );
        console.log(`Dernières valeurs BPM du capteur ${idPulse} envoyées au client :`, latestBpm);
        await checkAndSendNotifications(idPulse, latestBpm);
      } catch (err) {
        console.error('Erreur lors de la gestion des données Arduino :', err);
      }
    });
  });
};


const checkAndSendNotifications = async (idPulse, bpm) => {
    if (bpm < 60 || bpm > 100) {
        try {
            const userData = await userserv.findUserByIdPulse(idPulse);

            if (userData) {
                const { fullName, userId } = userData;
                sendNotification(`Alerte de fréquence cardiaque anormale pour l'utilisateur ${fullName} (ID: ${userId}) : ${bpm}`);
            } else {
                console.log("Aucun utilisateur trouvé avec l'idPulse spécifié.");
            }
  } catch (err) {
    console.error('Erreur lors de la vérification et de l\'envoi de notifications :', err);
  }}
};

const sendNotification = (message) => {
    notifier.notify({
        title: 'Alerte de fréquence cardiaque',
        message: message,
        sound: true,
        wait: true
    });
}; 
