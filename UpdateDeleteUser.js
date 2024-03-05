const express = require('express');
const mongoose = require('mongoose');
const app =express();
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



app.use(bodyParser.json());

// Delete user
app.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting user');
  }
});

// Update user
app.put('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating user');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
