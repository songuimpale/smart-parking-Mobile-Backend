import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js'; // Votre routeur d'authentification existant
import userParkingRoutes from './routes/userParking.js'; // Importez votre nouvelle route renommée

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('Connecté à MongoDB Atlas'))
.catch(err => console.error('Erreur de connexion', err));

// Intégration des routeurs
app.use('/api/auth', authRoutes);
app.use('/api/userParking', userParkingRoutes); // Utilisez la nouvelle route renommée

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
