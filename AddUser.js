// Importer la connexion à la base de données des patients depuis db.js
const { patientDB } = require('./db');

// Importer le modèle de schéma User depuis le fichier de schémas
const { User } = require('./schemas');

// Route to handle user creation
module.exports = async function (req, res) {
  try {
    // Extract user data from request body
    const { fullName, email, idPulse, dateOfBirth, bloodType, wilaya, password, confirmPassword } = req.body;

    // Create a new user instance
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

    // Save the user to the database using the patientDB connection
    await patientDB.then(() => {
      newUser.save((err, doc) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error creating user');
        } else {
          res.status(201).json(doc);
        }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
};
