
const User = require('../models/User');
const userserv =require('../services/usersrvc').default;
const bpm = require("../models/Bpm")
const notifier = require('node-notifier');

exports.sendLatestBpmToClient = async (io) => {
   io.on('connection', (socket) => {
    console.log('Client connecté');
     socket.on('arduinoData', async () => {
      try {
        const latestBpmDataFromDB = await bpm.find().sort({ timestamp: -1 });
        latestBpmDataFromDB.forEach(async (entry) => {
          const { idPulse, bpm } = entry; 
          io.emit(`latestBpmData_${idPulse}`, bpm);
          console.log(`Dernières valeurs BPM du capteur ${idPulse} :`, bpm);
          await checkAndSendNotifications(idPulse, bpm); 
         });

       } catch (err) {
        console.error('Erreur lors de la gestion des données bpm :', err);
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
