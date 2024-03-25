const Measurement = require('../models/measurement');
const User = require('../models/User');
const { bpmdb, patientDB } = require('../config/db');

exports.sendLatestBpmToClient = async (io) => {
  try {
    // Se connecter à la base de données des mesures (bpmdb)
    await bpmdb.once('open', async () => {
      // Récupérer les dernières données BPM de tous les utilisateurs depuis la base de données de mesure
      const latestBpmData = await Measurement.find({}, 'user bpm').sort({ createdAt: -1 }).lean();
      
      // Envoyer les dernières valeurs BPM des utilisateurs au client via Socket.IO
      io.emit('latestBpmData', latestBpmData);
      console.log('Dernières valeurs BPM des utilisateurs envoyées au client :', latestBpmData);
  
      // Parcourir chaque mesure de BPM pour vérification et envoi de notification si nécessaire
      for (const data of latestBpmData) {
        await checkAndSendNotifications(data.user, data.bpm);
      }
    });
  } catch (err) {
    console.error('Erreur lors de l\'envoi des dernières valeurs BPM des utilisateurs au client :', err);
  }
};

// Fonction pour vérifier et envoyer des notifications si nécessaire
const checkAndSendNotifications = async (userId, bpm) => {
    if (bpm < 60 || bpm > 100) {
        try {
    // Se connecter à la base de données des patients (patientDB)
    await patientDB.once('open', async () => {
      // Récupérer le nom complet de l'utilisateur associé à l'ID d'utilisateur depuis la base de données des patients
      const user = await User.findById(userId).lean();
      
      // Vérifier si le BPM est anormal et envoyer une notification si nécessaire
       
        sendNotification(`Alerte de fréquence cardiaque anormale pour l'utilisateur ${user.fullName} : ${bpm}`);
      
    });
  } catch (err) {
    console.error('Erreur lors de la vérification et de l\'envoi de notifications :', err);
  }}
};

// Fonction pour envoyer une notification
const sendNotification = (message) => {
    notifier.notify({
        title: 'Alerte de fréquence cardiaque',
        message: message,
        sound: true,
        wait: true
    });
}; 
