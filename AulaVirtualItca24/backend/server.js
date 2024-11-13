const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Importa cors

const loginRoutes = require('./routes/loginRoutes');
const registroRoutes = require('./routes/registroRoutes');
const userRoutes = require('./routes/userRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const recuperarRoutes = require('./routes/recuperarRoutes');
const forumRoutes = require('./routes/forumRoutes');




dotenv.config();
const app = express();

// Middleware para permitir CORS
app.use(cors()); // Permite CORS para todas las solicitudes
// Si quieres configurarlo más específicamente, puedes hacerlo así:
/*
const corsOptions = {
    origin: 'http://localhost:8081', // Permitir solo este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permitir credenciales (opcional)
    optionsSuccessStatus: 204 // Para algunos navegadores viejos
};
app.use(cors(corsOptions));
*/

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
app.use('/api', userRoutes);
app.use('/api', cursoRoutes);
app.use('/api', recuperarRoutes);
app.use('/api', forumRoutes);


// Inicio del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SERVIDOR EJECUTÁNDOSE EN EL PUERTO ${PORT}`);
});
