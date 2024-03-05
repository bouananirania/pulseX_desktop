const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/app_db")
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

// Define user schema
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idPulse: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    bloodType: { type: String, required: true },
    wilaya: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword:{ type: String, required: true }
});

// Création d'un modèle utilisateur à partir du schéma
const User = mongoose.model("User", userSchema);


// Route to handle user creation
app.post('/Add_Patient', async (req, res) => {
  try {
    // Extract user data from request body
    const { fullName,email, idPulse,dateOfBirth,bloodType,wilaya, password,confirmPassword} = req.body;

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
  
    // Save the user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
