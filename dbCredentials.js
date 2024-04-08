import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  nume: { type: String, required: true, unique: true },
  parolaHash: { type: String, required: true },

});

userSchema.pre('save', async function(next) {
  if (this.isModified('parolaHash')) {
    const salt = await bcrypt.genSalt(10);
    this.parolaHash = await bcrypt.hash(this.parolaHash, salt);
  }
  next();
});

userSchema.methods.verifyPassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.parolaHash);
};

const User = mongoose.model('User', userSchema);
export default User;
