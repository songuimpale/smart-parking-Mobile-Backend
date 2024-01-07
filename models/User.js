import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  numeroMatricule: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  dateMiseAJour: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.dateMiseAJour = Date.now();
  }
  next();
});

export default mongoose.model('User', userSchema);
