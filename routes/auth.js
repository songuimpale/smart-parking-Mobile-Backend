import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    // Vérifier si l'utilisateur existe déjà
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email déjà enregistré.');

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Création du nouvel utilisateur
    const user = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      numeroMatricule: req.body.numeroMatricule,
      password: hashedPassword
    });

    // Sauvegarde de l'utilisateur dans la base de données
    const savedUser = await user.save();
    res.status(201).send({ user: savedUser._id });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email ou mot de passe incorrect');

    // Vérification du mot de passe
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email ou mot de passe incorrect');

    // Création et envoi du token JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('auth-token', token).send(token);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
