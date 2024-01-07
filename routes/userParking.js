import express from 'express';
import User from '../models/User.js';
import SmartParkingUser from '../models/SmartParkingUser.js';

const router = express.Router();

// Route pour obtenir les informations de parking actuelles basées sur le numéro de matricule
router.get('/:numeroMatricule', async (req, res) => {
  try {
    console.log(`Recherche de l'utilisateur avec le matricule : ${req.params.numeroMatricule}`);

    const user = await User.findOne({ numeroMatricule: req.params.numeroMatricule });
    console.log('Utilisateur trouvé : ', user);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    console.log(`Recherche des informations de parking pour le matricule : ${user.numeroMatricule}`);

    const parkingInfo = await SmartParkingUser.findOne({ matricule: user.numeroMatricule });
    console.log('Information de parking trouvée : ', parkingInfo);

    if (!parkingInfo) {
      return res.status(404).json({ message: "Information de parking non trouvée." });
    }

    res.json({
      matricule: parkingInfo.matricule,
      dateArrivee: parkingInfo.dateArrivee,
      datePartir: parkingInfo.datePartir,
      place: parkingInfo.place
    });
  } catch (error) {
    console.error('Erreur lors du traitement de la requête : ', error);
    res.status(500).json({ message: "Erreur du serveur", error });
  }
});

// Route pour obtenir l'historique des places de parking basé sur le numéro de matricule
router.get('/historique/:numeroMatricule', async (req, res) => {
  try {
    console.log(`Recherche de l'historique pour le matricule : ${req.params.numeroMatricule}`);

    const historique = await SmartParkingUser.find({ matricule: req.params.numeroMatricule });

    if (historique.length === 0) {
      return res.status(404).json({ message: "Historique non trouvé." });
    }

    res.json(historique);
  } catch (error) {
    console.error('Erreur lors du traitement de la requête d\'historique : ', error);
    res.status(500).json({ message: "Erreur du serveur lors de la récupération de l'historique", error });
  }
});

export default router;