// SmartParkingUser.js
import mongoose from 'mongoose';

const smartParkingUserSchema = new mongoose.Schema({
    matricule: {
    type: String,
    required: true,
    unique: true
  },
  dateArrivee: {
    type: Date,
    required: true
  },
  datePartir: {
    type: Date,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  slotNumber: {
    type: String,
    required: true
  },
  // Ajoutez d'autres champs si nécessaire
});

const SmartParkingUser = mongoose.model('SmartParkingUser', smartParkingUserSchema);

export default SmartParkingUser;
