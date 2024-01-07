// smartparkingusers.js
import express from 'express';
import SmartParkingUser from '../models/SmartParkingUser.js'; // Assurez-vous que le chemin est correct

const router = express.Router();

router.get('/api/smartparkingusers/:matricule', async (req, res) => {
  try {
    const matricule = req.params.matricule;
    const userParkingInfo = await SmartParkingUser.findOne({ matricule: matricule });

    if (userParkingInfo) {
      res.json({ slotNumber: userParkingInfo.slotNumber });
    } else {
      res.status(404).json({ message: 'Aucune place de parking attribuée à cette plaque.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur', error: error });
  }
});

export default router;
