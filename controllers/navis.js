const navsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { PAGE_URL } = require('../config');
const Project = require('../models/project');

navsRouter.get('/', async (request, response) => {
    try {
        const token = request.cookies?.accessToken;
        if (!token) {
            return response.status(200).json({ logged: false });
        }
        
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        return response.status(200).json({ logged: true, user: user?.name, userID: user?.id, rol: user?.rol });
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

//Profile: Creamos el nav en el perfil
navsRouter.get('/profile', async (request, response) => {
    try {
        console.log('arepa')
        const pathName = request.rawHeaders[21].split('/')[4];

        const user = await User.findById(pathName);
        console.log(request)
        
        return response.status(200).json({ name: user.name, nickname: user.nickname, sentence: user.sentence });
    } catch (error) {
        console.log(error);
        return response.status(404).json({ error: 'Usuario no encontrado' });
    }
});

navsRouter.get('/project/:id', async (request, response) => {
    try {
        const pathName = request.rawHeaders[21].split('/')[4];
        const project = await Project.findById(pathName);
        const user = await User.findById(project.user)

        return response.status(200).json({ name: project.name, user: user.name });
    } catch (error) {
        console.log(error);
        return response.status(404).json({ error: 'Sección no encontrada' });
    }
});

module.exports = navsRouter;