const { patientDB, bpmdb } = require('../config/db');
const  User   = require('../models/User');
const  Measurement   = require('../models/measurement');
const jwt = require('jsonwebtoken');

// Fonction pour générer un token JWT
const generateAuthToken = (userId) => {
    return jwt.sign({ userId }, 'secretKey', { expiresIn: '1h' });
  };

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
      const { fullName, email, idPulse, dateOfBirth, bloodType, wilaya, password, confirmPassword } = req.body;
  
      // Créer un nouvel utilisateur
      const newUser = new User({
        fullName,
        email,
        idPulse,
        dateOfBirth: new Date(dateOfBirth),
        bloodType,
        wilaya,
        password,
        confirmPassword
      });
  
      // Établir la connexion à la base de données des patients
      patientDB.once('open', async () => {
        try {
          // Sauvegarder le nouvel utilisateur dans la base de données des patients
          const user = await newUser.save();
  
          // Créer une nouvelle mesure associée à l'utilisateur dans la base de données de mesure
          const newMeasurement = new Measurement({
            user: user._id, // Utiliser l'ID de l'utilisateur nouvellement créé
            bpm: null // Initialiser le BPM à null (ou une valeur par défaut)
          });
  
          // Établir la connexion à la base de données de mesure (bpmdb)
          bpmdb.once('open', async () => {
            try {
              // Sauvegarder la nouvelle mesure dans la base de données de mesure (bpmdb)
              const measurement = await newMeasurement.save();
              // Générer un token JWT
              const token = generateAuthToken(user._id);
              res.status(201).json({ user, measurement, token }); // Envoyer la réponse avec l'utilisateur et la mesure créés
            } catch (err) {
              console.error(err);
              res.status(500).send('Erreur lors de l\'ajout de l\'ID de l\'utilisateur à la base de données de mesure');
            }
          });
        } catch (err) {
          console.error(err);
          res.status(500).send('Erreur lors de la création de l\'utilisateur');
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la création de l\'utilisateur');
    }
  };
  
// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Vérifier si le token JWT est présent dans les en-têtes de la requête
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Accès refusé. Authentification requise.');

    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(token, 'secretKey');
    
    // Vérifier si l'ID de l'utilisateur dans le token correspond à l'ID de l'utilisateur à supprimer
    if (decoded.userId !== userId) return res.status(403).send('Accès refusé. Token JWT invalide.');

    await patientDB.once('open', () => {
      User.findByIdAndDelete(userId, (err, doc) => {
        if (err) {
          console.error(err);
          res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Vérifier si le token JWT est présent dans les en-têtes de la requête
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Accès refusé. Authentification requise.');

    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(token, 'secretKey');
    
    // Vérifier si l'ID de l'utilisateur dans le token correspond à l'ID de l'utilisateur à supprimer
    if (decoded.userId !== userId) return res.status(403).send('Accès refusé. Token JWT invalide.');
    await patientDB.once('open', () => {
      User.findByIdAndUpdate(userId, req.body, { new: true }, (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
        } else {
          res.json(updatedUser);
        }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
  }
};
