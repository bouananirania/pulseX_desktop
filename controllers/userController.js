const { patientDB } = require('../config/db');
const { User } = require('../models/User');

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { fullName, email, idPulse, dateOfBirth, bloodType, wilaya, password, confirmPassword } = req.body;

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

    await patientDB.then(() => {
      newUser.save((err, doc) => {
        if (err) {
          console.error(err);
          res.status(500).send('Erreur lors de la création de l\'utilisateur');
        } else {
          res.status(201).json(doc);
        }
      });
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
    await patientDB.then(() => {
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
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
  }
};
