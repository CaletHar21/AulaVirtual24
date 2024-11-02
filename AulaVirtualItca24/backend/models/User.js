const mongoose = require('mongoose');
// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
username: {
type: String,
required: true,
unique: true,
},
password: {
type: String,
required: true,
},
});
module.exports = mongoose.model('User', userSchema);