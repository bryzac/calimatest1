const navsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { PAGE_URL } = require('../config');
const Project = require('../models/project');
const { response } = require('express');

//Creamos un nav, sabiendo si se encuentra logged
navsRouter.get('/', async (request, response) => {
    try {
        const token = request.cookies?.accessToken;
        if (!token) {
            return response.status(200).json({ logged: false });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        return response.status(200).json({ logged: true, name: user.name, userID: user.id, rol: user.rol });
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

//Obtenemos información del usuario propietario del perfil
navsRouter.get('/profile/:id', async (request, response) => {
    try {
        const id = request.params.id;

        const user = await User.findById(id);
        const { name, sentence } = user;

        return response.status(200).json({ name: name, sentence: sentence });
    } catch (error) {
        console.log(error);
        return response.status(404).json({ error: 'Usuario no encontrado' });
    }
});





module.exports = navsRouter;