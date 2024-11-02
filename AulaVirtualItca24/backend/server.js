const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const loginRoutes = require('./routes/loginRoutes');
const registroRoutes = require('./routes/registroRoutes');


dotenv.config();
const app = express();
app.use(express.json());
// CONEXION A MONGODB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log('CONECTADO A MONGODB');
})
.catch((error) => {
    console.log('ERROR CONECTANDO A MONGODB', error);
});
// Definición de rutas
app.use('/api', loginRoutes);
app.use('/api', registroRoutes);



// Inicio del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`SERVIDOR EJECUTÁNDOSE EN EL PUERTO ${PORT}`);
});
    
