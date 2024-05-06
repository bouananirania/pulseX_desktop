
const User = require('../models/User');
const userserv =require('../services/usersrvc');
const bpm = require("../models/Bpm")
const notifier = require('node-notifier');

exports.sendLatestBpmToClient = async (req,res) => {
   
      try {
        const latestBpmDataFromDB = await bpm.find().sort({ timestamp: -1 });
        for (const entry of latestBpmDataFromDB) {
          const { idPulse, bpm } = entry;
          const data = JSON.stringify(entry);
          res.write(`data: ${JSON.stringify({ idPulse: entry.idPulse, bpm: entry.bpm })}\n\n`);

          await checkAndSendNotifications(idPulse, bpm);
         };
        // await bpm.deleteMany({});

       } catch (err) {
        console.error('Erreur lors de la gestion des données bpm :', err);
      }};
    
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

